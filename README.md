# Talent Tracker - Candidate Search

🚀 **A web application that allows employers to browse GitHub profiles, save potential candidates, and manage a list of saved profiles.** Built using **React, TypeScript, and Bootstrap**, with data from the **GitHub API**.

## 📜 Table of Contents
- [📌 About the Project](#-about-the-project)
- [📦 Installation](#-installation)
- [🚀 Usage](#-usage)
- [🌎 Live Demo](#-live-demo)
- [🛠️ Technologies Used](#-technologies-used)
- [📝 Features](#-features)
- [⚙️ Environment Variables](#-environment-variables)
- [🛠 Deployment](#-deployment)
- [🎯 Future Improvements](#-future-improvements)
- [💡 Author](#-author)

---

## 📌 About the Project
This project is a **GitHub Candidate Search Application** where users can:
- Browse GitHub profiles retrieved via the **GitHub API**.
- Save candidates to a list of potential hires.
- Reject candidates and move to the next profile.
- View saved candidates on a separate page.
- Data is persisted using **localStorage**.

---

## 📦 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Azugr/Module-13-Challenge.git
cd Module-13-Challenge/Talent-Tracker
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create a `.env` file for API authentication
- Add a **GitHub Personal Access Token** inside `.env`:
```sh
VITE_GITHUB_TOKEN=your_github_personal_access_token
```
> 🔹 Follow [GitHub's guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to generate a token.

### 4️⃣ Run the application
```sh
npm run dev
```
> Open **`http://localhost:3000`** in your browser.

---

## 🚀 Usage
### 1️⃣ Search for GitHub Candidates
- The main page loads a **random GitHub user profile**.

### 2️⃣ Accept or Reject Candidates
- **Click `+`** to save the candidate.
- **Click `-`** to skip and load the next profile.

### 3️⃣ View Saved Candidates
- Click **"Saved Candidates"** in the navbar to view profiles you've added.

### 4️⃣ Persist Data
- Your saved candidates remain stored even after refreshing the page.

---

## 🌎 Live Demo
🔗 **Deployed on Render:**  
[👉 Talent Tracker on Render](https://talent-tracker.onrender.com)

---

## 🛠️ Technologies Used
| Technology | Purpose |
|------------|---------|
| **React** (Vite) | Frontend Framework |
| **TypeScript** | Strongly-typed JS |
| **Bootstrap** | UI Styling |
| **GitHub API** | Fetching user data |
| **Render** | Deployment |
| **LocalStorage** | Saving candidates |

---

## 📝 Features
✅ Fetches **random GitHub profiles**  
✅ Allows users to **save or reject** candidates  
✅ Displays a **list of saved candidates**  
✅ Uses **localStorage** for persistence  
✅ **Responsive & Mobile-friendly** design  
✅ **Deployed on Render**  

---

## ⚙️ Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_GITHUB_TOKEN` | GitHub API token (Required) |

---

## 🛠 Deployment
### 🔹 Deploy to Render
1. **Push to GitHub**:
   ```sh
   git add .
   git commit -m "Deploying Talent Tracker"
   git push origin main
   ```
2. **Go to [Render](https://render.com/)** and create a new web service.
3. **Connect to GitHub** and select the repository.
4. **Set Environment Variables**:
   - `VITE_GITHUB_TOKEN=your_github_personal_access_token`
5. **Set Build & Start Commands**:
   - **Build Command:**
     ```sh
     cd Talent-Tracker && npm install && npm run build
     ```
   - **Start Command:**
     ```sh
     cd Talent-Tracker && npm run preview
     ```
6. **Click Deploy** and wait for it to go live.

---

## 🎯 Future Improvements
- 🔍 **Add sorting and filtering options** for saved candidates.
- 🖼 **Improve UI design** with better styling.
- 📊 **Analytics on saved candidates**.

---

## 💡 Author
👤 **Azugr**  
📌 GitHub: [Azugr](https://github.com/Azugr)  
📌 Live App: [Talent Tracker on Render](https://talent-tracker.onrender.com)  

🚀 Built with ❤️ for the **GitHub API Challenge**! 🎉


