import { Octokit } from '@octokit/core'
import update from 'immutability-helper'

// eslint-disable-next-line
const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN })
const owner = 'sharoneh'
const repo = 'github-board'

const INITIAL_STATE = {
  issues: { open: [], inProgress: [], closed: [] },
}

// action types
export const SET_ISSUES = 'SET_ISSUES'
export const ADD_ISSUE = 'ADD_ISSUE'

// actions
export const fetchIssues = () => {
  return async (dispatch) => {
    try {
      const response = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        { owner, repo, state: 'all' },
      )

      let issues = { open: [], inProgress: [], closed: [] }

      response.data.forEach((issue) => {
        if (issue.state === 'open') {
          if (issue.labels.some((label) => label.name === 'in-progress')) {
            issues.inProgress.push(issue)
          } else {
            issues.open.push(issue)
          }
        } else if (issue.state === 'closed') {
          issues.closed.push(issue)
        }
      })

      dispatch({ type: SET_ISSUES, payload: issues })
    } catch (err) {
      console.error('Error fetching issues from Github API', err)
    }
  }
}

export const createIssue = (title, state) => {
  return async (dispatch) => {
    try {
      const { data } = await octokit.request(
        'POST /repos/{owner}/{repo}/issues',
        {
          owner,
          repo,
          title,
          labels: state === 'inProgress' ? ['in-progress'] : [],
        },
      )

      dispatch({ type: ADD_ISSUE, payload: { state, issue: data } })
    } catch (err) {
      console.error('Error creating issue', err)
    }
  }
}

const updateIssue = (issue_number, params) => {
  try {
    return octokit.request(
      'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
      {
        owner,
        repo,
        issue_number,
        ...params,
      },
    )
  } catch (err) {
    console.error('Error updating issue', err)
  }
}

export const closeIssue = (issue_number) => {
  return async (dispatch, getState) => {
    try {
      const params = { state: 'closed', labels: [] }
      const { data } = await updateIssue(issue_number, params)

      let issues = getState().issues.issues
      const issueIndex = issues.inProgress.findIndex(
        (issue) => issue.number === issue_number,
      )
      issues = {
        ...issues,
        inProgress: update(issues.inProgress, { $splice: [[issueIndex, 1]] }),
        closed: update(issues.closed, { $push: [data] }),
      }

      dispatch({ type: SET_ISSUES, payload: issues })
    } catch (err) {
      console.error('Error closing an issue', err)
    }
  }
}

export const moveIssueToProgress = (issue_number) => {
  return async (dispatch, getState) => {
    try {
      const params = { state: 'open', labels: ['in-progress'] }
      const { data } = await updateIssue(issue_number, params)

      let issues = getState().issues.issues

      const openIssueIndex = issues.open.findIndex(
        (issue) => issue.number === issue_number,
      )
      const closedIssueIndex = issues.closed.findIndex(
        (issue) => issue.number === issue_number,
      )

      console.log({ openIssueIndex, closedIssueIndex })

      if (openIssueIndex > -1) {
        issues.open = update(issues.open, { $splice: [[openIssueIndex, 1]] })
      } else if (closedIssueIndex > -1) {
        issues.closed = update(issues.closed, {
          $splice: [[closedIssueIndex, 1]],
        })
      }

      issues = {
        ...issues,
        inProgress: update(issues.inProgress, { $push: [data] }),
      }

      dispatch({ type: SET_ISSUES, payload: issues })
    } catch (err) {
      console.error('Error moving issue to progress', err)
    }
  }
}

export const openIssue = (issue_number) => {
  return async (dispatch, getState) => {
    try {
      const params = { state: 'open', labels: [] }
      const { data } = await updateIssue(issue_number, params)

      let issues = getState().issues.issues
      const issueIndex = issues.inProgress.findIndex(
        (issue) => issue.number === issue_number,
      )
      issues = {
        ...issues,
        inProgress: update(issues.inProgress, { $splice: [[issueIndex, 1]] }),
        open: update(issues.open, { $push: [data] }),
      }

      dispatch({ type: SET_ISSUES, payload: issues })
    } catch (err) {
      console.error('Error opening issue', err)
    }
  }
}

const IssuesReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action

  switch (action.type) {
    case SET_ISSUES:
      return { ...state, issues: payload }
    case ADD_ISSUE:
      return {
        ...state,
        issues: {
          ...state.issues,
          [payload.state]: update(state.issues[payload.state], {
            $push: [payload.issue],
          }),
        },
      }
    default:
      return state
  }
}

export default IssuesReducer
