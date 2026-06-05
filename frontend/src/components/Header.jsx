function Header({ showForm, onToggleForm }) {
  return (
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
        onClick={onToggleForm}
      >
        {showForm ? 'Fechar formulário' : 'Nova tarefa'}
      </button>
    </section>
  )
}

export default Header