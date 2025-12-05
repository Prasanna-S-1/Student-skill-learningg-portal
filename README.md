# 🚀 SkillHub: Premium Student Skill Learning Portal (Frontend Capstone)

[![Tech: React + Vite](https://img.shields.io/badge/Framework-React%20%2B%20Vite-blue)](https://react.dev/)

## 🌟 Project Overview
SkillHub is a capstone-level, front-end web application designed to simulate a professional online learning platform. It implements a comprehensive set of modern React concepts, including **React Router**, **Context API** for global state, and persistence via **LocalStorage**.

The project features a **unique, vibrant dark theme** and a public-facing entry point, making the entire application professional and visually premium.

## ✅ Key Features & Functionality

* **Public Landing Page:** A marketing-focused root page (`/`) with an interactive header, mock **About/Careers/Contact** modal system, and a unique aesthetic. The logo always links back to this page.
* **Authentication (Mock):** Secure-looking **Signup** and **Login/Logout** implemented entirely client-side using persistence via **LocalStorage**.
* **Protected Routes:** Restricts access to the Dashboard, Courses, and Profile pages if the user is not logged in.
* **Premium Dashboard:** Displays a personalized welcome, categorized **Progress Bars**, and interactive **Key Statistics Cards** with **glowing hover effects**. Includes working **Search** functionality.
* **Course Management:** Dedicated Courses page allows listing, searching, and **Filtering by Category**. The course cards feature a unique, category-colored glow on hover.
* **Course Detail:** Displays stable embedded **YouTube Lesson Videos** and provides the critical **"Mark as Completed"** button.
* **Progress Tracking:** Lesson completion status is persisted in **LocalStorage** against the user's ID, updating the Dashboard and Profile totals in real-time.
* **Profile Management:** Shows user details, total lessons completed, login history, and a persistent **Mock "Change Photo"** feature (avatar remains visible upon navigation).
* **UI/UX:** Built with a consistent **Vibrant Deep Space Dark Theme**, custom icons (`react-icons`), and dynamic animations.

## 🖼️ Application Screenshots

| Page | Description | Visual Reference |
| :--- | :--- | :--- |
| **Landing Page** | The public entrance showing the vibrant aesthetic and unique structure. | ![Landing Page Screenshot](https://github.com/Prasanna-S-1/Student-skill-learningg-portal/blob/main/assets/Screenshot%202025-12-05%20115438.png?raw=true) |
| **Dashboard** | The main user area, highlighting **Lessons Completed**, **Key Stats**, and **Progress Bars**. | ![Dashboard Screenshot](https://github.com/Prasanna-S-1/Student-skill-learningg-portal/blob/main/assets/Screenshot%202025-12-05%20115620.png?raw=true) |
| **Courses Page** | Course catalog featuring **category filtering** and **glowing cards**. | ![Courses Page Screenshot](https://github.com/Prasanna-S-1/Student-skill-learningg-portal/blob/main/assets/Screenshot%202025-12-05%20115631.png?raw=true) |
| **Profile Page** | User summary, persistent avatar area, and progress breakdown. | ![Profile Page Screenshot](https://github.com/Prasanna-S-1/Student-skill-learningg-portal/blob/main/assets/Screenshot%202025-12-05%20115641.png?raw=true) |
| **Signup Page** | Clean, dark-mode signup form. | ![Signup Page Screenshot](https://github.com/Prasanna-S-1/Student-skill-learningg-portal/blob/main/assets/Screenshot%202025-12-05%20115520.png?raw=true) |

## 🛠️ Steps to Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone [Your GitHub Repository URL]
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd student-skill-learning-portal
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Start the Development Server:**
    ```bash
    npm run dev  
    ```
    *The application will open in your browser, usually at `http://localhost:5173/`.*

## 🔑 Demo Credentials

| Field | Value |
| :--- | :--- |
| **Email** | `user@example.com` |
| **Password** | `demo123` |