import React, { useState } from 'react';
import notesService from '../../services/notesService';

const EditNotesModal = ({ note, onClose, onSaved }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description || '');
  const [priority, setPriority] = useState(note.priority);
  const [dueDate, setDueDate] = useState(note.dueDate ? note.dueDate.slice(0, 10) : '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await notesService.updateNote(note._id, { title, description, priority, dueDate: dueDate || undefined });
    setLoading(false);
    if (res._id) {
      onSaved();
      onClose();
    } else {
      setError(res.message || 'Fehler beim Speichern');
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px #aaa', position: 'relative' }}>
        <h3>Notiz bearbeiten</h3>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <div>
          <label>Titel</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Beschreibung</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <label>Priorität</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%' }}>
            <option value="low">Niedrig</option>
            <option value="medium">Mittel</option>
            <option value="high">Hoch</option>
          </select>
        </div>
        <div>
          <label>Fälligkeitsdatum</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button type="submit" style={{ background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px' }} disabled={loading}>Speichern</button>
          <button type="button" onClick={onClose} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px' }}>Abbrechen</button>
        </div>
      </form>
    </div>
  );
};

export default EditNotesModal; 