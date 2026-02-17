import React, { useState } from 'react';
import CheckInForm from './components/CheckInForm';
import MatchingResult from './components/MatchingResult';
import Dashboard from './components/Dashboard';
import { saveGuest } from './utils/storage';
import { ROOM_INVENTORY } from './utils/airbnbData';

function App() {
  const [view, setView] = useState('dashboard'); // dashboard, checkin, result
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = (data) => {
    // 1. Logic to find room based on missing element
    // Reuse logic or move to util. For now, inline simple logic to save to DB with room info.
    let minCount = Infinity;
    let lackingElement = null;
    Object.entries(data.elements).forEach(([el, count]) => {
      if (count < minCount) {
        minCount = count;
        lackingElement = el;
      }
    });
    const matchedRoom = ROOM_INVENTORY.find(room => room.element === lackingElement);

    // 2. Save result
    const savedData = {
      ...data,
      room: matchedRoom,
      lackingElement
    };
    saveGuest(savedData);

    setAnalysisResult(data); // We pass raw analysis data to Result component, it re-derives/shows info
    setView('result');
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid #333', marginBottom: '30px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-gold)', cursor: 'pointer' }}
            onClick={() => setView('dashboard')}
          >
            DESTINY STAY
          </div>
          <nav>
            <button
              style={{ background: 'transparent', color: view === 'dashboard' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </button>
            <button
              style={{ background: 'transparent', color: view === 'checkin' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
              onClick={() => setView('checkin')}
            >
              Check-In
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {view === 'dashboard' && (
          <Dashboard onNewCheckIn={() => setView('checkin')} />
        )}

        {view === 'checkin' && (
          <CheckInForm onAnalyze={handleAnalyze} />
        )}

        {view === 'result' && analysisResult && (
          <MatchingResult
            analysisData={analysisResult}
            onReset={() => {
              setAnalysisResult(null);
              setView('checkin'); // or dashboard
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
