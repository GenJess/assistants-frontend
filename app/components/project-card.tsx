"use client";

import React from "react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  href: string;
  tags: string[];
  status: string;
  updatedAt: string;
  dataHref?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  href,
  tags,
  status,
  updatedAt,
  dataHref,
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)] transition hover:-translate-y-1 hover:border-white/20">
    <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
      <div className="absolute -top-12 right-0 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl" />
    </div>
    <Link
      href={href}
      className="relative flex h-full flex-col gap-4 focus:outline-none"
      aria-label={title}
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">
          Maintainable workflows and guided assistants.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-300">
          {status}
        </span>
        <span>Updated {updatedAt}</span>
      </div>
    </Link>
    {dataHref && (
      <button
        onClick={() => window.open(dataHref, "_blank")}
        className="relative mt-4 w-full rounded-full border border-white/10 bg-white/10 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/30 hover:bg-white/20"
      >
        View Data
      </button>
    )}
  </div>
);

export default ProjectCard;
