# PROJEKT-PROMPT FÜR KI-CODING-ASSISTENT

Meine Rolle: Web Dev Anfänger

Anwendung: Notizen-App-Anwendung

Schlüsselwort: Notes

Ziel: Entwicklung einer voll funktionsfähigen MERN-Stack {Anwendung} mit Benutzerauthentifizierung, erweiterten Funktionen und Deployment auf Vercel.

Deine Rolle (KI-Agent): Top-Web-Entwickler mit umfassender Erfahrung. Bitte handle autonom, erstelle alle notwendigen Dateien, Strukturen und Konfigurationen. Implementiere die Features schrittweise und stelle sicher, dass jeder Teilbereich funktionsfähig ist.

## 1. PROJEKTÜBERSICHT

Du sollst eine anspruchsvolle {Anwendung} entwickeln. Benutzer sollen sich registrieren und anmelden können, um ihre persönlichen {Schlüsselwort} zu verwalten. {Schlüsselwort} sollen erstellt, angesehen, als erledigt markiert, bearbeitet (inkl. Priorität, Fälligkeitsdatum) und gelöscht werden können. Die Anwendung soll Filtern und Sortieren von {Schlüsselwort} ermöglichen. Die Anwendung soll eine klare Trennung zwischen Frontend und Backend aufweisen und modernen Entwicklungspraktiken folgen, inklusive Tests und grundlegender Performance-Optimierungen.

## 2. TECHNOLOGIE-STACK

- **Datenbank**: MongoDB (mit MongoDB Atlas für das Cloud-Hosting)
- **Backend**: Node.js mit Express.js Framework
- **Frontend**: React (mit Vite als Build-Tool und Development-Server)
- **MongoDB ODM**: Mongoose
- **Authentifizierung**: JWT (JSON Web Tokens)
- **Passwort-Hashing**: bcrypt.js
- **Validierung** (optional, aber empfohlen): express-validator (Backend), Yup oder Zod (Frontend)
- **Testing**: 
  - Backend: Jest, Supertest
  - Frontend: Jest, React Testing Library
- **Deployment**: Vercel (sowohl für Frontend als auch für Backend-API als Serverless Functions)
- **Sprache**: JavaScript (ES6+ Syntax)
- **Paketmanager**: npm

## 3. DETAILLIERTE ANFORDERUNGEN

### 3.1. Projektstruktur (Monorepo-Ansatz für Vercel empfohlen)

Erstelle eine Hauptverzeichnisstruktur, die sowohl das Backend als auch das Frontend enthält.

```
/meine-mern-app
  /backend             // Backend (Node.js/Express)
    package.json
    server.js          // als Haupteinstiegspunkt
    /config
      db.js            // MongoDB Verbindung
      passport.js      // (Optional, wenn Passport.js für JWT-Strategie genutzt wird)
    /models
      User.js          // Mongoose Schema für Benutzer
      Notes.js          // Mongoose Schema für Notes
    /routes
      auth.js          // API Routen für Authentifizierung (Registrierung, Login)
      notes.js         // API Routen für Notes (geschützt)
    /controllers
      authController.js
      notesController.js
    /middleware
      authMiddleware.js // JWT Verifizierung
      errorHandler.js  // Globale Fehlerbehandlung
    vercel.json        // Konfiguration für Vercel (Backend)
    .env.example       // Vorlage für Umgebungsvariablen
    .gitignore
    /tests             // Backend Tests
      /integration
      /unit

  /frontend            // Frontend (React/Vite)
    package.json
    vite.config.js
    index.html
    /src
      main.jsx
      App.jsx
      /components
        /auth
          RegisterForm.jsx
          LoginForm.jsx
        /notes
          NotesList.jsx
          NotesItem.jsx
          AddNotesForm.jsx
          EditNotesModal.jsx
          NotesFilterSort.jsx // Komponente für Filter/Sortier-Optionen
        /common
          Navbar.jsx
          Spinner.jsx
          Alert.jsx
      /pages             // Seiten-Komponenten (Views)
        HomePage.jsx
        LoginPage.jsx
        RegisterPage.jsx
        DashboardPage.jsx // Hauptseite nach Login mit Notes-Verwaltung
      /router
        AppRouter.jsx    // React Router Konfiguration
        ProtectedRoute.jsx // HOC für geschützte Routen
      /services
        authService.js   // API-Aufrufe für Authentifizierung
        notesService.js   // API-Aufrufe für Notes
      /hooks             // Custom Hooks (z.B. useAuth)
      /contexts          // React Context (z.B. AuthContext)
      /utils             // Hilfsfunktionen
      /assets
      App.css            // Oder eine andere Methode für Styling
    .gitignore
    /tests             // Frontend Tests
      /components
      /pages

  package.json         // Root package.json für gemeinsame Skripte
  .gitignore           // Global .gitignore
  README.md
```

