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
            if (string.IsNullOrWhiteSpace(updatedTask.Id) || !ObjectId.TryParse(updatedTask.Id, out _))
            {
                return null;
            }

            var result = _tasksCollection.ReplaceOne(
                task => task.Id == updatedTask.Id,
                updatedTask
            );

            if (result.MatchedCount == 0)
            {
                return null;
            }

            return updatedTask;
        }

        public bool Delete(string id)
        {
            if (!ObjectId.TryParse(id, out _))
            {
                return false;
            }

            var result = _tasksCollection.DeleteOne(task => task.Id == id);

            return result.DeletedCount > 0;
        }
    }
}
