import { Plus } from 'lucide-react'

function Header({ showForm, onToggleForm }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <img
          className="hero-logo"
          src="/assets/taskflow-logo-horizontal.png"
          alt="TaskFlow"
        />

        <h1>
          Organize suas tarefas com <span>clareza.</span>
        </h1>

        <p>
          Uma aplicação de gerenciamento de tarefas criada com React, ASP.NET Core
          e MongoDB Atlas.
        </p>
      </div>

      <button
        className="primary-button"
        onClick={onToggleForm}
      >
        <Plus size={18} />
        {showForm ? 'Fechar formulário' : 'Nova tarefa'}
      </button>
    </section>
  )
}

export default Header