### 3.2. Backend (/backend Verzeichnis)

**Server Setup (server.js):**
- Wie im vorherigen Prompt, zusätzlich:
- Integriere Auth-Routen.

**Datenmodelle:**
- **/models/User.js:**
  - username: String, Erforderlich, Eindeutig, Trim
  - email: String, Erforderlich, Eindeutig, Trim, Lowercase, Validierung (E-Mail-Format)
  - password: String, Erforderlich (wird gehasht gespeichert)
  - createdAt, updatedAt (Timestamps)
  - Mongoose Pre-Save Hook zum Hashen des Passworts mit bcrypt.js.
  - Methode zum Vergleichen von Passwörtern.

- **/models/Notes.js:**
  - user: ObjectId, Ref: 'User', Erforderlich (Zuordnung zum Benutzer)
  - title: String, Erforderlich, Trim
  - description: String, Optional, Trim
  - completed: Boolean, Standard: false
  - priority: String, Enum: ['low', 'medium', 'high'], Standard: 'medium'
  - dueDate: Date, Optional
  - createdAt, updatedAt (Timestamps)

**Authentifizierung (/routes/auth.js, /controllers/authController.js):**
- **POST /api/v1/auth/register**: Registriert einen neuen Benutzer.
  - Input: { username, email, password }
  - Validierung: Eingaben prüfen, E-Mail-Format, Passwortstärke (optional).
  - Prüfen, ob Benutzer/E-Mail bereits existiert.
  - Passwort hashen.
  - Benutzer speichern.
  - Output: JWT und Benutzerinformationen (ohne Passwort).

- **POST /api/v1/auth/login**: Loggt einen Benutzer ein.
  - Input: { email, password }
  - Benutzer finden, Passwort vergleichen.
  - Output: JWT und Benutzerinformationen (ohne Passwort).

**Task API Endpunkte (/routes/notes.js, /controllers/notesController.js):**
- Alle Notes-Routen sind durch die authMiddleware.js geschützt (JWT-Verifizierung).
- CRUD-Operationen beziehen sich immer auf den angemeldeten Benutzer (Notes werden über userId gefiltert/zugeordnet).
- **POST /api/v1/notes**: Erstellt eine neue Notiz (inkl. priority, dueDate).
- **GET /api/v1/notes**: Ruft alle Notes des angemeldeten Benutzers ab.
  - Ermögliche Query-Parameter für:
    - Sortierung (z.B. ?sortBy=dueDate:asc, ?sortBy=priority:desc, ?sortBy=createdAt:desc)
    - Filterung (z.B. ?completed=true, ?priority=high, ?dueDateBefore=YYYY-MM-DD, ?dueDateAfter=YYYY-MM-DD)
