import { useEffect, useState } from 'react'
import './App.css'
import { getTasks } from './services/taskService'

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (error) {
        setErrorMessage('Não foi possível carregar as tarefas.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === 'completed').length
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length

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
          <strong>{totalTasks}</strong>
          <p>Tarefas cadastradas</p>
        </article>

        <article className="summary-card">
          <span>Pendentes</span>
          <strong>{pendingTasks}</strong>
          <p>Aguardando conclusão</p>
        </article>

        <article className="summary-card">
          <span>Concluídas</span>
          <strong>{completedTasks}</strong>
          <p>Finalizadas com sucesso</p>
        </article>
      </section>

      <section className="tasks-panel">
        <div className="panel-header">
          <div>
            <h2>Minhas tarefas</h2>
            <p>Tarefas carregadas diretamente da API.</p>
          </div>
        </div>

        {isLoading && (
          <p className="state-message">Carregando tarefas...</p>
        )}

        {!isLoading && errorMessage && (
          <p className="state-message error">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && tasks.length === 0 && (
          <p className="state-message">Nenhuma tarefa cadastrada ainda.</p>
        )}

        {!isLoading && !errorMessage && tasks.length > 0 && (
          <div className="task-list">
            {tasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${task.status === 'completed' ? 'completed' : ''}`}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || 'Sem descrição cadastrada.'}</p>
                </div>

                <span className={`badge ${task.status === 'completed' ? 'completed' : task.priority}`}>
                  {task.status === 'completed' ? 'completed' : task.priority}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App