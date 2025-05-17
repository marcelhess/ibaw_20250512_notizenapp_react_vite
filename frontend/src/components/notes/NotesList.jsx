import React, { useEffect, useState } from 'react';
import notesService from '../../services/notesService';
import NotesItem from './NotesItem';
import Spinner from '../common/Spinner';

const NotesList = ({ filterSort, onFeedback }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    const res = await notesService.getNotes(filterSort);
    if (Array.isArray(res)) {
      setNotes(res);
    } else {
      setError(res.message || 'Fehler beim Laden der Notizen');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, [JSON.stringify(filterSort)]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (notes.length === 0) return <div>Keine Notizen gefunden.</div>;

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NotesItem key={note._id} note={note} onUpdate={fetchNotes} onFeedback={onFeedback} />
      ))}
    </div>
  );
};

export default NotesList; 