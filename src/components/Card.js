import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  closeIssue,
  openIssue,
  moveIssueToProgress,
} from '../redux/IssuesReducer'
import '../styles/Card.scss'

const Card = ({
  issue,
  issueState,
  closeIssue,
  openIssue,
  moveIssueToProgress,
}) => {
  const moveBack = () => {
    if (issueState === 'inProgress') {
      openIssue(issue.number)
    } else if (issueState === 'closed') {
      moveIssueToProgress(issue.number)
    }
  }

  const moveForward = () => {
    if (issueState === 'open') {
      moveIssueToProgress(issue.number)
    } else if (issueState === 'inProgress') {
      closeIssue(issue.number)
    }
  }

  return (
    <div className="card">
      <span>{issue.title}</span>

      <div className="actions">
        <button
          onClick={moveBack}
          className="back"
          disabled={issueState === 'open'}
        >
          ⬅️
        </button>

        <button
          onClick={moveForward}
          className="forward"
          disabled={issueState === 'closed'}
        >
          ➡️
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {
  issue: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  issueState: PropTypes.string.isRequired,
  closeIssue: PropTypes.func.isRequired,
  openIssue: PropTypes.func.isRequired,
  moveIssueToProgress: PropTypes.func.isRequired,
}

export default connect(null, { closeIssue, openIssue, moveIssueToProgress })(
  Card,
)
