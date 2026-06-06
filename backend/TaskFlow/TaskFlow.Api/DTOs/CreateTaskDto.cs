using System.ComponentModel.DataAnnotations;

namespace TaskFlow.Api.DTOs
{
    public class CreateTaskDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MinLength(3, ErrorMessage = "Title must have at least 3 characters.")]
        [StringLength(100, ErrorMessage = "Title must have at most 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Description must have at most 500 characters.")]
        public string? Description { get; set; }

        [RegularExpression("^(low|medium|high)$", ErrorMessage = "Priority must be low, medium or high.")]
        [StringLength(20, ErrorMessage = "Priority must have at most 20 characters.")]
        public string Priority { get; set; } = "medium";
        public DateTime? DueDate { get; set; }
    }
}
