const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/api/tasks`)

  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas.')
  }

  return response.json()
}

export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar tarefa.')
  }

  return response.json()
}

export async function completeTask(id) {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
    method: 'PATCH',
  })

  if (!response.ok) {
    throw new Error('Erro ao concluir tarefa.')
  }

  return response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir tarefa.')
  }
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar tarefa.')
  }

  return response.json()
}