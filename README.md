# Notes MERN App

Eine voll funktionsfähige MERN-Stack Notizen-App mit Authentifizierung, Filter-/Sortierfunktionen und Deployment auf Vercel.

## Monorepo-Struktur

- /backend: Node.js/Express API
- /frontend: React/Vite Frontend

## Setup & Entwicklung

1. **Repository klonen**
2. **Abhängigkeiten installieren**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Umgebungsvariablen anlegen**
   - Siehe `/backend/.env.example` und `/frontend/.env.example`
   - Backend: MongoDB-URI, JWT-Secret, Port, Frontend-URL
   - Frontend: VITE_API_BASE_URL (z.B. `/api/v1` für Vercel, lokal `http://localhost:5001/api/v1`)
4. **Entwicklung starten**
   - Backend: `npm run dev` im `/backend`
   - Frontend: `npm run dev` im `/frontend`

## Authentifizierungs-Flow

- Registrierung: POST `/api/v1/auth/register` (username, email, password)
- Login: POST `/api/v1/auth/login` (email, password)
- JWT wird im LocalStorage gespeichert und für alle Notes-Requests im Header gesendet
- Logout entfernt das Token

## Notes-Funktionen

- Notiz anlegen, bearbeiten, löschen, als erledigt markieren
- Priorität (low, medium, high), Fälligkeitsdatum
- Filter & Sortierung (Status, Priorität, Fälligkeitsdatum, Erstellungsdatum)
- Nur eigene Notizen sichtbar

## Tests

- **Backend:**
  - Unit- und Integrationstests mit Jest & Supertest (`/backend/tests`)
  - Testdatenbank empfohlen
- **Frontend:**
  - Komponenten- und Logiktests mit Jest & React Testing Library (`/frontend/tests`)
- **E2E-Tests (optional):**
  - Cypress oder Playwright empfohlen

## Deployment auf Vercel

- Monorepo mit Root-`vercel.json`
- Umgebungsvariablen in Vercel-Projekt setzen (siehe `.env.example`)
- Frontend wird als statisches Vite-Build, Backend als Serverless-API deployed

## Erweiterte Funktionen

- Responsives, modernes UI
- Alerts & Ladeindikatoren
- Grundlegende Barrierefreiheit
- (Optional) Offline-Funktionalität: Service Worker & LocalStorage

## Offline-Funktionalität (PWA)

- Die App unterstützt App-Shell-Caching via Service Worker (vite-plugin-pwa)
- Nach dem ersten Laden ist die Oberfläche offline verfügbar (CRUD nur online)
- Zum Aktivieren: `npm install vite-plugin-pwa` im `/frontend` und neu bauen

---

Fragen? Siehe Quellcode & Kommentare oder erstelle ein Issue. 