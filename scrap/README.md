# PC Component Scraper

## Overview
The **PC Component Scraper** is a Node.js-based web scraping application designed to extract detailed specifications of AMD and Intel processors and graphics cards. The application uses Puppeteer for web scraping, TypeORM for database interactions, and TypeScript for type safety and maintainability.

The project is structured to scrape data from AMD and Intel websites, normalize the data, validate it, and store it in a MySQL database. The scraper supports both CPU and GPU data extraction and is designed to be extensible for additional hardware components.


## Features
- **Web Scraping**: Extracts detailed specifications of AMD Ryzen processors, Radeon GPUs, and Intel Core processors (Core ix and Core Ultra series).
- **Data Normalization**: Cleans and formats scraped data for consistency.
- **Validation**: Ensures the integrity of the data before saving it to the database.
- **Database Integration**: Stores the processed data in a MySQL database using TypeORM.
- **Extensibility**: Modular design allows for easy addition of new hardware components or manufacturers.


## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **TypeScript** (v5 or higher)
- **Puppeteer** (installed as part of the project dependencies)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd scrap
2. Install dependencies:
	```
	npm install
3. Configure the environment variables:
	- Create a `.env` file in the root directory.
	- Add the following variables (adjust values as needed):
	```js
	...
	# Database
	HOST=localhost
	PORT=3306
	USERNAME=<your-username>
	PASSWORD=<your-password>
	DATABASE_NAME=pc_components
	NODE_ENV=development
	```
4. Initialize the database
	- Ensure your MySQL server is running.
	- The database schema will be automatically synchronized when the application starts in development mode.

## Usage
1. Runnig the scraper.
```bash 
npm run dev
```
2. The scraper will:
	- Initialize the database connection.
	- Scrape data from AMD and Intel websites.
	- Normalize and validate the data.
	- Save the data to the MySQL database.

Available Scripts
- **npm run dev**: Runs the scraper in the development mode using `ts-node`.
- **npm test**: Placeholder for running tests (not implemented)

## Project Structure
The project is organized as follows:
```
src/
├── db.ts                     # Database initialization and configuration
├── entities/                 # TypeORM entities for database tables
├── global_functions/         # Shared utility functions and types
├── saveRecords/              # Functions to save data to the database
├── scrapers/                 # Web scraping logic
│   ├── amd/                  # AMD-specific scraping logic
│   ├── intel/                # Intel-specific scraping logic
├── index.ts                  # Entry point for the application
```

## Key Modules
### Scrapers
- **AMD Scrapers:**
	- `amd_ryzen_scraper.ts`: Scrapes AMD Ryzen processor data.
	- `amd_radeon_scraper.ts`: Scrapes AMD Radeon GPU data.
- **Intel Scrapers:**
	- `intel_core_scraper.ts:` Scrapes Intel Core ix and Core Ultra processor data.

## Database
	
- **Entities**
	- **AmdRyzen**: Represents AMD Ryzen processors.
	- **AmdRadeon**: Represents AMD Radeon GPUs.
	- **IntelCoreIx**: Represents Intel Core ix processors.
	- **IntelUltra**: Represents Intel Core Ultra processors.

- **Save Functions:**
	- **saveRyzenProcessors**: Saves Ryzen data to the database.
	- **saveRadeonCards**: Saves Radeon GPU data to the database.
	- **saveIntelCoreIxProcessors:** Saves Intel Core ix data to the database.
	- **saveIntelUltraProcessors:** Saves Intel Core Ultra data to the database.


## Environment Variables
The `.env` file contains configuration for:

- **Web scraping:** URLs for AMD and Intel product pages.
- **Database:** MySQL connection details.

## Dependencies
- **Puppeteer:** For headless browser automation.
- **TypeORM:** For database interactions.
- **dotenv:** For environment variable management.
- **MySQL:** Database driver for TypeORM.

## Troubleshooting
- **Database Connection Issues:**
Ensure the MySQL server is running and the credentials in `.env` are correct.
- **Scraping Errors:**
	- Verify that the target URLs in `.env` are accessible and up-to-date.
	- Check for changes in the website structure that may require updates to the scraper logic.
## Future Enhancements
- Add support for additional hardware manufacturers (e.g., NVIDIA).
- Implement unit tests for validation and normalization functions.
- Add a web interface for viewing and managing scraped data.
- Optimize scraping performance for large datasets.
## License
This project is licensed under the MIT License.

## Acknowledgments
- **Puppeteer** for enabling efficient web scraping.
- **TypeORM** for simplifying database interactions.
- **AMD** and **Intel** for providing detailed product specifications on their websites.