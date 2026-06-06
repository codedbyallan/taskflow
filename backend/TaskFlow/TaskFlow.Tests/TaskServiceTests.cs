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
    }
}