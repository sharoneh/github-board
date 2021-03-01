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
        { owner, repo },
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

export const updateIssue = (issue_number, params) => {
  return async (dispatch) => {
    try {
      await octokit.request(
        'PATCH /repos/{owner}/{repo}/issues/{issue_number}',
        {
          issue_number,
          ...params,
        },
      )

      dispatch(fetchIssues)
    } catch (err) {
      console.error('Error updating issue', err)
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
