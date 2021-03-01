import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addTask, addList } from '../redux/BoardReducer'
import '../styles/List.scss'
import Card from './Card'

const List = ({ title, index, addTask, addList, tasks }) => {
  const [editorActive, setEditorActive] = useState(false)
  const [text, setText] = useState('')
  const ref = useRef(null)

  const btnLabel = tasks ? 'Adicionar cartão' : 'Adicionar lista'

  const cancel = () => {
    setEditorActive(false)
    setText('')
  }

  const add = () => {
    if (!text) return

    if (tasks) {
      addTask(index, text)
    } else {
      addList(text)
      setEditorActive(false)
    }

    setText('')
  }

  const onType = (e) => {
    if (e.key === 'Enter') {
      add()
      setText('')
    } else if (e.key === 'Escape') {
      setText('')
      setEditorActive(false)
    }
  }

  useEffect(() => {
    if (editorActive) ref.current.focus()
  }, [editorActive])

  return (
    <div className={`list${tasks || editorActive ? '' : ' empty'}`}>
      {tasks && (
        <div className="list-header">
          <span className="list-title">{title}</span>
        </div>
      )}

      <div className="list-content">
        {tasks &&
          tasks.map((task, taskIndex) => (
            <Card
              listIndex={index}
              taskIndex={taskIndex}
              title={task}
              key={`list#${index}taskCard#${taskIndex}`}
            />
          ))}
      </div>

      <div className="list-content">
        {editorActive && (
          <>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="card-editor"
              rows={tasks ? 3 : 1}
              onKeyUp={onType}
              ref={ref}
            />

            <div className="editor-actions">
              <button onClick={add} className="add-card">
                {btnLabel}
              </button>

              <button
                onClick={cancel}
                className="cancel-card"
                aria-label="Cancelar"
              />
            </div>
          </>
        )}
      </div>

      <div className="list-footer">
        {!editorActive && (
          <button className="add" onClick={() => setEditorActive(true)}>
            + {btnLabel}
          </button>
        )}
      </div>
    </div>
  )
}

List.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  addTask: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.string),
}

export default connect(null, { addTask, addList })(List)
