Ticketing Tool — Fullstack Project (Next.js + Strapi)
Application full‑stack permettant de gérer des tickets (comme GitHub Issues) avec authentification, dashboard, profil, filtres avancés et intégration d’un CMS Strapi.

Objectifs du projet : 
1- Créer un système d’authentification complet (Login + Register)
2- Protéger les routes via un middleware Proxy
3- Construire un dashboard dynamique
4- Créer une page Tickets en SSR
5- Utiliser Strapi comme CMS
6- Utiliser des Server Actions pour Login/Register

Aucune logique côté client (pas de useEffect) → tout passe par API / Server Actions

Stack technique
Frontend : Next.js 14 (App Router), TypeScript, Server Actions, SSR / CSR mix, Middleware Proxy,UI Components (Input, Button, TitlePage, TicketCard…), Graph library (pour dashboard)
Backend : Strapi (Node.js), MongoDB ou SQLite selon config, Auth, JWT (généré par Strapi), Stockage du token en cookies HTTPOnly

Installation
1. Cloner le projet
bash
git clone <url-du-repo>
cd frontend
2. Installer les dépendances
bash
npm install
3. Créer un fichier .env
Utilise le modèle suivant :

Code
NEXT_PUBLIC_API_URL=http://localhost:1337
JWT_SECRET=yoursecret
Ne jamais push ton vrai .env  
Ajoute un .env.example (déjà présent dans ton projet).

4. Lancer le frontend
bash
npm run dev
5. Lancer Strapi (backend)
bash
cd backend
npm run develop


Authentification (Server Actions)
Login
La Server Action appelle /auth/local du backend Strapi

Si succès → récupère le JWT, le stocke dans les cookies

Redirection vers /auth/dashboard

Si erreur → renvoie un state affiché dans le formulaire

 Register
Même logique que Login

Retourne un token ou une erreur

Proxy Middleware
Si pas de token → redirection automatique vers /auth/login

Si token présent → vérification via /users/me

Si token invalide → suppression cookie + redirection login

Structure des pages
/auth/login
Formulaire Login

Input + Button

Server Action loginAction()

Affichage des erreurs

/auth/register
Formulaire Register

Server Action registerAction()

Redirection si succès

/auth/dashboard
Page protégée

Composants :
Header
Sidebar
Graphiques
TicketCard

Formulaire création ticket

/auth/profile
Page profil (C.R.S : Create / Read / Save)

Modifier email, username, avatar…

/auth/tickets (SSR)
Liste des tickets (comme GitHub Issues)

Champs : titre, description, statut, label

Filtres :
par label
par statu
par titre

Composants :
TitlePage
Input
Button
TicketCard
Header
Sidebar
Graph

Communication Front → Backend
Aucune logique client
Pas de useEffect

Pas de fetch côté client

Tout passe par :
Server Actions

Middleware Proxy

API Routes Next.js (si besoin)



Tickets (SSR) 
Rendu côté serveur :
Récupération des tickets via Strapi

Filtrage côté serveur

Affichage instantané sans flash