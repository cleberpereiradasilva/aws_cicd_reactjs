# AWS CI/CD React + Vite Boilerplate

This repository is a **boilerplate project** for deploying a React application built with Vite to AWS S3 using GitHub Actions CI/CD.  
It includes **Production** and **Development** environments, automated backups for Production, and a manual rollback system.

---

## 🔹 Project Overview

- **Frontend:** React + TypeScript + Vite
- **Deployment:** AWS S3 static hosting
- **CI/CD:** GitHub Actions
- **Environments:**
  - **Production (main branch):** deployed to `S3_BUCKET` with automated backups to `S3_BUCKET_BK`
  - **Development (develop branch):** deployed to `S3_BUCKET_DEV` without backups

This setup allows you to have an **active production version**, a **backup of each deploy**, and a **separate environment for testing**.

---

## 🔹 Folder Structure

```
aws_cicd_reactjs/
├─ .github/workflows/
│  ├─ deploy-prod.yml      # Production workflow (with backup)
│  ├─ deploy-dev.yml       # Development workflow (no backup)
│  ├─ list_backups.yml     # Lists available production backups
│  └─ rollback.yml         # Manual rollback workflow
├─ public/                 # Static files
├─ src/                    # React source code
├─ package.json
├─ yarn.lock
└─ vite.config.ts
```

---

## 🔹 How CI/CD Works

### Production (main branch)

1. Push to `main` triggers `deploy-prod.yml`.
2. GitHub Actions builds the React app using `yarn build`, output goes to `dist/`.
3. **Backup:** Current build is synced to `S3_BUCKET_BK` with timestamp format `YYYYMMDD-HHMMSS`.
4. **Active deploy:** New build is synced to `S3_BUCKET`, serving the live production site.
5. **Rollback:** Any backup can be restored using the `rollback.yml` workflow.

### Development (develop branch)

1. Push to `develop` triggers `deploy-dev.yml`.
2. GitHub Actions builds the app.
3. Build is synced to `S3_BUCKET_DEV`.
4. No backup is done for dev deployments.

---

## 🔹 AWS S3 Configuration

For each bucket:

1. Enable **Static Website Hosting**:
   - Index document: `index.html`
   - Error document: `index.html` (for SPA routing)

2. Set proper **bucket policies** for public access.

3. **Secrets in GitHub**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_KEY`
   - `AWS_REGION`
   - `S3_BUCKET` → Production bucket
   - `S3_BUCKET_BK` → Production backup bucket
   - `S3_BUCKET_DEV` → Development bucket

---

## 🔹 Rollback System

### Manual Rollback Workflow

- Workflow: `rollback.yml`
- Workflow Dispatch Input: `backup_timestamp` (format `YYYYMMDD-HHMMSS`)
- Steps:
  1. First, list available backups using `list_backups.yml`.
  2. Copy the desired timestamp from the log.
  3. Run `rollback.yml` and input the timestamp.
  4. The selected backup will be synced to the production bucket.

Example AWS CLI commands if needed manually:

- List backups: `aws s3 ls s3://S3_BUCKET_BK/`
- Restore a backup: `aws s3 sync s3://S3_BUCKET_BK/<timestamp>/ s3://S3_BUCKET/ --delete`

---

## 🔹 Getting Started

1. **Clone the repository:**

```
git clone https://github.com/cleberpereiradasilva/aws_cicd_reactjs.git
cd aws_cicd_reactjs
```

2. **Install dependencies:**

```
yarn install
```

3. **Start development server:**

yarn dev

4. **Build for production:**

```
yarn build
```

5. **Push to the respective branch** to trigger CI/CD workflows.

---

## 🔹 Benefits of This Boilerplate

- **Automated CI/CD** → no manual S3 uploads required
- **Backup management** → every production deploy is preserved
- **Manual rollback** → easy restore of any previous version
- **Separate Dev environment** → safe testing without affecting production
- **SPA-friendly** → `index.html` handles routing

---

## 🔹 Notes

- Designed for small to medium projects
- Easy to expand with staging or multiple regions
- Ensure your AWS IAM user has **S3 full access** to the respective buckets

---

## 🔹 License

MIT License
