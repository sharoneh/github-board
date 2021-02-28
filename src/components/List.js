import PropTypes from 'prop-types'
import '../styles/List.scss'

const List = ({ title, children }) => {
  return (
    <div className={`list${children ? '' : ' empty'}`}>
      {children && (
        <>
          <div className="list-header">
            <span className="list-title">{title}</span>
          </div>

          <div className="list-content">{children}</div>
        </>
      )}

      <div className="list-footer">
        <button className="add">
          + Adicionar {children ? 'outro cartão' : 'outra lista'}
        </button>
      </div>
    </div>
  )
}

List.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default List
