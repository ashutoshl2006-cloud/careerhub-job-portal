import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    try { await login(form.email, form.password); nav("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Login failed"); }
  }

  return <div className="container flex min-h-[75vh] items-center justify-center py-12">
    <form onSubmit={submit} className="card w-full max-w-md">
      <h1 className="text-3xl font-black">Welcome back</h1>
      <p className="mt-2 text-slate-500">Sign in to continue to CareerHub.</p>
      {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
      <label className="label">Email<input className="input" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
      <label className="label">Password<input className="input" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
      <button className="btn-primary mt-4 w-full justify-center">Login</button>
      <p className="mt-5 text-center text-sm">Don't have an account? <Link className="font-bold text-indigo-600" to="/register">Register</Link></p>
    </form>
  </div>;
}
