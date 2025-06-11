# PC Components App — Mobile

A cross-platform mobile application for browsing, searching, and viewing up-to-date PC hardware data (CPUs, GPUs, etc.) sourced from AMD, Intel and Nvidia. Built with [Expo](https://expo.dev/), [React Native](https://reactnative.dev/), and TypeScript.



## Features

- Browse and search PC components (CPUs, GPUs, etc.)
- View detailed specifications for each component
- Responsive UI with custom themes and fonts
- State management with Zustand
- Tailwind CSS utility classes via NativeWind
- Seamless integration with the backend API



## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)



## Installation

1. **Install project:**
   ```bash
   git clone https://github.com/mugoalvin/pc_components_app/tree/main/mobile
   ```

2. **Install dependencies:**
   ```bash
   cd mobile
   &&
   npm install
   ```

3. **Set up enviromnent variables**
- Edit or create `app-env.d.ts` as needed for your environment.

4. **Start the development server**
   ```bash
   npx expo start
   ```
5. **Run on your device or emulator**
- Scan the QR code wit the Expo Go app
- Press `a` (Android) or `i`(IOS) in the terminal t llaunch the emulator.


### Configuration
- **API Intergration:**
   The app communicates with the backend API defined in the `/mobile/app/services` directory.
   Update API URLs and endpoints in your environment files or context as needed.

- **Theming & Fonts:**
Custom fonts and themes are configured in `global.css` and via NativeWind/Tailwind.

### Scripts
- `npm start` — Start Expo development server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device (macOS only)
- `npm run lint` — Lint the codebase

### Dependencies
- `React Native` — Cross-platform mobile framework
- `Expo` — Streamlined React Native development
- `NativeWind` — Tailwind CSS for React Native
- `Zustand` — State management
- `TypeScript` — Type safety
- `Other:` See package.json for the full list

### Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

### License
This project is licensed under the MIT License.