import { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addTask } from '../redux/store'
import '../styles/List.scss'

const List = ({ title, index, addTask, children }) => {
  const [editorActive, setEditorActive] = useState(false)
  const [task, setTask] = useState('')

  const btnLabel = children ? 'Adicionar cartão' : 'Adicionar lista'

  const cancel = () => {
    setEditorActive(false)
    setTask('')
  }

  const add = () => {
    addTask(index, task)
    setTask('')
  }

  return (
    <div className={`list${children || editorActive ? '' : ' empty'}`}>
      {children && (
        <div className="list-header">
          <span className="list-title">{title}</span>
        </div>
      )}

      <div className="list-content">{children}</div>

      <div className="list-content">
        {editorActive && (
          <>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="card-editor"
              rows={children ? 3 : 1}
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
        <button className="add" onClick={() => setEditorActive(true)}>
          + {btnLabel}
        </button>
      </div>
    </div>
  )
}

List.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  addTask: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default connect(null, { addTask })(List)
