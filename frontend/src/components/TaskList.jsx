import { Inbox } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  isLoading,
  errorMessage,
  editingTaskId,
  editTitle,
  editDescription,
  editPriority,
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
}) {
  if (isLoading) {
    return <p className="state-message">Carregando tarefas...</p>;
  }

  if (errorMessage) {
    return <p className="state-message error">{errorMessage}</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Inbox size={34} strokeWidth={1.8} />
        </div>

        <strong>Nenhuma tarefa cadastrada ainda.</strong>
        <p>Clique em “Nova tarefa” para começar a organizar sua rotina.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          editingTaskId={editingTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          editPriority={editPriority}
          editError={editError}
          taskActionId={taskActionId}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onUpdateTask={onUpdateTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          onEditTitleChange={onEditTitleChange}
          onEditDescriptionChange={onEditDescriptionChange}
          onEditPriorityChange={onEditPriorityChange}
        />
      ))}
    </div>
  );
}

export default TaskList;