using TaskFlow.Api.DTOs;
using TaskFlow.Api.Models;
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

            Assert.NotNull(result);
            Assert.Single(tasks);
            Assert.Equal(result!.Id, tasks[0].Id);
            Assert.Equal("Tarefa persistida no fake", tasks[0].Title);
        }

        [Fact]
        public void Update_Should_Update_Task_Fields()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var existingTask = new TaskItem
            {
                Id = "1",
                Title = "Título antigo",
                Description = "Descrição antiga",
                Priority = "low",
                Status = "pending",
                DueDate = new DateTime(2026, 6, 10),
                CreatedAt = new DateTime(2026, 6, 1),
                UpdatedAt = new DateTime(2026, 6, 1)
            };

            repository.Add(existingTask);

            var dto = new UpdateTaskDto
            {
                Title = "Título atualizado",
                Description = "Descrição atualizada",
                Priority = "high",
                DueDate = new DateTime(2026, 6, 20)
            };

            var result = service.Update("1", dto);

            Assert.NotNull(result);
            Assert.Equal("Título atualizado", result.Title);
            Assert.Equal("Descrição atualizada", result.Description);
            Assert.Equal("high", result.Priority);
            Assert.Equal(new DateTime(2026, 6, 20), result.DueDate);
            Assert.Equal("pending", result.Status);
            Assert.Equal(new DateTime(2026, 6, 1), result.CreatedAt);
            Assert.True(result.UpdatedAt > existingTask.UpdatedAt);
        }

        [Fact]
        public void Update_Should_Keep_Existing_Values_When_Fields_Are_Empty()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var existingTask = new TaskItem
            {
                Id = "1",
                Title = "Título original",
                Description = "Descrição original",
                Priority = "medium",
                Status = "pending",
                DueDate = new DateTime(2026, 6, 10),
                CreatedAt = new DateTime(2026, 6, 1),
                UpdatedAt = new DateTime(2026, 6, 1)
            };

            repository.Add(existingTask);

            var dto = new UpdateTaskDto
            {
                Title = "",
                Description = "",
                Priority = "",
                DueDate = null
            };

            var result = service.Update("1", dto);

            Assert.NotNull(result);
            Assert.Equal("Título original", result.Title);
            Assert.Equal("Descrição original", result.Description);
            Assert.Equal("medium", result.Priority);
            Assert.Equal(new DateTime(2026, 6, 10), result.DueDate);
            Assert.Equal("pending", result.Status);
        }

        [Fact]
        public void Update_Should_Return_Null_When_Task_Does_Not_Exist()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var dto = new UpdateTaskDto
            {
                Title = "Tentativa de atualização",
                Description = "Essa tarefa não existe",
                Priority = "high",
                DueDate = new DateTime(2026, 6, 20)
            };

            var result = service.Update("999", dto);

            Assert.Null(result);
        }

        [Fact]
        public void Complete_Should_Set_Status_To_Completed()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var existingTask = new TaskItem
            {
                Id = "1",
                Title = "Tarefa pendente",
                Description = "Tarefa que será concluída",
                Priority = "medium",
                Status = "pending",
                CreatedAt = new DateTime(2026, 6, 1),
                UpdatedAt = new DateTime(2026, 6, 1)
            };

            repository.Add(existingTask);

            var result = service.Complete("1");

            Assert.NotNull(result);
            Assert.Equal("completed", result!.Status);
            Assert.Equal("Tarefa pendente", result.Title);
            Assert.Equal("medium", result.Priority);
            Assert.Equal(new DateTime(2026, 6, 1), result.CreatedAt);
            Assert.True(result.UpdatedAt > existingTask.UpdatedAt);
        }

        [Fact]
        public void Complete_Should_Return_Null_When_Task_Does_Not_Exist()
        {
            var repository = new FakeTaskRepository();
            var service = new TaskService(repository);

            var result = service.Complete("999");

            Assert.Null(result);
        }
    }
}
