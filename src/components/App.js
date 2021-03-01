import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './Header'
import List from './List'
import '../styles/App.scss'
import { fetchIssues } from '../redux/IssuesReducer'

const labels = { open: 'OPEN', inProgress: 'IN PROGRESS', closed: 'CLOSED' }

function App({ issues, fetchIssues }) {
  useEffect(fetchIssues, [])

  return (
    <div className="app">
      <Header />

      <div className="board">
        {Object.keys(issues).map((issueState, index) => {
          const issueList = issues[issueState]

          return (
            <List
              title={labels[issueState]}
              key={`list#${index}`}
              issueState={issueState}
              issues={issueList}
            />
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ issues: state.issues.issues })

App.propTypes = {
  issues: PropTypes.shape({
    open: PropTypes.array.isRequired,
    inProgress: PropTypes.array.isRequired,
    closed: PropTypes.array.isRequired,
  }),
  fetchIssues: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { fetchIssues })(App)
