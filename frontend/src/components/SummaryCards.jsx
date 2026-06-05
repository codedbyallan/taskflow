import { Layers3, Clock3, CircleCheckBig } from "lucide-react";

function SummaryCards({ totalTasks, pendingTasks, completedTasks }) {
  return (
    <section className="summary-grid">
      <article className="summary-card total-card">
        <div className="summary-card-content">
          <span>Total</span>
          <strong>{totalTasks}</strong>
          <p>Tarefas cadastradas</p>
        </div>

        <div className="summary-card-icon">
          <Layers3 size={28} strokeWidth={2.2} />
        </div>
      </article>

      <article className="summary-card pending-card">
        <div className="summary-card-content">
          <span>Pendentes</span>
          <strong>{pendingTasks}</strong>
          <p>Aguardando conclusão</p>
        </div>

        <div className="summary-card-icon">
          <Clock3 size={28} strokeWidth={2.2} />
        </div>
      </article>

      <article className="summary-card completed-card">
        <div className="summary-card-content">
          <span>Concluídas</span>
          <strong>{completedTasks}</strong>
          <p>Finalizadas com sucesso</p>
        </div>

        <div className="summary-card-icon">
          <CircleCheckBig size={28} strokeWidth={2.2} />
        </div>
      </article>
    </section>
  );
}

export default SummaryCards;