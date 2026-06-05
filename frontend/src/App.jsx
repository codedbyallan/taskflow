import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
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

        {isLoading && <p className="state-message">Carregando tarefas...</p>}

        {!isLoading && errorMessage && (
          <p className="state-message error">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && tasks.length === 0 && (
          <p className="state-message">Nenhuma tarefa cadastrada ainda.</p>
        )}

        {!isLoading && !errorMessage && tasks.length > 0 && (
          <div className="task-list">
            {tasks.map((task) => (
              <article
                key={task.id}
                className={`task-card ${
                  task.status === "completed" ? "completed" : ""
                }`}
              >
                {editingTaskId === task.id ? (
                  <form
                    className="inline-edit-form"
                    onSubmit={(event) => handleUpdateTask(event, task.id)}
                  >
                    <label>
                      Título
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                      />
                    </label>

                    <label>
                      Descrição
                      <textarea
                        value={editDescription}
                        onChange={(event) =>
                          setEditDescription(event.target.value)
                        }
                        rows="2"
                      />
                    </label>

                    <label>
                      Prioridade
                      <select
                        value={editPriority}
                        onChange={(event) =>
                          setEditPriority(event.target.value)
                        }
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </select>
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
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description || "Sem descrição cadastrada."}</p>
                  </div>
                )}

                <div className="task-actions">
                  <span
                    className={`badge ${
                      task.status === "completed" ? "completed" : task.priority
                    }`}
                  >
                    {task.status === "completed" ? "completed" : task.priority}
                  </span>

                  {task.status !== "completed" && (
                    <button
                      className="secondary-button"
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={taskActionId === task.id}
                    >
                      {taskActionId === task.id ? "Concluindo..." : "Concluir"}
                    </button>
                  )}

                  {editingTaskId !== task.id && (
                    <button
                      className="secondary-button"
                      onClick={() => handleStartEdit(task)}
                      disabled={taskActionId === task.id}
                    >
                      Editar
                    </button>
                  )}

                  <button
                    className="danger-button"
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={taskActionId === task.id}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
