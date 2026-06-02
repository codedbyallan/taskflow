using Microsoft.AspNetCore.Mvc;
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
                Status = "completed",
                Priority = "high"
            }
        ];


        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(Tasks);
        }
    }
}
