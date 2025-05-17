import React, { useState } from 'react';
import notesService from '../../services/notesService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';
registerLocale('de', de);

const AddNotesForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await notesService.addNote({
      title,
      description,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    });
    setLoading(false);
    if (res._id) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
      onAdd();
    } else {
      setError(res.message || 'Fehler beim Hinzufügen');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <input type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)} required style={{ flex: 2 }} />
      <input type="text" placeholder="Beschreibung" value={description} onChange={e => setDescription(e.target.value)} style={{ flex: 3 }} />
      <select value={priority} onChange={e => setPriority(e.target.value)} style={{ flex: 1 }}>
        <option value="low">Niedrig</option>
        <option value="medium">Mittel</option>
        <option value="high">Hoch</option>
      </select>
      <div style={{ flex: 1 }}>
        <DatePicker
          selected={dueDate}
          onChange={date => setDueDate(date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="tt.mm.jjjj"
          locale="de"
          className="custom-datepicker"
          isClearable
        />
      </div>
      <button type="submit" className="button-add" style={{ flex: 1 }} disabled={loading}>Hinzufügen</button>
      {error && <div style={{ color: 'red', width: '100%' }}>{error}</div>}
    </form>
  );
};

export default AddNotesForm; 