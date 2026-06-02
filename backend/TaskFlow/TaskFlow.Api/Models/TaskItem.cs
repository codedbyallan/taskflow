namespace TaskFlow.Api.Models
{
    public class TaskItem
    {
        public string? Id { get; set; } 
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = "pending";
        public string Priority { get; set; } = "medium";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
