import React, { useState } from 'react';
import notesService from '../../services/notesService';
import EditNotesModal from './EditNotesModal';
import Alert from '../common/Alert';

const NotesItem = ({ note, onUpdate, onFeedback }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [alert, setAlert] = useState(null);

  const priorityLabel = {
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
  };

  const handleDelete = async () => {
    if (!window.confirm('Notiz wirklich löschen?')) return;
    setLoading(true);
    setError(null);
    const res = await notesService.deleteNote(note._id);
    setLoading(false);
    if (res.message === 'Notiz gelöscht.') {
      setAlert({ type: 'success', message: 'Notiz gelöscht.' });
      onUpdate();
      if (onFeedback) onFeedback('Notiz gelöscht!');
    } else {
      setError(res.message || 'Fehler beim Löschen');
    }
  };

  const handleToggleCompleted = async () => {
    setLoading(true);
    setError(null);
    const res = await notesService.updateNote(note._id, { completed: !note.completed });
    setLoading(false);
    if (res._id) {
      setAlert({ type: 'success', message: 'Status geändert.' });
      onUpdate();
      if (onFeedback) onFeedback('Status geändert!');
    } else {
      setError(res.message || 'Fehler beim Aktualisieren');
    }
  };

  const handleEditSaved = () => {
    setShowEdit(false);
    onUpdate();
    if (onFeedback) onFeedback('Notiz gespeichert!');
  };

  return (
    <div className="note-card">
      <h4 style={{ margin: 0 }}>{note.title}</h4>
      <div style={{ color: '#888', fontSize: 12 }}>{note.dueDate ? new Date(note.dueDate).toLocaleDateString() : ''}</div>
      <div style={{ margin: '8px 0' }}>{note.description}</div>
      <div>Priorität: <b>{priorityLabel[note.priority] || note.priority}</b></div>
      <div>Status: {note.completed ? 'Erledigt' : 'Offen'}</div>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      <div className="note-actions">
        <button onClick={handleToggleCompleted} className="button-done" disabled={loading}>
          {note.completed ? 'Offen' : 'Erledigt'}
        </button>
        <button onClick={() => setShowEdit(true)} className="button-edit" disabled={loading}>
          Bearbeiten
        </button>
        <button onClick={handleDelete} className="button-danger" disabled={loading}>
          Löschen
        </button>
      </div>
      {showEdit && <EditNotesModal note={note} onClose={() => setShowEdit(false)} onSaved={handleEditSaved} />}
    </div>
  );
};

export default NotesItem; 