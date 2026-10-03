# HATCHDEV HATCHBOARD

HATCHDEV HATCHBOARD is a Firebase-powered web app. This guide explains how to set it up from scratch on your own machine and connect it to your Firebase project.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js 18 or newer
- npm (comes with Node.js)
- A Firebase account
- A browser to run the app locally

## 1) Clone the project

Open a terminal and run:

```bash
git clone https://github.com/WisdomOfogba/hatchdev-firebase-hatchboard.git
cd my-firebase-app
```

## 2) Install dependencies

```bash
npm install
```

## 3) Create a Firebase project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter a project name and follow the prompts
4. Once the project is created, click "Continue"
5. In the Firebase console, open "Build" and then select "Realtime Database"
6. Click "Create Database"
7. Choose a database location
8. Start in test mode for now (or set your own rules later)

## 4) Enable Firebase Authentication (if used by the app)

If your app allows sign-in, enable Firebase Authentication:

1. In Firebase Console, go to "Build" > "Authentication"
2. Click "Get started"
3. Enable the sign-in methods your app needs (for example: Email/Password or Google)

## 5) Get your Firebase config

1. In Firebase Console, click the gear icon next to "Project overview"
2. Select "Project settings"
3. Scroll to "Your apps"
4. Click the web app icon (`</>`) to register a web app
5. Copy the Firebase config values

The config will look similar to this:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 6) Create your .env file

Create a file named `.env` in the project root and add the values from your Firebase project.

Example:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Important:
- Do not commit `.env` to GitHub
- Keep all Firebase values private

## 7) Configure Realtime Database rules

In Firebase Console, go to "Realtime Database" > "Rules" and paste the following rules:

```json
{
  "rules": {
    "posts": {
      ".read": "auth != null",
      ".indexOn": ["createdAt"],
      "$postId": {
        ".write": "auth != null &&
          (!data.exists() ||
           data.child('authorId').val() === auth.uid)",
        ".validate": "newData.hasChildren(
          ['text','authorId','authorName','createdAt'])
          && newData.child('text').isString()
          && newData.child('text').val().length <= 280
          && newData.child('authorId').val() === auth.uid"
      }
    }
  }
}
```

This rule set means:
- Only authenticated users can read posts
- Posts are indexed by `createdAt`
- Only the author of a post can update or delete it
- Each post must contain the required fields and text length is limited to 280 characters

After changing the rules, click "Publish".

## 8) Run the app locally

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually something like:

```text
http://localhost:5173
```

## 9) Build for production

To prepare the app for deployment:

```bash
npm run build
```

The production build will be created in the `dist` folder.

## 10) Deploy (optional)

If you want to deploy the app:

- Deploy the frontend to Vercel, Netlify, or Firebase Hosting
- Keep the Firebase project connected to the same `.env` values
- Make sure your database rules and auth configuration are already set up

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your `.env` values are correct
- Make sure the keys match your Firebase project
- Restart the dev server after changing `.env`

### "Database rules denied"
- Confirm the user is signed in
- Check that your Firebase Realtime Database rules allow the action
- Make sure `auth.uid` is available when writing data

### App won't start
- Run `npm install` again
- Make sure you are using a supported Node.js version
- Read the terminal output for the exact error

## Summary

To run this project:

```bash
npm install
cp .env.example .env
npm run dev
```

Then configure Firebase correctly and your app should run locally.

If you want, you can also add a `.env.example` file to your project so other developers can copy it quickly.