# Uppgiftshanterare

En enkel fullstack-applikation för att hantera uppgifter, byggd med Express, React/TypeScript, TailwindCSS och PostgreSQL.

## Installation och Användning
Följ dessa steg för att köra applikationen lokalt:

1. Klona repot.
2. Installera beroenden för både backend och frontend:
   cd backend
   npm install
   cd ../frontend
   npm install

3. Skapa .env fil i backend mappen och lägg till databasanslutningssträngen där. PostgreSQL exempel: PGURI=postgres://username:password@localhost:5432/database-name

4. Starta backend och frontend för utveckling:
   cd backend
   npm run dev

5. Gå till http://localhost:3000 för att se applikationen

## Funktioner

	•	Skapa, visa, uppdatera och ta bort uppgifter.
	•	Responsiv design med TailwindCSS.
	•	API byggt med Express och databasinteraktion med PostgreSQL.
