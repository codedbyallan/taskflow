using TaskFlow.Api.Models;

namespace TaskFlow.Api.Repositories
{
    public class TaskRepository
    {
        private readonly List<TaskItem> _tasks =
        [
            new TaskItem
            {
                Id = "1",
                Title = "Estudar controllers no ASP.NET Core",
                Description = "Entender como uma rota da API responde uma requisição HTTP.",
                Status = "pending",
                Priority = "medium"
            },
            new TaskItem
            {
                Id = "2",
                Title = "Criar o model TaskItem",
                Description = "Representar uma tarefa dentro do backend.",
                Status = "pending",
                Priority = "high"
            }
        ];

        private int _nextId = 3;

        public List<TaskItem> GetAll()
        {
            return _tasks;
        }

        public TaskItem? GetById(string id)
        {
            return _tasks.FirstOrDefault(t => t.Id == id);
        }

        public TaskItem Create(TaskItem newTask)
        {
            newTask.Id = _nextId.ToString();
            _nextId++;
            _tasks.Add(newTask);

            return newTask;
        }

        public TaskItem? Update(TaskItem updatedTask)
        {
            var index = _tasks.FindIndex(task => task.Id == updatedTask.Id);
            if (index == -1)
            {
                return null;
            }
            _tasks[index] = updatedTask;

            return updatedTask;
        }

        public bool Delete(string id)
        {
            var task = GetById(id);
            if (task == null)
            {
                return false;
            }
            _tasks.Remove(task);

            return true;
        }
    }
}
