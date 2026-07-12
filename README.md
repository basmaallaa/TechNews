# 📰 TechNews

TechNews is a modern news web application built with **Angular 21** using **Standalone Components**. The application allows users to browse the latest news, create posts, and manage their profile with authentication and route protection.

---

## ✨ Features

### 🏠 Home
- Display the latest news posts.
- Responsive and modern UI.

### ℹ️ About
- Information about the application.

### 📝 Posts
- View all posts.
- Create new posts.
- Posts are stored using **JSON Server** as a fake REST API.

### 👤 Profile
- View user profile.
- Change profile picture.

### 🔐 Authentication
- User Login.
- Route protection using **Auth Guard**.
- Unauthorized users cannot access the **Posts** or **Profile** pages.

---

## 🛠️ Built With

- Angular 21
- Standalone Components
- TypeScript
- HTML5
- CSS3
- Bootstrap
- Angular Router
- Route Guards
- RxJS
- Custom Directives
- Custom Pipes
- JSON Server

---

## 📁 Project Structure

```
src/
│
├── app/
│   ├── Components/
│   ├── pages/
│   ├── Services/
│   ├── Guards/
│   ├── Directives/
│   ├── Pipes/
│   ├── Models/
│   ├── DB/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
│
├── assets/
└── environments/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/basmaallaa/TechNews.git
```

### Navigate to the project

```bash
cd TechNews
```

### Install dependencies

```bash
npm install
```

### Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### Run the Angular application

```bash
ng serve
```

Visit:

```
http://localhost:4200
```

---

## 📸 Screenshots

Add screenshots for:

- Home
- About
- Posts
- Profile
- Login

---

## 🔮 Future Enhancements

- Edit and delete posts.
- Search posts.
- Categories.
- Comments.
- Likes.
- Real backend integration.
- User registration.
- Dark mode.

---

## 👩‍💻 Author

**Basma Alaa**

- GitHub: https://github.com/basmaallaa

---

⭐ If you like this project, consider giving it a star!
