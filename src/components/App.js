import Header from './Header'
import List from './List'
import Card from './Card'
import '../styles/App.scss'

function App() {
  return (
    <div className="app">
      <Header />

      <div className="board">
        <List title="TO DO">
          <Card title="task 1" />
          <Card title="task 1" />
          <Card title="task 1" />
        </List>

        <List title="IN PROGRESS">
          <Card title="task 1" />
          <Card title="task 1" />
          <Card title="task 1" />
        </List>

        <List title="IN REVIEW">
          <Card title="task 1" />
          <Card title="task 1" />
          <Card title="task 1" />
        </List>

        <List title="DONE">
          <Card title="task 1" />
          <Card title="task 1" />
          <Card title="task 1" />
        </List>

        <List />
      </div>
    </div>
  )
}

export default App
