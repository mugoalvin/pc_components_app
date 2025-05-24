# PC Components API

This API serves as the backend for the PC Components App. It acts as a bridge between the frontend and the scraper service, handling HTTP requests from the frontend, triggering scraping tasks, and managing database connections for PC hardware data.

## Features

- Exposes endpoints to trigger scraping of various PC component data (CPUs, GPUs, etc.)
- Forwards requests to a dedicated scraper service
- Handles database connection management
- Provides a clean interface for frontend applications

## Project Structure

```
src/
  index.ts            # API entry point
  routes/
    root.ts           # General routes (e.g., database connect/disconnect)
    scrape.ts         # Scraping-related routes
.env                  # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure environment variables as needed.

### Running the API

```bash
npm run dev
```

The API will start on the port specified in your `.env` file (e.g., `API_PORT=3000`).

## API Endpoints

### Root

- `POST /connect`  
  Connects to the database.

### Scraping

- `POST /scrape/ark`  
  Triggers scraping of Intel Ark data.

- `POST /scrape/core`  
  Triggers scraping of Intel Core data.

- `POST /scrape/ultra`  
  Triggers scraping of Intel Ultra data.

- `POST /scrape/ryzen`  
  Triggers scraping of AMD Ryzen data.

- `POST /scrape/radeon`  
  Triggers scraping of AMD Radeon data.

## Environment Variables

- `API_PORT` - Port for the API server
- `SERVER_DOMAIN` - URL of the scraper service

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](../LICENSE)