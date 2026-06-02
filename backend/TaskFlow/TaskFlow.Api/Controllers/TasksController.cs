using Microsoft.AspNetCore.Mvc;
using TaskFlow.Api.DTOs;
using TaskFlow.Api.Models;
using TaskFlow.Api.Services;


namespace TaskFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;
        
        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

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
            var tasks = _taskService.GetAll();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public IActionResult GetTask(string id)
        {
            var task = _taskService.GetById(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] CreateTaskDto dto)
        {
            var newTask = _taskService.Create(dto);

            if (newTask == null)
            {
                return BadRequest("Title is required.");
            }

            return Created($"/api/tasks/{newTask.Id}", newTask);
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

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(string id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            Tasks.Remove(task);
            return NoContent();
        }
    }
}
