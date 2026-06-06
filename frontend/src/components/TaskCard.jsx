function TaskCard({
  task,
  editingTaskId,
  editTitle,
  editDescription,
  editPriority,
  editDueDate,
  editError,
  taskActionId,
  onStartEdit,
  onCancelEdit,
  onUpdateTask,
  onCompleteTask,
  onDeleteTask,
  onEditTitleChange,
  onEditDescriptionChange,
  onEditPriorityChange,
  onEditDueDateChange,
}) {
  const isEditing = editingTaskId === task.id;
  const isCompleted = task.status === "completed";
  const badgeClassName = isCompleted ? "completed" : task.priority;
  const badgeText = isCompleted ? "completed" : task.priority;

  function formatDueDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const dateOnly = dateValue.split("T")[0];
    const [year, month, day] = dateOnly.split("-");

    return `${day}/${month}/${year}`;
  }

  return (
    <article className={`task-card ${isCompleted ? "completed" : ""}`}>
      {isEditing ? (
        <form
          className="inline-edit-form"
          onSubmit={(event) => onUpdateTask(event, task.id)}
        >
          <label>
            Título
            <input
              type="text"
              value={editTitle}
              onChange={(event) => onEditTitleChange(event.target.value)}
            />
          </label>

          <label>
            Descrição
            <textarea
              value={editDescription}
              onChange={(event) => onEditDescriptionChange(event.target.value)}
              rows="2"
            />
          </label>

          <label>
            Prioridade
            <select
              value={editPriority}
              onChange={(event) => onEditPriorityChange(event.target.value)}
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
              value={editDueDate}
              onChange={(event) => onEditDueDateChange(event.target.value)}
            />
          </label>

          {editError && <p className="form-error">{editError}</p>}

          <div className="inline-edit-actions">
            <button
              className="submit-button"
              type="submit"
              disabled={taskActionId === task.id}
            >
              {taskActionId === task.id ? "Salvando..." : "Salvar"}
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description || "Sem descrição cadastrada."}</p>

          {task.dueDate && (
            <small className="task-due-date">
              Vence em {formatDueDate(task.dueDate)}
            </small>
          )}
        </div>
      )}

      <div className="task-actions">
        <span className={`badge ${badgeClassName}`}>{badgeText}</span>

        {!isCompleted && (
          <button
            className="secondary-button"
            onClick={() => onCompleteTask(task.id)}
            disabled={taskActionId === task.id}
          >
            {taskActionId === task.id ? "Concluindo..." : "Concluir"}
          </button>
        )}

        {!isEditing && !isCompleted && (
          <button
            className="secondary-button"
            onClick={() => onStartEdit(task)}
            disabled={taskActionId === task.id}
          >
            Editar
          </button>
        )}

        <button
          className="danger-button"
          onClick={() => onDeleteTask(task.id)}
          disabled={taskActionId === task.id}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}

export default TaskCard;