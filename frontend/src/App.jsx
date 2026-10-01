import { useEffect, useState } from 'react';

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState('');

  async function checkHealth() {
    setError('');

    try {
      const response = await fetch('/api/health');
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      setHealth(await response.json());
    } catch (requestError) {
      setHealth(null);
      setError(requestError.message || 'Could not reach the API.');
    }
  }

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Task App home">
          <span className="mark" aria-hidden="true">M</span>
          <span>Task No 01</span>
        </a>
        <span className="environment"><span className="environment-dot" />LOCAL DEVELOPMENT</span>
      </header>

      <section className="content" aria-labelledby="page-title">
        <p className="eyebrow">WORKSPACE STATUS</p>
        <h1 id="page-title">Muhammad Taha<br />Barakah Tech labs.</h1>
        <p className="intro">This is my first task app, Generate a boilerplate for a simple task management application.</p>

        <div className="status-list" aria-live="polite">
          <StatusRow label="Frontend" value="Running" state="up" detail="Vite development server" />
          <StatusRow
            label="Backend API"
            value={health ? 'Connected' : error ? 'Unavailable' : 'Checking'}
            state={health ? 'up' : error ? 'down' : 'pending'}
            detail={error || 'Express · localhost:4000'}
          />
          <StatusRow
            label="MongoDB"
            value={health?.database ? health.database[0].toUpperCase() + health.database.slice(1) : 'Waiting'}
            state={health?.database === 'connected' ? 'up' : health?.database === 'connecting' ? 'pending' : 'idle'}
            detail="Mongoose connection"
          />
        </div>

        <button className="refresh-button" type="button" onClick={checkHealth}>
          <span aria-hidden="true">↻</span> Refresh status
        </button>
      </section>

      <footer className="footer">
        <span>DEVELOPMENT WORKSPACE</span>
        <span>API <code>/api/health</code></span>
      </footer>
    </main>
  );
}

function StatusRow({ label, value, state, detail }) {
  return (
    <div className="status-row">
      <span className={`status-indicator ${state}`} aria-hidden="true" />
      <div className="status-copy">
        <span className="status-label">{label}</span>
        <span className="status-detail">{detail}</span>
      </div>
      <span className={`status-value ${state}`}>{value}</span>
    </div>
  );
}