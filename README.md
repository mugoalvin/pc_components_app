# PC Components App

A modular application for scraping, storing, and serving up-to-date PC hardware data (CPUs, GPUs, etc.) from AMD and Intel.  
The project is split into two main services:

- **API**: Acts as the backend for frontend clients, exposing endpoints to trigger scraping tasks and fetch data.
- **Scraper**: Handles the actual web scraping and database population for PC component data.


## Overview

This project enables users and developers to access structured, current information about PC components by automating the scraping of official manufacturer websites and storing the results in a MySQL database.  
The API service acts as a bridge between the frontend and the scraper, forwarding requests and managing database connections.



## Project Structure

```
pc_components_app/
├── api/        # Backend API service (Node.js + Express + TypeScript)
├── scrap/      # Scraper service (Node.js + Puppeteer + TypeORM)
├── types/      # Defines all TypeScript types and interfaces required in the project.
├── README.md   # This readme file.
├──tsconfig.base.json
```



## Services

### 1. API Service (`api/`)

- **Purpose:** Receives HTTP requests from the frontend, triggers scraping tasks, and manages database connections.
- **Endpoints:**  
  - `/connect` — Connect to the database
  - `/disconnect` — Dosconnects from the database
  - `/scrape/ark` — Scrape Intel Ark Graphics data
  - `/scrape/core` — Scrape Intel Core data
  - `/scrape/ultra` — Scrape Intel Ultra data
  - `/scrape/ryzen` — Scrape AMD Ryzen data
  - `/scrape/radeon` — Scrape AMD Radeon Graphics data
- **Tech:** Node.js, Express, TypeScript

See [`api/README.md`](api/README.md) for details.



### 2. Scraper Service (`scrap/`)

- **Purpose:** Scrapes data from AMD and Intel product pages, normalizes and validates it, and saves it to a MySQL database.
- **Key Modules:**  
  - AMD Scrapers: Ryzen CPUs, Radeon GPUs  
  - Intel Scrapers: Core ix, Core Ultra, Ark  
  - Database entities and save functions
- **Tech:** Node.js, Puppeteer, TypeORM, MySQL, TypeScript

See [`scrap/README.md`](scrap/README.md) for details.



## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MySQL (v8+)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mugoalvin/pc_components_app.git
   cd pc_components_app
   ```

2. **Install dependencies for both services:**
   ```bash
   cd api && npm install
   cd ../scrap && npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in both `api/` and `scrap/` directories.
   - Edit the `.env` files to match your setup (ports, database credentials, scraper URLs, etc.).

4. **Initialize the database:**
   - Ensure your MySQL server is running.
   - The scraper will auto-sync the schema on first run.



## Running the Services

**Start the scraper service:**
```bash
cd scrap
npm run dev
```

**Start the API service:**
```bash
cd ../api
npm run dev
```

The API will listen on the port specified in `api/.env` (e.g., `API_PORT=3000`).  
The scraper will listen on its own port (e.g., `4000`).



## Usage Flow

1. **Frontend** sends a request to the **API** (e.g., to trigger a scrape).
2. **API** forwards the request to the **scraper** service.
3. **Scraper** fetches, processes, and stores the data in the database.
4. **API** can serve the stored data to the frontend or other clients.



## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.


## License

This project is licensed under the MIT License.

