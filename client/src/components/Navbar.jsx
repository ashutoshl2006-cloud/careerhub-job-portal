import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-indigo-600">
          <BriefcaseBusiness size={25}/> CareerHub
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          <Link to="/jobs">Jobs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          <button onClick={toggleTheme} className="rounded-lg border p-2">{dark ? <Sun size={17}/> : <Moon size={17}/>}</button>
          {user ? (
            <button onClick={() => { logout(); nav("/"); }} className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-white dark:bg-white dark:text-slate-900">
              <LogOut size={16}/> Logout
            </button>
          ) : <Link className="rounded-lg bg-indigo-600 px-4 py-2 text-white" to="/login">Login</Link>}
        </div>
      </nav>
    </header>
  );
}
