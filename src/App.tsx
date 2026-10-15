
import './App.css'

function App() {
  return (
    <main className="metadia">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Metadia kezdőlap">
          <span className="brand-mark">M</span>
          <span>METADIA</span>
        </a>
        <span className="status">
          <span className="status-dot" />
          Fejlesztői környezet
        </span>
      </header>

      <section className="welcome">
        <p className="eyebrow">HYPERTEXT · MULTIMEDIA · NARRATIVE</p>
        <h1>Metadia<span>.</span></h1>
        <p className="intro">
          Egy történetmotor újjáépítése.
          <br />
          Jelenetek, elágazások és összekapcsolódó médiatartalmak.
        </p>

        <div className="system-card">
          <div className="system-card-header">
            <span className="system-indicator" />
            <span>RENDSZERÁLLAPOT</span>
            <span className="version">v0.1.0</span>
          </div>

          <div className="system-row">
            <span>Felület</span>
            <span className="value">React + TypeScript</span>
          </div>
          <div className="system-row">
            <span>Fejlesztői szerver</span>
            <span className="value">Vite</span>
          </div>
          <div className="system-row">
            <span>Tartalomkezelés</span>
            <span className="pending">Integrációra vár</span>
          </div>
          <div className="system-row">
            <span>Történetmotor</span>
            <span className="pending">Fejlesztés előtt</span>
          </div>
        </div>

        <p className="footer-note">
          HELYREÁLLÍTÁS · ÚJ FEJLESZTÉSI ALAP
        </p>
      </section>
    </main>
  )
}

export default App
