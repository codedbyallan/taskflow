using TaskFlow.Api.Models;

namespace TaskFlow.Api.Services
{
    public class TaskService
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

        public List<TaskItem> GetAll()
        {
            return _tasks;
        }
        public TaskItem? GetById(string id)
        {
            return _tasks.FirstOrDefault(task => task.Id == id);
        }
    }
}
