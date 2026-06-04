import './App.css'

function App() {
  return (
    <main className="app">
      <section className="hero">
        <div>
          <span className="eyebrow">TaskFlow</span>
          <h1>Organize suas tarefas com clareza.</h1>
          <p>
            Uma aplicação de gerenciamento de tarefas criada com React, ASP.NET Core
            e MongoDB Atlas.
          </p>
        </div>

        <button className="primary-button">
          Nova tarefa
        </button>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <span>Total</span>
          <strong>3</strong>
          <p>Tarefas cadastradas</p>
        </article>

        <article className="summary-card">
          <span>Pendentes</span>
          <strong>2</strong>
          <p>Aguardando conclusão</p>
        </article>

        <article className="summary-card">
          <span>Concluídas</span>
          <strong>1</strong>
          <p>Finalizadas com sucesso</p>
        </article>
      </section>

      <section className="tasks-panel">
        <div className="panel-header">
          <div>
            <h2>Minhas tarefas</h2>
            <p>Visualização inicial estática do TaskFlow.</p>
          </div>
        </div>

        <div className="task-list">
          <article className="task-card">
            <div>
              <h3>Estudar React com Vite</h3>
              <p>Entender componentes, JSX, CSS e estrutura inicial do frontend.</p>
            </div>
            <span className="badge medium">medium</span>
          </article>

          <article className="task-card">
            <div>
              <h3>Integrar frontend com API</h3>
              <p>Consumir os endpoints do backend usando fetch.</p>
            </div>
            <span className="badge high">high</span>
          </article>

          <article className="task-card completed">
            <div>
              <h3>Criar backend com MongoDB</h3>
              <p>CRUD persistente criado com ASP.NET Core e MongoDB Atlas.</p>
            </div>
            <span className="badge low">completed</span>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App