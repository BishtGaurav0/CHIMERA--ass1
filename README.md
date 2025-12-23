# 🌌 Nebula Vault - Your Live Multiverse

## 📌 Introduction

A modern, responsive **React + Vite dashboard** built using **React.js**, designed to manage three parallel universes: **Artifacts**, **Creatures**, and **Logs**. This project focuses on creating a seamless user experience with live Firebase Realtime Database synchronization, modal-based item addition, and a slightly sci-fi dashboard UI.

## 🛠️ Project Type

**Frontend**

## 🌐 Deployed App

* **Frontend:** [https://chimera-ass1-m3khoc0zz-bishtgaurav0s-projects.vercel.app/](https://chimera-ass1-m3khoc0zz-bishtgaurav0s-projects.vercel.app/)

## 📁 Directory Structure

nebula-vault/
├─ public/
├─ src/
│  ├─ components/
│  ├─ assets/
│  ├─ App.jsx
│  └─ index.jsx
├─ package.json
└─ README.md

## 📹 Video Walkthrough of the Project

![Image](https://github.com/user-attachments/assets/a6f0f143-a903-42ce-9bb6-a18cdfd87ae0)

## ✨ Features

* 🧾 Universe tabs for Artifacts, Creatures, and Logs
* 🛒 Add item modal (name only)
* 🔄 Realtime updates using Firebase Realtime Database
* ⏸️ Temporal Freeze to pause live updates
* 🔍 Pagination with scroll & page persistence
* 🖥️ Responsive design with sci-fi theme
* 🌐 Hosted on Vercel

## 📐 Design Decisions or Assumptions

* Used Firebase Realtime Database as backend
* All items only require a name field
* Freeze mode buffers live updates until unpaused
* Designed for desktop-first, then responsive for mobile
* Used functional components and React hooks (useState, useEffect, useRef)

## ⚙️ Installation & Getting Started

To run this project locally:

```bash
git clone https://github.com/bishtgaurav0/CHIMERA--ass1.git
cd CHIMERA--ass1
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard locally.
