import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home"; import Login from "./pages/Login"; import Register from "./pages/Register";
import Jobs from "./pages/Jobs"; import JobDetails from "./pages/JobDetails"; import Dashboard from "./pages/Dashboard";
import AppliedJobs from "./pages/AppliedJobs"; import Profile from "./pages/Profile"; import Contact from "./pages/Contact"; import About from "./pages/About";
import PostJob from "./pages/employer/PostJob"; import ManageJobs from "./pages/employer/ManageJobs"; import CompanyProfile from "./pages/employer/CompanyProfile";
import AdminDashboard from "./pages/admin/AdminDashboard"; import Users from "./pages/admin/Users"; import AdminJobs from "./pages/admin/Jobs";

function DashboardRoute(){const {user}=useAuth(); if(user?.role==="Employer")return <Navigate to="/employer" replace/>; if(user?.role==="Admin")return <Navigate to="/admin" replace/>; return <Dashboard/>}
function EmployerHome(){return <Dashboard/>}

export default function App(){
 return <AuthProvider><BrowserRouter><Navbar/><Routes>
  <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<JobDetails/>}/>
  <Route path="/dashboard" element={<ProtectedRoute><DashboardRoute/></ProtectedRoute>}/>
  <Route path="/applied" element={<ProtectedRoute roles={["Job Seeker"]}><AppliedJobs/></ProtectedRoute>}/>
  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
  <Route path="/employer" element={<ProtectedRoute roles={["Employer"]}><EmployerHome/></ProtectedRoute>}/>
  <Route path="/employer/post" element={<ProtectedRoute roles={["Employer"]}><PostJob/></ProtectedRoute>}/>
  <Route path="/employer/jobs" element={<ProtectedRoute roles={["Employer"]}><ManageJobs/></ProtectedRoute>}/>
  <Route path="/employer/company" element={<ProtectedRoute roles={["Employer"]}><CompanyProfile/></ProtectedRoute>}/>
  <Route path="/admin" element={<ProtectedRoute roles={["Admin"]}><AdminDashboard/></ProtectedRoute>}/>
  <Route path="/admin/users" element={<ProtectedRoute roles={["Admin"]}><Users/></ProtectedRoute>}/>
  <Route path="/admin/jobs" element={<ProtectedRoute roles={["Admin"]}><AdminJobs/></ProtectedRoute>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes><footer className="mt-16 border-t py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} CareerHub · MERN Job Portal</footer></BrowserRouter></AuthProvider>
}
