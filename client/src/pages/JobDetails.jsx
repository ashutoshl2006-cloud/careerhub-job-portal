import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams(); const { user } = useAuth();
  const [job,setJob]=useState(null); const [coverLetter,setCoverLetter]=useState(""); const [msg,setMsg]=useState("");
  useEffect(()=>{api.get(`/jobs/${id}`).then(r=>setJob(r.data));},[id]);
  async function apply(){try{await api.post("/applications",{jobId:id,coverLetter});setMsg("Application submitted successfully.");}catch(e){setMsg(e.response?.data?.message||"Could not apply.");}}
  if(!job) return <div className="container py-20 text-center">Loading job...</div>;
  return <main className="container py-10">
    <div className="card">
      <span className="badge">{job.jobType}</span><h1 className="mt-4 text-4xl font-black">{job.title}</h1>
      <p className="mt-2 text-lg font-semibold text-indigo-600">{job.company?.companyName}</p>
      <div className="mt-6 grid gap-3 text-slate-600 dark:text-slate-300 md:grid-cols-3"><span>📍 {job.location}</span><span>💰 {job.salary||"Not disclosed"}</span><span>🎯 {job.experience||"Any"}</span></div>
      <div className="mt-8"><h2 className="text-2xl font-bold">Job Description</h2><p className="mt-3 whitespace-pre-line leading-7 text-slate-600 dark:text-slate-300">{job.description}</p></div>
      <div className="mt-8"><h2 className="text-2xl font-bold">Skills</h2><div className="mt-3 flex flex-wrap gap-2">{job.skills?.map(s=><span className="badge" key={s}>{s}</span>)}</div></div>
      {user?.role==="Job Seeker" && <div className="mt-10 border-t pt-8 dark:border-slate-800"><h2 className="text-2xl font-bold">Apply for this position</h2><textarea className="input mt-4 min-h-32" placeholder="Write a short cover letter..." value={coverLetter} onChange={e=>setCoverLetter(e.target.value)}/><button onClick={apply} className="btn-primary mt-4">Submit Application</button>{msg&&<p className="mt-3 text-sm text-indigo-600">{msg}</p>}</div>}
    </div>
  </main>;
}
