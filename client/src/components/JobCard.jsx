import { Link } from "react-router-dom";
import { MapPin, Briefcase, Clock } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <article className="card transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="mt-1 font-medium text-indigo-600">{job.company?.companyName || "Company"}</p>
        </div>
        <span className="badge">{job.jobType}</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="flex gap-2"><MapPin size={16}/>{job.location}</span>
        <span className="flex gap-2"><Briefcase size={16}/>{job.experience || "Any experience"}</span>
        <span className="flex gap-2"><Clock size={16}/>{job.salary || "Salary not disclosed"}</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-500">{new Date(job.createdAt).toLocaleDateString()}</span>
        <Link className="btn-primary" to={`/jobs/${job._id}`}>View Details</Link>
      </div>
    </article>
  );
}
