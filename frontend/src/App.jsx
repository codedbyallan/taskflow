import { useEffect, useState } from 'react'
import './App.css'
import { completeTask, createTask, deleteTask, getTasks } from './services/taskService'

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [taskActionId, setTaskActionId] = useState('')

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

  async function handleCreateTask(event) {
    event.preventDefault()

    if (!title.trim()) {
      setFormError('Informe o título da tarefa.')
      return
    }

    try {
      setIsSubmitting(true)
      setFormError('')
      setErrorMessage('')

      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
      })

      const updatedTasks = await getTasks()
      setTasks(updatedTasks)

      setTitle('')
      setDescription('')
      setPriority('medium')
      setShowForm(false)
    } catch (error) {
      setFormError('Não foi possível criar a tarefa.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCompleteTask(id) {
    try {
      setTaskActionId(id)
      setErrorMessage('')

      await completeTask(id)

      const updatedTasks = await getTasks()
      setTasks(updatedTasks)
    } catch (error) {
      setErrorMessage('Não foi possível concluir a tarefa.')
    } finally {
      setTaskActionId('')
    }
  }

  async function handleDeleteTask(id) {
    const confirmDelete = window.confirm('Deseja realmente excluir esta tarefa?')

    if (!confirmDelete) {
      return
    }

    try {
      setTaskActionId(id)
      setErrorMessage('')

      await deleteTask(id)

      const updatedTasks = await getTasks()
      setTasks(updatedTasks)
    } catch (error) {
      setErrorMessage('Não foi possível excluir a tarefa.')
    } finally {
      setTaskActionId('')
    }
  }

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

        <button
          className="primary-button"
          onClick={() => setShowForm((currentValue) => !currentValue)}
        >
          {showForm ? 'Fechar formulário' : 'Nova tarefa'}
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

        {showForm && (
          <form className="task-form" onSubmit={handleCreateTask}>
            <div className="form-grid">
              <label>
                Título
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ex: Estudar React"
                />
              </label>

              <label>
                Prioridade
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </label>
            </div>

            <label>
              Descrição
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente a tarefa"
                rows="3"
              />
            </label>

            {formError && (
              <p className="form-error">{formError}</p>
            )}

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar tarefa'}
            </button>
          </form>
        )}

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

                <div className="task-actions">
                  <span className={`badge ${task.status === 'completed' ? 'completed' : task.priority}`}>
                    {task.status === 'completed' ? 'completed' : task.priority}
                  </span>

                  {task.status !== 'completed' && (
                    <button
                      className="secondary-button"
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={taskActionId === task.id}
                    >
                      {taskActionId === task.id ? 'Concluindo...' : 'Concluir'}
                    </button>
                  )}

                  <button
                    className="danger-button"
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={taskActionId === task.id}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App