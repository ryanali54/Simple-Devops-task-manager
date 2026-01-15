# Simple DevOps Task Manager

A containerized **DevOps Task Manager application** deployed using **Docker** and **Kubernetes (Minikube)**.  
This project is built to demonstrate **core DevOps concepts** such as containerization, orchestration, Helm-based deployments, and service communication.

It is designed primarily as a **portfolio and learning project** rather than a production-grade application.

---

## 🚀 Project Overview

The Simple DevOps Task Manager showcases an end-to-end DevOps workflow:

- Application containerization using **Docker**
- Multi-service orchestration using **Kubernetes**
- Deployment management via **Helm charts**
- Local Kubernetes cluster using **Minikube**

The project contains:
- A **frontend** service (UI)
- A **backend** service (API)
- Dockerfiles for each service
- Helm chart for Kubernetes deployment

---

## 🧱 Architecture
```mermaid
flowchart LR
    User --> Frontend
    Frontend --> Backend

    subgraph Kubernetes (Minikube)
        Frontend
        Backend
    end
```

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Application API (lightweight service)
- **Containerization:** Docker
- **Orchestration:** Kubernetes (Minikube)
- **Deployment Management:** Helm
- **Infrastructure Concepts:** Pods, Services, ConfigMaps

---

## 📦 Prerequisites

Make sure the following tools are installed:

- Docker
- Minikube
- kubectl
- Helm
- Git

---

## 🛠️ Setup & Deployment (Local)

```bash
git clone https://github.com/ryanali54/Simple-Devops-task-manager.git
cd Simple-Devops-task-manager
bash

```
```bash
minikube start
```
```bash
eval $(minikube docker-env)
```
```bash
# Build backend image
docker build -t devops-task-backend ./backend
```
```bash
# Build frontend image
docker build -t devops-task-frontend ./frontend
helm install devops-task ./helm-chart
minikube service devops-task-frontend
```
### File Structure
```bash

Simple-Devops-task-manager/
│
├── backend/               # Backend service source code & Dockerfile
├── frontend/              # Frontend UI source code & Dockerfile
├── helm-chart/            # Helm chart for Kubernetes deployment
├── docker-compose.yaml    # Local multi-container setup (optional)
├── visualizer.yaml        # Optional Kubernetes visualizer
└── README.md

