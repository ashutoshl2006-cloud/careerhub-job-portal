import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function Profile(){
 const {user}=useAuth(); const [name,setName]=useState(user?.name||""); const [phone,setPhone]=useState(user?.phone||""); const [msg,setMsg]=useState("");
 async function save(e){e.preventDefault();const {data}=await api.put("/users/profile",{name,phone});localStorage.setItem("user",JSON.stringify(data));setMsg("Profile updated.");}
 async function resume(e){const fd=new FormData();fd.append("resume",e.target.files[0]);await api.post("/users/resume",fd,{headers:{"Content-Type":"multipart/form-data"}});setMsg("Resume uploaded.");}
 return <main className="container py-10"><form className="card max-w-2xl" onSubmit={save}><h1 className="text-3xl font-black">My Profile</h1><label className="label">Name<input className="input" value={name} onChange={e=>setName(e.target.value)}/></label><label className="label">Phone<input className="input" value={phone} onChange={e=>setPhone(e.target.value)}/></label>{user?.role==="Job Seeker"&&<label className="label">Resume (PDF)<input className="input" type="file" accept="application/pdf" onChange={resume}/></label>}<button className="btn-primary mt-3">Save Profile</button>{msg&&<p className="mt-3 text-indigo-600">{msg}</p>}</form></main>;
}
