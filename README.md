# Scaffold

Scaffold is a networking app for tradespeople and apprentices to connect and find community.  
The app provides a safe, supportive space where users can join groups, share experiences, and access opportunities within the trades industry.

## Project Status

🚧 **Early Development**  
This project is in its initial stages. We are currently setting up the foundation and haven’t built out core features yet.

## Tech Stack

- [Expo](https://expo.dev/) — for building and testing our React Native app
- React Native — mobile app framework
- Planned: Backend and database (to be decided in future phases)

## Supabase Auth Setup

1. Create a Supabase project and copy your `Project URL` and `anon` key.
2. Duplicate `.env.example` to `.env` (or your preferred env file) and fill in:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - Optional: `EXPO_PUBLIC_SUPABASE_RESET_REDIRECT_URL` for password reset links.
3. Start the app (`npm start` / `expo start`). You’ll see the new Supabase-backed sign up and log in screens before reaching the tabs.

## Goals (Initial Phase)

- Set up the project environment using Expo
- Define the app’s core flows and navigation structure
- Build a simple prototype for testing basic interactions

## How to Run (once setup is ready)

1. Clone the repository:

   git clone https://github.com/amolwalia/Scaffold.git

2. Navigate into the project folder:

   cd scaffold

3. Install dependencies:

   npm install

4. Start the Expo development server:

   npx expo start

This will launch Expo Dev Tools in your browser, where you can run the app in an iOS/Android simulator or on your own device with the Expo Go app.

Contributing

Since this is an early-stage project, contributions right now focus on planning, documentation, and setting up the development environment. As the app structure grows, we’ll add contribution guidelines.
