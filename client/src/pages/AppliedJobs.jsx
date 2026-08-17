import { useEffect, useState } from "react";
import api from "../services/api";
export default function AppliedJobs(){
 const [apps,setApps]=useState([]);
 useEffect(()=>{api.get("/applications/my").then(r=>setApps(r.data));},[]);
 return <main className="container py-10"><h1 className="text-4xl font-black">Applied Jobs</h1><div className="mt-8 grid gap-4">{apps.map(a=><div className="card" key={a._id}><div className="flex justify-between gap-4"><div><h3 className="text-xl font-bold">{a.jobId?.title}</h3><p className="text-indigo-600">{a.jobId?.company?.companyName}</p></div><span className="badge">{a.status}</span></div><p className="mt-4 text-sm text-slate-500">Applied {new Date(a.createdAt).toLocaleDateString()}</p></div>)}{!apps.length&&<div className="card text-slate-500">No applications yet.</div>}</div></main>;
}
