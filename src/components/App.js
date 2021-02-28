import '../styles/App.scss'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">Github Board</h1>
      </header>

      <div className="board">
        <div className="list">
          <div className="list-header">
            <span className="list-title">TO DO</span>
          </div>

          <div className="list-content">
            <div className="card">
              <span>task 1</span>
            </div>
            <div className="card">
              <span>task 1</span>
            </div>
            <div className="card">
              <span>task 1</span>
            </div>
          </div>

          <div className="list-footer">
            <button className="add-card">+ Adicionar outro cartão</button>
          </div>
        </div>

        <div className="list">
          <div className="list-header">
            <span className="list-title">IN PROGRESS</span>
          </div>

          <div className="list-content">
            <div className="card">
              <span>task 2</span>
            </div>
            <div className="card">
              <span>task 2</span>
            </div>
            <div className="card">
              <span>task 2</span>
            </div>
          </div>

          <div className="list-footer">
            <button className="add-card">+ Adicionar outro cartão</button>
          </div>
        </div>

        <div className="list">
          <div className="list-header">
            <span className="list-title">DONE</span>
          </div>

          <div className="list-content">
            <div className="card">
              <span>task 3</span>
            </div>
            <div className="card">
              <span>task 3</span>
            </div>
            <div className="card">
              <span>task 3</span>
            </div>
          </div>

          <div className="list-footer">
            <button className="add-card">+ Adicionar outro cartão</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
