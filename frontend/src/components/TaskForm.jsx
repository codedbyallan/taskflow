function TaskForm({
  title,
  description,
  priority,
  dueDate,
  formError,
  isSubmitting,
  onTitleChange,
  onDescriptionChange,
  onPriorityChange,
  onDueDateChange,
  onSubmit,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Título
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Ex: Estudar React"
          />
        </label>

        <label>
          Prioridade
          <select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label>
          Vencimento
          <input
            type="date"
            value={dueDate}
            onChange={(event) => onDueDateChange(event.target.value)}
          />
        </label>
      </div>

      <label>
        Descrição
        <textarea
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Descreva brevemente a tarefa"
          rows="3"
        />
      </label>

      {formError && <p className="form-error">{formError}</p>}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar tarefa"}
      </button>
    </form>
  );
}

export default TaskForm;