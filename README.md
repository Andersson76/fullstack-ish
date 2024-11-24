# Uppgiftshanterare

En enkel fullstack-applikation för att hantera uppgifter, byggd med Express, React/TypeScript, TailwindCSS och PostgreSQL.

## Installation och Användning

1. Klona repot.
2. Installera beroenden för både backend och frontend:
   cd backend / npm install
   cd frontend / npm install

3. Skapa .env fil i backend mappen, skapa en databasanslutningssträng där. PostgreSQL exempel: PGURI=postgres://username:password@localhost:5432/database-name

4. Starta backend och frontend för utveckling:
   cd backend
   npm run build-frontend
   node index.js

5. Gå till http://localhost:3000 för att se applikationen
