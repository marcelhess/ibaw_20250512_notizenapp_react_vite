const API_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const getToken = () => localStorage.getItem('token');

const getNotes = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/notes${query ? `?${query}` : ''}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

const getNote = async (id) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

const addNote = async (note) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
};

const updateNote = async (id, note) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
};

const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

const notesService = { getNotes, getNote, addNote, updateNote, deleteNote };
export default notesService; 