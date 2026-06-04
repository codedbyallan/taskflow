const API_BASE_URL = 'https://localhost:7064'

export async function getTasks() {
  const response = await fetch(`${API_BASE_URL}/api/tasks`)

  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas.')
  }

  return response.json()
}