using TaskFlow.Api.Models;

namespace TaskFlow.Api.Repositories
{
    public interface ITaskRepository
    {
        List<TaskItem> GetAll();

        TaskItem? GetById(string id);

        TaskItem Create(TaskItem newTask);

        TaskItem? Update(TaskItem updatedTask);

        bool Delete(string id);
    }
}