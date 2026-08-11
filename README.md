# Findora – Campus Lost & Found

Findora is a campus-based Lost & Found web application that helps students report, search, and recover lost belongings within their college community.

## Features

- User registration and login
- JWT-based authentication
- Report lost items
- Report found items
- Mandatory item image upload
- Search and filter items
- View item details
- Edit reported items
- My Items section
- User profile
- Logout functionality
- Real-time conversations and messaging
- Image storage using Cloudinary
- Protected application routes

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- WebSocket
- Cloudinary

## Project Structure

```text
Findora/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── .gitignore
└── README.md