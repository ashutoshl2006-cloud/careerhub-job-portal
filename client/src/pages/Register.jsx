import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"", role:"Job Seeker" });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    try { await register(form); nav("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Registration failed"); }
  }
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  return <div className="container flex justify-center py-12">
    <form onSubmit={submit} className="card w-full max-w-lg">
      <h1 className="text-3xl font-black">Create your account</h1>
      {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="label">Name<input className="input" name="name" required value={form.name} onChange={change}/></label>
        <label className="label">Phone<input className="input" name="phone" value={form.phone} onChange={change}/></label>
        <label className="label md:col-span-2">Email<input className="input" name="email" type="email" required value={form.email} onChange={change}/></label>
        <label className="label">Password<input className="input" name="password" type="password" minLength="6" required value={form.password} onChange={change}/></label>
        <label className="label">Role<select className="input" name="role" value={form.role} onChange={change}><option>Job Seeker</option><option>Employer</option></select></label>
      </div>
      <button className="btn-primary mt-6 w-full justify-center">Create Account</button>
    </form>
  </div>;
}
