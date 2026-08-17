# Online Job Portal System Using MERN Stack

A full-stack job portal for Job Seekers, Employers, and Administrators.

## Features
- JWT authentication and role-based access
- Job seeker profile and PDF resume upload
- Job search, filtering, pagination, favorites and applications
- Employer company profile and job management
- Applicant management with accept/reject workflow
- Admin dashboard, user/job/application management
- Contact/feedback/FAQ module
- Responsive UI, dark/light mode, loading skeletons
- Optional email notification hooks

## Stack
React + Vite, Node.js, Express.js, MongoDB/Mongoose, JWT, bcryptjs, Multer, Tailwind CSS.

## Run
### Backend
1. `cd server`
2. `npm install`
3. Copy `.env.example` to `.env` and set MongoDB/JWT values.
4. `npm run dev`

### Frontend
1. `cd client`
2. `npm install`
3. `npm run dev`

Frontend defaults to `http://localhost:5173`.
Backend defaults to `http://localhost:5000`.

## Demo roles
Register a normal account and select Job Seeker or Employer.
For Admin, set `role: "Admin"` manually in MongoDB for a trusted account.

## Notes
The `html`, `css`, `js`, `images`, `video`, and `pdf` folders are included as requested.
The React application is the primary frontend implementation.
