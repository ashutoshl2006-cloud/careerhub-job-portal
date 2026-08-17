import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api from "../services/api";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ search:"", location:"", category:"" });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function load(p=page) {
    const { data } = await api.get("/jobs", { params: {...form, page:p, limit:9} });
    setJobs(data.jobs); setPages(data.pages);
  }
  useEffect(() => { load(1); }, []);

  return <main className="container py-10">
    <div className="mb-8"><h1 className="text-4xl font-black">Find your next job</h1><p className="mt-2 text-slate-500">Search, filter and apply to opportunities.</p></div>
    <div className="card mb-8 grid gap-3 md:grid-cols-4">
      <input className="input" placeholder="Job title or skill" value={form.search} onChange={e=>setForm({...form,search:e.target.value})}/>
      <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
      <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
      <button className="btn-primary justify-center" onClick={()=>{setPage(1);load(1)}}><Search size={18}/> Search</button>
    </div>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{jobs.map(job=><JobCard key={job._id} job={job}/>)}</div>
    {!jobs.length && <div className="card mt-6 text-center text-slate-500">No jobs found. Try another search.</div>}
    {pages > 1 && <div className="mt-8 flex justify-center gap-2">{Array.from({length:pages},(_,i)=><button key={i} onClick={()=>{setPage(i+1);load(i+1)}} className={`rounded-lg px-4 py-2 ${page===i+1?"bg-indigo-600 text-white":"border"}`}>{i+1}</button>)}</div>}
  </main>;
}
