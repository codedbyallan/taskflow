using TaskFlow.Api.DTOs;
using TaskFlow.Api.Services;
using TaskFlow.Tests.Fakes;

namespace TaskFlow.Tests
{
    public class TaskServiceTests
    {
        [Fact]
        public void Create_Should_Create_Task_With_Pending_Status()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var dto = new CreateTaskDto
            {
                Title = "Estudar testes automatizados",
                Description = "Criar primeiro teste real do TaskService",
                Priority = "high",
                DueDate = new DateTime(2026, 6, 10)
            };

            var result = service.Create(dto);

            Assert.NotNull(result);
            Assert.False(string.IsNullOrWhiteSpace(result.Id));
            Assert.Equal("Estudar testes automatizados", result.Title);
            Assert.Equal("pending", result.Status);
            Assert.Equal("high", result.Priority);
            Assert.Equal(new DateTime(2026, 6, 10), result.DueDate);
        }

    [Fact]
        public void Create_Should_Use_Medium_Priority_When_Priority_Is_Empty()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var dto = new CreateTaskDto
            {
                Title = "Tarefa sem prioridade informada",
                Description = "Testando prioridade padrão",
                Priority = ""
            };

            var result = service.Create(dto);

            Assert.NotNull(result);
            Assert.Equal("medium", result.Priority);
            Assert.Equal("pending", result.Status);
        }

        [Fact]
        public void Create_Should_Allow_Task_Without_DueDate()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var dto = new CreateTaskDto
            {
                Title = "Tarefa sem vencimento",
                Description = "Testando tarefa sem data",
                Priority = "low",
                DueDate = null
            };

            var result = service.Create(dto);

            Assert.NotNull(result);
            Assert.Equal("Tarefa sem vencimento", result.Title);
            Assert.Equal("low", result.Priority);
            Assert.Null(result.DueDate);
        }

        [Fact]
        public void Create_Should_Save_Task_In_Repository()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var dto = new CreateTaskDto
            {
                Title = "Tarefa persistida no fake",
                Description = "Testando se o fake recebeu a tarefa",
                Priority = "high"
            };

            var result = service.Create(dto);
            var tasks = repository.GetAll();

            Assert.Single(tasks);
            Assert.Equal(result.Id, tasks[0].Id);
            Assert.Equal("Tarefa persistida no fake", tasks[0].Title);
        }
    }
}
