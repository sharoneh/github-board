import PropTypes from 'prop-types'
import '../styles/Card.scss'

const Card = ({ title }) => {
  return (
    <div className="card">
      <span>{title}</span>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
}

export default Card
