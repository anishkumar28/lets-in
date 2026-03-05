# Lets In -- Job Application & Productivity Manager

Lets In is a full-stack web application designed to help job seekers
manage their job applications, track progress, organize tasks, and
maintain notes during the job search process.

The platform provides a structured workflow to track companies, job
roles, applications, tasks, and personal notes in a single dashboard
with real-time synchronization.

------------------------------------------------------------------------

## 🚀 Features

-   **Job Application Tracking** -- Manage companies, roles, and
    application status.
-   **Task Management** -- Create and track tasks related to job
    preparation and applications.
-   **Notes System** -- Maintain interview notes, reminders, and
    preparation details.
-   **Real-Time Sync** -- All data updates instantly using Firebase
    Realtime Database.
-   **Modular CRUD System** -- Add, update, and delete companies, roles,
    tasks, and notes.
-   **Responsive UI** -- Clean interface built with Material UI for
    smooth user interaction.

------------------------------------------------------------------------

## 🛠 Tech Stack

### Frontend

-   React.js
-   Material UI

### Backend / Database

-   Firebase Realtime Database

### Tools

-   Git
-   GitHub
-   Firebase Hosting

------------------------------------------------------------------------

## 📂 Project Structure

    letsin/
    │
    ├── public/                 # Static files
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── pages/              # Application pages
    │   ├── services/           # Firebase configuration and services
    │   ├── utils/              # Helper functions
    │   └── App.js              # Main application component
    │
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1. Clone the repository

``` bash
git clone https://github.com/yourusername/letsin.git
```

### 2. Navigate to the project directory

``` bash
cd letsin
```

### 3. Install dependencies

``` bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the root directory and add your Firebase
configuration:

    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_DATABASE_URL=your_database_url
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id

### 5. Start the development server

``` bash
npm start
```

The application will run at:

    http://localhost:3000

------------------------------------------------------------------------

## 🎯 Future Improvements

-   User authentication system
-   Job analytics dashboard
-   Interview preparation tracker
-   Calendar integration
-   Mobile-first UI improvements

------------------------------------------------------------------------

## 👨‍💻 Author

**Anish Kumar**

GitHub: https://github.com/anishkumar28\
LinkedIn: https://linkedin.com/in/anishkumar28

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.
