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
  function parseTaskDate(dateValue) {
    if (!dateValue) {
      return null;
    }

    const dateOnly = dateValue.split("T")[0];
    const [year, month, day] = dateOnly.split("-").map(Number);

    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);

    return date;
  }

  function getTodayDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today;
  }

  function getTaskGroup(task) {
    if (task.status === "completed") {
      return "completed";
    }

    if (!task.dueDate) {
      return "noDate";
    }

    const today = getTodayDate();
    const dueDate = parseTaskDate(task.dueDate);

    if (!dueDate) {
      return "noDate";
    }

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "overdue";
    }

    if (diffDays === 0) {
      return "today";
    }

    if (diffDays <= 7) {
      return "upcoming";
    }

    return "future";
  }

  const groupedTasks = {
    overdue: [],
    today: [],
    upcoming: [],
    future: [],
    noDate: [],
    completed: [],
  };

  tasks.forEach((task) => {
    const group = getTaskGroup(task);
    groupedTasks[group].push(task);
  });

  const sections = [
    {
      key: "overdue",
      title: "Atrasadas",
      description: "Tarefas que já passaram do prazo.",
      tasks: groupedTasks.overdue,
    },
    {
      key: "today",
      title: "Hoje",
      description: "Tarefas que vencem hoje.",
      tasks: groupedTasks.today,
    },
    {
      key: "upcoming",
      title: "Próximas",
      description: "Tarefas com vencimento nos próximos 7 dias.",
      tasks: groupedTasks.upcoming,
    },
    {
      key: "future",
      title: "Futuras",
      description: "Tarefas com vencimento mais distante.",
      tasks: groupedTasks.future,
    },
    {
      key: "noDate",
      title: "Sem prazo",
      description: "Tarefas ainda sem data de vencimento.",
      tasks: groupedTasks.noDate,
    },
    {
      key: "completed",
      title: "Concluídas",
      description: "Tarefas finalizadas.",
      tasks: groupedTasks.completed,
    },
  ];

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

        <strong>Nenhuma tarefa encontrada.</strong>
        <p>Crie uma nova tarefa ou ajuste a busca e os filtros ativos.</p>
      </div>
    );
  }

  return (
    <div className="task-groups">
      {sections
        .filter((section) => section.tasks.length > 0)
        .map((section) => (
          <section className="task-group" key={section.key}>
            <div className="task-group-header">
              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>

              <span>{section.tasks.length}</span>
            </div>

            <div className="task-list">
              {section.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  editingTaskId={editingTaskId}
                  editTitle={editTitle}
                  editDescription={editDescription}
                  editPriority={editPriority}
                  editDueDate={editDueDate}
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
                  onEditDueDateChange={onEditDueDateChange}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}

export default TaskList;