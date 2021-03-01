import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createIssue } from '../redux/IssuesReducer'
import '../styles/List.scss'
import Card from './Card'

const List = ({ title, issueState, issues, createIssue }) => {
  const [editorActive, setEditorActive] = useState(false)
  const [text, setText] = useState('')
  const ref = useRef(null)

  const btnLabel = issues ? 'Adicionar cartão' : 'Adicionar lista'

  const cancel = () => {
    setEditorActive(false)
    setText('')
  }

  const add = () => {
    if (!text) return

    createIssue(text, issueState)
    setText('')
  }

  const onType = (e) => {
    if (e.key === 'Enter') {
      add()
    } else if (e.key === 'Escape') {
      cancel()
    }
  }

  useEffect(() => {
    if (editorActive) ref.current.focus()
  }, [editorActive])

  return (
    <div className={`list${issues || editorActive ? '' : ' empty'}`}>
      {issues && (
        <div className="list-header">
          <span className="list-title">{title}</span>
        </div>
      )}

      <div className="list-content">
        {issues &&
          issues.map((issue, index) => (
            <Card
              issueState={issueState}
              title={issue.title}
              key={`list#${issueState}issueCard#${index}`}
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
        {!editorActive && issueState !== 'closed' && (
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
  issueState: PropTypes.string,
  createIssue: PropTypes.func.isRequired,
  issues: PropTypes.array,
}

export default connect(null, { createIssue })(List)
