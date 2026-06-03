using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using TaskFlow.Api.Models;
using TaskFlow.Api.Settings;

namespace TaskFlow.Api.Repositories
{
    public class TaskRepository
    {
        private readonly IMongoCollection<TaskItem> _tasksCollection;
        public TaskRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var settings = mongoDbSettings.Value;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _tasksCollection = database.GetCollection<TaskItem>(settings.TasksCollectionName);
        }

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
            return _tasksCollection.Find(_ => true).ToList();
        }

        public TaskItem? GetById(string id)
        {
            if (!ObjectId.TryParse(id, out _))
            {
                return null;
            }

            return _tasksCollection.Find(task => task.Id == id).FirstOrDefault();
        }

        public TaskItem Create(TaskItem newTask)
        {
            _tasksCollection.InsertOne(newTask);

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
