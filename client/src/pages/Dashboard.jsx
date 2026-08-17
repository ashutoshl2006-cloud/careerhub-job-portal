import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const links = user?.role==="Employer"
    ? [["Post Job","/employer/post"],["Manage Jobs","/employer/jobs"],["Company Profile","/employer/company"]]
    : user?.role==="Admin"
    ? [["Admin Dashboard","/admin"],["Users","/admin/users"],["Jobs","/admin/jobs"]]
    : [["Browse Jobs","/jobs"],["Applied Jobs","/applied"],["Profile","/profile"]];
  return <main className="container py-12"><div className="card"><span className="badge">{user?.role}</span><h1 className="mt-4 text-4xl font-black">Hello, {user?.name}</h1><p className="mt-2 text-slate-500">Welcome to your CareerHub dashboard.</p><div className="mt-8 grid gap-4 md:grid-cols-3">{links.map(([a,b])=><Link className="card border-2 hover:border-indigo-500" to={b} key={b}><h3 className="font-bold">{a}</h3><p className="mt-1 text-sm text-slate-500">Open module →</p></Link>)}</div></div></main>;
}
