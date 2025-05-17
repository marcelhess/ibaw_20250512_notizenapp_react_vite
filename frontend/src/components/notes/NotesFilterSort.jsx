import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import de from 'date-fns/locale/de';
registerLocale('de', de);

const NotesFilterSort = ({ filterSort, setFilterSort }) => {
  const handleChange = (e) => {
    setFilterSort({ ...filterSort, [e.target.name]: e.target.value });
  };
  const handleDateChange = (name, date) => {
    setFilterSort({ ...filterSort, [name]: date ? date.toISOString().slice(0, 10) : '' });
  };

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
      <input
        type="text"
        name="search"
        placeholder="Suchen... (Titel/Beschreibung)"
        value={filterSort.search || ''}
        onChange={handleChange}
        style={{ flex: 2 }}
      />
      <select name="priority" value={filterSort.priority || ''} onChange={handleChange} style={{ flex: 1 }}>
        <option value="">Alle Prioritäten</option>
        <option value="low">Niedrig</option>
        <option value="medium">Mittel</option>
        <option value="high">Hoch</option>
      </select>
      <select name="completed" value={filterSort.completed || ''} onChange={handleChange} style={{ flex: 1 }}>
        <option value="">Alle Stati</option>
        <option value="true">Erledigt</option>
        <option value="false">Offen</option>
      </select>
      <div style={{ flex: 1 }}>
        <DatePicker
          selected={filterSort.dueDateBefore ? new Date(filterSort.dueDateBefore) : null}
          onChange={date => handleDateChange('dueDateBefore', date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="tt.mm.jjjj"
          locale="de"
          className="custom-datepicker"
          isClearable
        />
      </div>
      <div style={{ flex: 1 }}>
        <DatePicker
          selected={filterSort.dueDateAfter ? new Date(filterSort.dueDateAfter) : null}
          onChange={date => handleDateChange('dueDateAfter', date)}
          dateFormat="dd.MM.yyyy"
          placeholderText="tt.mm.jjjj"
          locale="de"
          className="custom-datepicker"
          isClearable
        />
      </div>
      <select name="sortBy" value={filterSort.sortBy || ''} onChange={handleChange} style={{ flex: 1 }}>
        <option value="">Sortierung</option>
        <option value="dueDate:asc">Fälligkeitsdatum ↑</option>
        <option value="dueDate:desc">Fälligkeitsdatum ↓</option>
        <option value="priority:asc">Priorität ↑</option>
        <option value="priority:desc">Priorität ↓</option>
        <option value="createdAt:desc">Neueste zuerst</option>
      </select>
    </div>
  );
};

export default NotesFilterSort; 