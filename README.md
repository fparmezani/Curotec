
# CUROTEC - Complete System (Backend + FrontEnd)

This repository contains a full system divided into two main solutions: a **RESTful API** built with **ASP.NET Core** and a **SPA frontend** developed with **Angular**.

---

## 📁 Project Structure

```
Curotec/
└── src/
    ├── Backend/
    │   ├── Curotec.Store.sln         # Main backend solution
    │   ├── backend/
    │   │   ├── Curotec.Store.API       # ASP.NET Core API project
    │   │   ├── Curotec.Store.Business  # Business logic, validations and services
    │   │   └── Curotec.Store.Data      # Data access layer (Entity Framework)
    │   └── tests/
    │       └── Curotec.Store.Tests     # Unit test project (xUnit)
    │
    └── FrontEnd/
        └── Curotec-Web/              # Angular web application
```

---

## 🔧 Backend - Curotec.Store

### Technologies

- ASP.NET Core Web API
- Entity Framework Core
- FluentValidation
- xUnit, Moq, FluentAssertions

### Features

- Contractor management
- Product management
- Entity validation with notification handling
- Generic repository pattern

### How to run the backend

1. Open the `Curotec.Store.sln` solution in Visual Studio or VS Code.
2. Configure the database connection string in `appsettings.Development.json`.
3. Run migrations (if using EF Core).
4. Run the `Curotec.Store.API` project.

```bash
cd src/Backend/backend/Curotec.Store.API
dotnet run
```

---

## 🌐 Frontend - Curotec-Web

### Technologies

- Angular 14+
- TypeScript
- Bootstrap / SCSS
- HTTP Client integration with API
- Karma and Jasmine for unit tests

### How to run the frontend

1. Navigate to the frontend folder:
```bash
cd src/FrontEnd/Curotec-Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Access in your browser:
```
http://localhost:4200
```

---

## 🧪 Tests

### Backend

- Location: `src/Backend/tests/Curotec.Store.Tests`
- Frameworks: `xUnit`, `Moq`, `FluentAssertions`

```bash
dotnet test
```

### Frontend

```bash
npm run test
```

---

## ✅ Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'feat: my new feature'`
4. Push to your branch: `git push origin my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Developed by [Your Name] — feel free to get in touch!
