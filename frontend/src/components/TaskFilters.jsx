function TaskFilters({
    searchTerm,
    activeFilter,
    resultsCount,
    onSearchChange,
    onFilterChange,
  }) {
    const filters = [
      { value: "all", label: "Todas" },
      { value: "pending", label: "Pendentes" },
      { value: "completed", label: "Concluídas" },
      { value: "overdue", label: "Atrasadas" },
      { value: "today", label: "Hoje" },
      { value: "upcoming", label: "Próximas" },
      { value: "future", label: "Futuras" },
      { value: "no-date", label: "Sem prazo" },
    ];
  
    return (
      <div className="task-filters">
        <div className="search-box">
          <label htmlFor="task-search">Buscar tarefa</label>
          <input
            id="task-search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por título ou descrição..."
          />
        </div>
  
        <div className="filter-area">
          <div className="filter-buttons">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`filter-button ${
                  activeFilter === filter.value ? "active" : ""
                }`}
                onClick={() => onFilterChange(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
  
          <span className="results-count">
            {resultsCount} resultado{resultsCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    );
  }
  
  export default TaskFilters;