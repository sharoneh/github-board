import PropTypes from 'prop-types'
import '../styles/Card.scss'

const Card = ({ title, issueState }) => {
  return (
    <div className="card">
      <span>{title}</span>

      <div className="actions">
        <button className="back" disabled={issueState === 'open'}>
          ⬅️
        </button>

        <button className="forward" disabled={issueState === 'closed'}>
          ➡️
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  issueState: PropTypes.string.isRequired,
}

export default Card
