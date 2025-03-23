# Medicine Tracker App 💊

A React Native application built with Expo to help users track their medications, set reminders, and maintain their medical schedule.

## Features

- 📱 User Authentication
- 💊 Add/Edit Medications
- ⏰ Set Medication Reminders
- 📅 Track Medication History
- 📊 View Daily Schedule
- 🔔 Push Notifications

## Tech Stack

- React Native
- Expo
- Firebase Authentication
- Firebase Firestore
- Expo Router
- AsyncStorage

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Freakcodes/TrackMyMeds.git
cd TrackMyMeds
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase config to `config/FirebaseConfig.js`

4. Start the development server
```bash
npx expo start
```

## Project Structure

```
medicine-Tracker/
├── app/
│   ├── (tabs)/
│   │   └── index.jsx
│   ├── login/
│   │   ├── signin.jsx
│   │   └── signup.jsx
│   └── add-new-medication/
│       └── index.jsx
├── components/
├── config/
├── constant/
├── service/
└── assets/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
