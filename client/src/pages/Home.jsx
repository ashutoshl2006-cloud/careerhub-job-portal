import { Link } from "react-router-dom";
import { Search, Users, Building2, BriefcaseBusiness } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container grid items-center gap-10 py-24 md:grid-cols-2">
          <div>
            <span className="badge bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">#1 career platform</span>
            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-6xl">Find work that moves your <span className="text-indigo-600">career forward.</span></h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">Search verified opportunities, build your profile, and connect with companies hiring right now.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/jobs"><Search size={18}/> Explore Jobs</Link>
              <Link className="btn-secondary" to="/register">Create Account</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              [BriefcaseBusiness, "10K+", "Active Jobs"],
              [Building2, "2K+", "Companies"],
              [Users, "25K+", "Candidates"],
              [Search, "98%", "Search Success"]
            ].map(([Icon, n, label]) => <div className="card" key={label}><Icon className="text-indigo-600"/><div className="mt-5 text-3xl font-black">{n}</div><p className="text-sm text-slate-500">{label}</p></div>)}
          </div>
        </div>
      </section>
      <section className="container py-16">
        <h2 className="text-3xl font-black">How CareerHub works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Create your profile", "Discover matching jobs", "Apply and get hired"].map((x, i) => <div className="card" key={x}><span className="text-4xl font-black text-indigo-200">0{i+1}</span><h3 className="mt-4 text-xl font-bold">{x}</h3><p className="mt-2 text-slate-500">A simple workflow designed to get you from search to interview faster.</p></div>)}
        </div>
      </section>
    </main>
  );
}
