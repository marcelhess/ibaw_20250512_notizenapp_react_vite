import React, { useState, useRef } from 'react';
import AddNotesForm from '../components/notes/AddNotesForm';
import NotesFilterSort from '../components/notes/NotesFilterSort';
import NotesList from '../components/notes/NotesList';
import Alert from '../components/common/Alert';

const DashboardPage = () => {
  const [filterSort, setFilterSort] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [alert, setAlert] = useState(null);
  const filterSortRef = useRef(filterSort);

  // Immer aktuellen Filter/Sort-Status merken
  const handleSetFilterSort = (fs) => {
    filterSortRef.current = fs;
    setFilterSort(fs);
  };

  // Nach jedem Update die Liste mit aktuellen Parametern neu laden
  const handleRefresh = (message) => {
    setRefreshKey(k => k + 1);
    if (message) setAlert({ type: 'success', message });
  };

  return (
    <div className="main-content">
      <h2>Deine Notizen</h2>
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <AddNotesForm onAdd={() => handleRefresh('Notiz hinzugefügt!')} />
      <NotesFilterSort filterSort={filterSort} setFilterSort={handleSetFilterSort} />
      <NotesList filterSort={filterSort} key={refreshKey} onFeedback={handleRefresh} />
    </div>
  );
};

export default DashboardPage; 