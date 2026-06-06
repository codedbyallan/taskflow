using TaskFlow.Api.DTOs;
using TaskFlow.Api.Models;
using TaskFlow.Api.Repositories;


namespace TaskFlow.Api.Services
{
    public class TaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public List<TaskItem> GetAll()
        {
            return _taskRepository.GetAll();
        }
        public TaskItem? GetById(string id)
        {
            return _taskRepository.GetById(id);
        }

        public TaskItem? Create(CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                return null;
            }

            var newTask = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = string.IsNullOrWhiteSpace(dto.Priority) ? "medium" : dto.Priority,
                DueDate = dto.DueDate,
                Status = "pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            return _taskRepository.Create(newTask);
        }

        public TaskItem? Update(string id, UpdateTaskDto dto)
        {
            var existingTask = _taskRepository.GetById(id);

            if (existingTask == null)
            {
                return null;
            }

            var updatedTask = new TaskItem
            {
                Id = existingTask.Id,
                Title = string.IsNullOrWhiteSpace(dto.Title) ? existingTask.Title : dto.Title,
                Description = string.IsNullOrWhiteSpace(dto.Description) ? existingTask.Description : dto.Description,
                Priority = string.IsNullOrWhiteSpace(dto.Priority) ? existingTask.Priority : dto.Priority,
                DueDate = dto.DueDate ?? existingTask.DueDate,
                Status = existingTask.Status,
                CreatedAt = existingTask.CreatedAt,
                UpdatedAt = DateTime.UtcNow
            };

            return _taskRepository.Update(updatedTask);
        }

        public TaskItem? Complete(string id)
        {
            var existingTask = _taskRepository.GetById(id);

            if (existingTask == null)
            {
                return null;
            }

            var completedTask = new TaskItem
            {
                Id = existingTask.Id,
                Title = existingTask.Title,
                Description = existingTask.Description,
                Priority = existingTask.Priority,
                Status = "completed",
                CreatedAt = existingTask.CreatedAt,
                UpdatedAt = DateTime.UtcNow
            };

            return _taskRepository.Update(completedTask);
        }

        public bool Delete(string id)
        {
            return _taskRepository.Delete(id);
        }
    }
}
