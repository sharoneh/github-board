import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from './Header'
import List from './List'
import '../styles/App.scss'

function App({ lists }) {
  return (
    <div className="app">
      <Header />

      <div className="board">
        {lists.map(({ title, tasks }, listIndex) => (
          <List
            title={title}
            key={`list#${listIndex}`}
            index={listIndex}
            tasks={tasks}
          />
        ))}

        <List />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ lists: state.lists })

App.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ),
}

export default connect(mapStateToProps)(App)