- **GET /api/v1/notes/:id**: Ruft eine einzelne Notiz ab (stellt sicher, dass sie dem angemeldeten Benutzer gehört).
- **PUT /api/v1/notes/:id**: Aktualisiert eine Notiz (stellt sicher, dass sie dem angemeldeten Benutzer gehört).
- **DELETE /api/v1/notes/:id**: Löscht eine Notiz (stellt sicher, dass sie dem angemeldeten Benutzer gehört).

**Middleware (/middleware):**
- **authMiddleware.js**: Verifiziert JWTs aus dem Authorization-Header (Bearer TOKEN). Fügt Benutzerinformationen zum req-Objekt hinzu.
- **errorHandler.js**: Globale Fehlerbehandlung.

**Umgebungsvariablen (.env.example):**
- MONGODB_URI_PLACEHOLDER
- PORT (z.B. 5001)
- JWT_SECRET (ein langer, zufälliger String)
- JWT_EXPIRES_IN (z.B. 1h, 7d)
- FRONTEND_URL

**vercel.json (im /backend Verzeichnis):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js", // Haupteinstiegspunkt
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/v1/(.*)", // Alle Anfragen an /api/v1/...
      "dest": "server.js"    // werden von server.js behandelt
    }
  ]
}
```

### 3.3. Frontend (/frontend Verzeichnis)

**Routing (/router/AppRouter.jsx, /router/ProtectedRoute.jsx):**
- Verwende react-router-dom.
- Öffentliche Routen: /, /login, /register.
- Geschützte Routen (erfordern Login, verwende ProtectedRoute.jsx): /dashboard (Notes-Verwaltung).

**State Management:**
- Verwende React Context API (z.B. AuthContext) für globalen Auth-Status (Benutzer, Token, Ladezustand).
- Für lokalen Komponenten-State useState, useEffect.

**Komponenten:**
- **Auth-Komponenten (/components/auth)**: RegisterForm.jsx, LoginForm.jsx.
- **Notes-Komponenten (/components/notes):**
  - NotesFilterSort.jsx: UI-Elemente zum Auswählen von Filter- und Sortieroptionen.
  - AddNotesForm.jsx, EditNotesModal.jsx: Felder für title, description, priority, dueDate.
  - NotesList.jsx: Verarbeitet Filter/Sortier-Parameter und übergibt sie an notesService.
- **Common-Komponenten (/components/common)**: Navbar.jsx (zeigt Login/Register oder Logout/Dashboard Links), Spinner.jsx, Alert.jsx (für Feedback).

**Seiten (/pages):**
- HomePage.jsx: Einfache Landing Page.
- LoginPage.jsx, RegisterPage.jsx: Enthalten die jeweiligen Formular-Komponenten.
- DashboardPage.jsx: Hauptansicht nach dem Login, enthält NotesFilterSort, AddNotesForm und NotesList.

**Services (/services):**
- **authService.js**: Funktionen für /register, /login. Speichert JWT im localStorage und setzt Authorization Header für zukünftige Anfragen. Implementiert Logout (entfernt JWT).
- **notesService.js**: CRUD-Funktionen für Notes, sendet JWT im Header. Berücksichtigt Filter/Sortier-Parameter.

**Styling & UI/UX (App.css, Komponenten-spezifisches CSS oder CSS-in-JS):**
- **Design-Richtlinien:**
  - Modernes, minimalistisches Design.
  - Grid mit 6 Spalten, in jeder Spalte 1 Kachel anzeigen.
  - Kacheln haben abgerundete Ecken und einen leichten Schatten.
  - Intuitive Bedienung, klare Handlungsaufforderungen (CTAs).
  - Konsistente Farbpalette (z.B. eine Primärfarbe, Akzentfarbe, neutrale Töne) und Typografie (gut lesbare Sans-Serif Schriftart wie Inter, Open Sans, Roboto).
  - Vollständig responsives Design (Mobile-First-Ansatz bevorzugt).
  - Visuelles Feedback: Ladeindikatoren während API-Aufrufen, Erfolgs-/Fehlermeldungen (z.B. mit Alert.jsx).
  - Barrierefreiheit (grundlegend): Semantisches HTML, aria-labels wo nötig, Tastaturnavigation sollte möglich sein.
  - Button «Notiz bearbeiten» mit grünem Hintergrund und weisser Schrift.
  - Button «Notiz löschen» mit rotem Hintergrund und weisser Schrift.

**Umgebungsvariablen (Frontend):** .env im /frontend Verzeichnis.
- VITE_API_BASE_URL=/api/v1 (für Produktion auf Vercel)
- Lokal: VITE_API_BASE_URL=http://localhost:5001/api/v1 (wenn Backend auf Port 5001 läuft).

**Performanz-Optimierungen:**
- Implementiere Route-basiertes Code-Splitting mit React.lazy() und <Suspense> für die Seiten-Komponenten (/pages).
- Für lange Notes-Listen: Ziehe Pagination oder eine Virtualized List (z.B. mit react-window, falls die Liste extrem lang werden kann – initial nicht zwingend) in Betracht. Für den Anfang reicht eine einfache Liste.
- Nutze React.memo für Komponenten, die bei gleichen Props nicht neu rendern müssen (z.B. NotesItem).

### 3.4. Testumgebung

**Backend (/backend/tests):**
- Richte Jest und Supertest ein.
- Schreibe Unit-Tests für Controller-Logik (z.B. Validierungsfunktionen, Datenmanipulation).
- Schreibe Integration-Tests für API-Endpunkte (Auth und Notes): Registrierung, Login, CRUD für Notes, Testen von Schutzmechanismen.
- Konfiguriere Skripte in backend/package.json (z.B. npm test).
- Verwende eine separate Test-Datenbank oder stelle sicher, dass die Datenbank vor/nach Tests bereinigt wird.

**Frontend (/frontend/tests):**
- Richte Jest und React Testing Library ein.
- Schreibe Unit-Tests für einzelne Komponenten (z.B. Formulare, NotesItem) und deren Verhalten.
- Teste die Logik in Custom Hooks oder Services.
- Konfiguriere Skripte in frontend/package.json (z.B. npm test).

**E2E-Tests** (Optional für den Start, aber als Konzept erwähnen):
- Kurzer Hinweis im README, dass für vollständige End-to-End-Tests Tools wie Cypress oder Playwright verwendet werden könnten.

### 3.5. Deployment auf Vercel

**Root vercel.json** (optional, aber gut für Monorepo-Einstellungen):
```json
// Root /vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js", // Einstiegspunkt Backend
      "use": "@vercel/node",
      "config": { "includeFiles": ["backend/config/**", "backend/models/**", "backend/middleware/**"] } // Sicherstellen, dass alle nötigen Backend-Dateien dabei sind
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "frontend/dist" }
    }
  ],
  "routes": [
    {
      "src": "/api/v1/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/index.html"
    }
  ]
}
```

Hinweis: Alternativ kann Vercel oft automatisch Vite-Projekte (frontend) und Node.js-Serverless-Funktionen (backend/api oder hier backend mit entsprechender vercel.json im backend-Ordner) erkennen. Die explizite Root vercel.json gibt mehr Kontrolle, erfordert aber genaue Pfadangaben.

**Umgebungsvariablen auf Vercel:** MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN. NODE_ENV wird auf production gesetzt.

**Build-Befehle:**
- Frontend: npm run build im /frontend Verzeichnis.
- Backend: Vercel handhabt dies mit @vercel/node.

### 3.6. Allgemeine Anforderungen & Best Practices

Wie im vorherigen Prompt (Git, Code-Qualität, Fehlerbehandlung, Sicherheit).

**README.md:** Erweitere die README um:
- Beschreibung der Authentifizierungs-Flows.
- Anleitung zur Testausführung.
- Liste der Umgebungsvariablen und ihre Bedeutung.
- Hinweise zu den erweiterten Notes-Funktionen.

**Paket-Skripte:**
- backend/package.json: start, dev, test.
- frontend/package.json: dev, build, preview, test.
- root/package.json: Skripte zum gleichzeitigen Starten (z.B. mit concurrently), Bauen oder Testen beider Teile.

### 3.7. Offline-Funktionalität (Grundlegend – Bonus)

Wenn Zeit und Komplexität es erlauben:
- **Frontend:** Implementiere einen Service Worker, um die gebaute Anwendung (HTML, CSS, JS) zu cachen, sodass die App-Shell offline geladen werden kann.
- **Datencaching:** Bereits geladene Notes könnten im localStorage oder sessionStorage zwischengespeichert werden, um sie offline anzuzeigen (nur Lesezugriff). Eine Synchronisation ist für diesen Prompt zu komplex.

Dies ist ein fortgeschrittenes Feature; eine solide Implementierung der obigen Punkte hat Vorrang.

## 4. STRUKTUR UND SCHRITTE FÜR DEN AI-AGENTEN

Bitte gehe methodisch vor und implementiere die Features idealerweise in dieser Reihenfolge:

1. **Projektinitialisierung:** Wie zuvor, aber mit den neuen Ordnernamen (backend, frontend).

2. **Backend-Basis & Authentifizierung (/backend):**
   - User-Modell, Auth-Routen/Controller (Register, Login), JWT-Logik, authMiddleware.
   - Grundlegende Tests für Auth.

3. **Backend-Task-CRUD (/backend):**
   - Notes-Modell (mit userId, priority, dueDate).
   - Geschützte Notes-Routen/Controller.
   - Filter- und Sortierlogik im GET /notes Endpunkt.
   - Tests für Notes-CRUD.

4. **Frontend-Basis & Authentifizierung (/frontend):**
   - Routing-Setup, AuthContext.
   - Login/Register Seiten und Formulare, authService.
   - ProtectedRoute und Navbar-Logik.

5. **Frontend-Task-Management (/frontend):**
   - DashboardPage, Notes-Komponenten (Formulare, Liste, Item).
   - notesService Anbindung.
   - Implementierung von Filter- und Sortier-UI und -Logik.

6. **Styling & UI/UX-Verbesserungen (/frontend):**
   - Anwendung der Design-Richtlinien.

7. **Testing (/backend, /frontend):**
   - Vervollständige Unit- und Integrationstests.

8. **Performance-Optimierungen (/frontend):**
   - Implementiere Lazy Loading für Routen.

9. **Deployment-Vorbereitung & Dokumentation:**
   - Finalisiere vercel.json, .env.example Dateien.
   - Schreibe/Erweitere die README.md.

10. **(Optional) Grundlegende Offline-Funktionalität (/frontend):**
    - Service Worker für App-Shell-Caching.

## 5. WICHTIGE HINWEISE FÜR DEN AI-AGENTEN

Die zusätzlichen Features (Authentifizierung, erweiterte Notes-Funktionen, Tests, etc.) erhöhen die Komplexität erheblich. Es ist in Ordnung, wenn du die Implementierung in klare, nachvollziehbare Schritte unterteilst oder bei sehr komplexen Teilen (wie vollständiger Offline-Synchronisation, die hier nicht gefordert ist) um spezifischere Anweisungen bittest.

Priorisiere eine funktionierende Kernanwendung mit Authentifizierung und CRUD für Notes. Erweiterte Funktionen und Optimierungen können darauf aufbauen.

Verwende für alle Geheimnisse (MongoDB URI, JWT Secret) klare Platzhalter.

Gehe davon aus, dass ich MongoDB Atlas selbstständig einrichte und die Connection Strings bereitstelle.

Fokussiere auf sauberen, wartbaren und gut dokumentierten Code.

Implementiere das Projekt autonom und soweit möglich ohne Rückfragen an mich.