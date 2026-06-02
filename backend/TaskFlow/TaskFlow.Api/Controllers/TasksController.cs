using Microsoft.AspNetCore.Mvc;
using TaskFlow.Api.DTOs;
using TaskFlow.Api.Models;


namespace TaskFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> Tasks =
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


        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(Tasks);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                return BadRequest("Title is required.");
            }

            var newTask = new TaskItem
            {
                Id = (Tasks.Count + 1).ToString(),
                Title = dto.Title,
                Description = dto.Description,
                Priority = string.IsNullOrWhiteSpace(dto.Priority) ? "medium" : dto.Priority,
                Status = "pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            Tasks.Add(newTask);

            return Created($"/api/tasks/{newTask.Id}", newTask);
        }

        [HttpGet("{id}")]
        public IActionResult GetTask(string id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(string id, [FromBody] UpdateTaskDto dto)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            task.Title = string.IsNullOrWhiteSpace(dto.Title) ? task.Title : dto.Title;
            task.Description = string.IsNullOrWhiteSpace(dto.Description) ? task.Description : dto.Description;
            task.Priority = string.IsNullOrWhiteSpace(dto.Priority) ? task.Priority : dto.Priority;
            task.UpdatedAt = DateTime.UtcNow;

            return Ok(task);
        }

        [HttpPatch("{id}/complete")]
        public IActionResult CompleteTask(string id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = "completed";
            task.UpdatedAt = DateTime.UtcNow;

            return Ok(task);
        }
    }
}
