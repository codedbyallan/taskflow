import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
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
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskActionId, setTaskActionId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editError, setEditError] = useState("");

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
      });

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      setTitle("");
      setDescription("");
      setPriority("medium");
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
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority);
    setEditError("");
  }

  function handleCancelEdit() {
    setEditingTaskId("");
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
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

        {showForm && (
          <TaskForm
            title={title}
            description={description}
            priority={priority}
            formError={formError}
            isSubmitting={isSubmitting}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onPriorityChange={setPriority}
            onSubmit={handleCreateTask}
          />
        )}

        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          errorMessage={errorMessage}
          editingTaskId={editingTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          editPriority={editPriority}
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
        />
      </section>
    </main>
  );
}

export default App;
