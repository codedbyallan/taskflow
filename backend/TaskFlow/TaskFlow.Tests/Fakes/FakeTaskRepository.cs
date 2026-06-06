using TaskFlow.Api.Models;
using TaskFlow.Api.Repositories;

namespace TaskFlow.Tests.Fakes
{
    public class FakeTaskRepository : ITaskRepository
    {
        private readonly List<TaskItem> _tasks = [];

        public List<TaskItem> GetAll()
        {
            return _tasks;
        }

        public TaskItem? GetById(string id)
        {
            return _tasks.FirstOrDefault(task => task.Id == id);
        }

        public TaskItem Create(TaskItem newTask)
        {
            if (string.IsNullOrWhiteSpace(newTask.Id))
            {
                newTask.Id = Guid.NewGuid().ToString();
            }

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

        public void Add(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Id))
            {
                task.Id = Guid.NewGuid().ToString();
            }

            _tasks.Add(task);
        }
    }
}