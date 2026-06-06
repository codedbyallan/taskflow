import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskActionId, setTaskActionId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editDueDate, setEditDueDate] = useState("");
  const [editError, setEditError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setErrorMessage("Não foi possível carregar as tarefas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

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

  function matchesDateFilter(task) {
    const today = getTodayDate();
    const dueDate = parseTaskDate(task.dueDate);

    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "pending") {
      return task.status === "pending";
    }

    if (activeFilter === "completed") {
      return task.status === "completed";
    }

    if (activeFilter === "no-date") {
      return task.status !== "completed" && !task.dueDate;
    }

    if (!dueDate || task.status === "completed") {
      return false;
    }

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (activeFilter === "overdue") {
      return diffDays < 0;
    }

    if (activeFilter === "today") {
      return diffDays === 0;
    }

    if (activeFilter === "upcoming") {
      return diffDays > 0 && diffDays <= 7;
    }

    if (activeFilter === "future") {
      return diffDays > 7;
    }

    return true;
  }

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const description = task.description?.toLowerCase() || "";

    const matchesSearch =
      title.includes(normalizedSearchTerm) ||
      description.includes(normalizedSearchTerm);

    return matchesSearch && matchesDateFilter(task);
  });

  async function handleCreateTask(event) {
    event.preventDefault();

    if (!title.trim()) {
      setFormError("Informe o título da tarefa.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError("");
      setErrorMessage("");

      await createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
      });

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setShowForm(false);
    } catch (error) {
      setFormError("Não foi possível criar a tarefa.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCompleteTask(id) {
    try {
      setTaskActionId(id);
      setErrorMessage("");

      await completeTask(id);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      setErrorMessage("Não foi possível concluir a tarefa.");
    } finally {
      setTaskActionId("");
    }
  }

  async function handleDeleteTask(id) {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setTaskActionId(id);
      setErrorMessage("");

      await deleteTask(id);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      setErrorMessage("Não foi possível excluir a tarefa.");
    } finally {
      setTaskActionId("");
    }
  }

  function handleStartEdit(task) {
    const taskDueDate = task.dueDate || task.DueDate || "";
    const formattedDueDate = taskDueDate.includes("T")
      ? taskDueDate.split("T")[0]
      : taskDueDate;

    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditDueDate(formattedDueDate);
    setEditError("");
  }

  function handleCancelEdit() {
    setEditingTaskId("");
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
    setEditDueDate("");
    setEditError("");
  }

  async function handleUpdateTask(event, id) {
    event.preventDefault();

    if (!editTitle.trim()) {
      setEditError("Informe o título da tarefa.");
      return;
    }

    try {
      setTaskActionId(id);
      setEditError("");
      setErrorMessage("");

      await updateTask(id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        dueDate: editDueDate || null,
      });

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      handleCancelEdit();
    } catch (error) {
      setEditError("Não foi possível atualizar a tarefa.");
    } finally {
      setTaskActionId("");
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app">
        <Header
          showForm={showForm}
          onToggleForm={() => setShowForm((currentValue) => !currentValue)}
        />

        <SummaryCards
          totalTasks={totalTasks}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />

        <section className="tasks-panel">
          <div className="panel-header">
            <div>
              <h2>Minhas tarefas</h2>
              <p>Tarefas carregadas diretamente da API.</p>
            </div>
          </div>

          <TaskFilters
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            resultsCount={filteredTasks.length}
            onSearchChange={setSearchTerm}
            onFilterChange={setActiveFilter}
          />

          {showForm && (
            <TaskForm
              title={title}
              description={description}
              priority={priority}
              dueDate={dueDate}
              formError={formError}
              isSubmitting={isSubmitting}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onPriorityChange={setPriority}
              onDueDateChange={setDueDate}
              onSubmit={handleCreateTask}
            />
          )}

          <TaskList
            tasks={filteredTasks}
            isLoading={isLoading}
            errorMessage={errorMessage}
            editingTaskId={editingTaskId}
            editTitle={editTitle}
            editDescription={editDescription}
            editPriority={editPriority}
            editDueDate={editDueDate}
            editError={editError}
            taskActionId={taskActionId}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onUpdateTask={handleUpdateTask}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onEditTitleChange={setEditTitle}
            onEditDescriptionChange={setEditDescription}
            onEditPriorityChange={setEditPriority}
            onEditDueDateChange={setEditDueDate}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
