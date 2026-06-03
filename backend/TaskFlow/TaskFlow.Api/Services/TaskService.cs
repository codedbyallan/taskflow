using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.NetworkInformation;
using TaskFlow.Api.DTOs;
using TaskFlow.Api.Models;
using TaskFlow.Api.Repositories;


namespace TaskFlow.Api.Services
{
    public class TaskService
    {
        private readonly TaskRepository _taskRepository;
        public TaskService(TaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
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

        private int _nextId = 3;

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
                Status = existingTask.Status,
                CreatedAt = existingTask.CreatedAt,
                UpdatedAt = DateTime.UtcNow
            };

            return _taskRepository.Update(updatedTask);
        }

        public TaskItem? Complete(string id)
        {
            var task = GetById(id);

            if (task == null)
            {
                return null;
            }

            task.Status = "completed";
            task.UpdatedAt = DateTime.UtcNow;

            return task;
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
