# 🛍️ Supasac

**Supasac** is an e-commerce application designed to onboard and empower stores to offer their products through a centralized marketplace. It offers users a robust platform to browse, discover, and purchase goods, while enabling merchants to manage their store and inventory seamlessly.

---

## 🚀 Features

- Store onboarding and management
- Product listing and categorization
- Customer browsing and checkout experience
- Role-based user access
- Admin dashboard (coming soon)

---

## 🛠️ Technologies

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Sequelize
- **CI/CD**: GitHub Actions
- **Environment Support**: `dev`, `test`

---

## 🧰 Getting Started

### 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/TMDav007/supasac.git
   
   cd supasac

   npm install
   
   ```
2. Start locally
   ```bash
    npm run dev
   ```
3. #### local - http://localhost:5173/
   
4. #### - https://cheery-bubblegum-c7e02a.netlify.app/signin
---

## 🔄 Git Workflow & Branching Strategy

### 📌 Active Branch: `develop`

All code must be merged into the `develop` branch until further notice.

### 🌿 Feature Branches

- Use a feature branch for new features or fixes.
- Branch naming: `feature/<short-description>` or `bugfix/<short-description>`

Example:
```bash
git checkout -b feature/add-login
```

### ✅ Pull Request Target

Pull requests must be opened **against `develop`**, not `main`.

---

## 📝 Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(scope): short description

body (optional)
```

### Common Types

- `feat`: New feature
- `fix`: Bug fix
- `chore`: Maintenance
- `refactor`: Code change that doesn’t fix a bug or add a feature
- `docs`: Documentation change
- `test`: Adding or updating tests

### Examples

```
feat(auth): implement login via JWT
fix(product): resolve price calculation bug
chore: update dependencies
```

---

## 🤝 Contributing

We welcome contributions!

- Follow the commit and PR guidelines
- Make sure to write clean and testable code
- Open a PR to `develop` and request a review

---

## 🧪 Environments

- `dev`: for daily development
- `test`: for pre-production QA and integration
- `main`: protected, stable for production (not yet active)

---



   
