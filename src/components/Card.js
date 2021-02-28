import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { moveTaskInList, moveTaskToList } from '../redux/BoardReducer'
import '../styles/Card.scss'

const Card = ({
  title,
  listIndex,
  taskIndex,
  moveTaskInList,
  moveTaskToList,
  lists,
}) => {
  const list = lists[listIndex]

  return (
    <div className="card">
      <span>{title}</span>

      <div className="actions">
        <button
          onClick={() => moveTaskToList(taskIndex, listIndex, listIndex - 1)}
          className="back"
          disabled={listIndex === 0}
        >
          ⬅️
        </button>

        <button
          onClick={() => moveTaskInList(listIndex, taskIndex, taskIndex - 1)}
          className="up"
          disabled={taskIndex === 0}
        >
          ⬆️
        </button>

        <button
          onClick={() => moveTaskInList(listIndex, taskIndex, taskIndex + 1)}
          className="down"
          disabled={taskIndex === list.tasks.length - 1}
        >
          ⬇️
        </button>

        <button
          onClick={() => moveTaskToList(taskIndex, listIndex, listIndex + 1)}
          className="forward"
          disabled={listIndex === lists.length - 1}
        >
          ➡️
        </button>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  listIndex: PropTypes.number.isRequired,
  taskIndex: PropTypes.number.isRequired,
  moveTaskInList: PropTypes.func.isRequired,
  moveTaskToList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({ lists: state.lists })

export default connect(mapStateToProps, { moveTaskInList, moveTaskToList })(
  Card,
)
