function SummaryCards({ totalTasks, pendingTasks, completedTasks }) {
    return (
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
    )
  }
  
  export default SummaryCards