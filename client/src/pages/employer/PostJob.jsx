import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function PostJob(){
 const nav=useNavigate();const [f,setF]=useState({title:"",location:"",salary:"",experience:"",jobType:"Full Time",category:"",skills:"",description:"",deadline:""});
 const ch=e=>setF({...f,[e.target.name]:e.target.value});
 async function submit(e){e.preventDefault();await api.post("/jobs",{...f,skills:f.skills.split(",").map(x=>x.trim()).filter(Boolean)});nav("/employer/jobs");}
 return <main className="container py-10"><form onSubmit={submit} className="card"><h1 className="text-3xl font-black">Post New Job</h1><div className="mt-6 grid gap-4 md:grid-cols-2">{["title","location","salary","experience","category"].map(x=><label className="label" key={x}>{x[0].toUpperCase()+x.slice(1)}<input className="input" name={x} required={x==="title"||x==="location"} value={f[x]} onChange={ch}/></label>)}<label className="label">Job Type<select className="input" name="jobType" value={f.jobType} onChange={ch}><option>Full Time</option><option>Part Time</option><option>Internship</option><option>Contract</option></select></label><label className="label">Deadline<input className="input" type="date" name="deadline" value={f.deadline} onChange={ch}/></label><label className="label md:col-span-2">Skills (comma separated)<input className="input" name="skills" value={f.skills} onChange={ch}/></label><label className="label md:col-span-2">Description<textarea className="input min-h-48" name="description" required value={f.description} onChange={ch}/></label></div><button className="btn-primary mt-6">Publish Job</button></form></main>;
}
