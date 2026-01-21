"use client";

import { useState } from "react";
import ProjectCard from "./components/project-card";

export type Project = {
  title: string;
  href: string;
  tags: string[];
  status: string;
  updatedAt: string;
  dataHref?: string;
};

const projects: Project[] = [
  {
    title: "Basic chat",
    href: "/examples/basic-chat",
    tags: ["chat", "example"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "Function calling",
    href: "/examples/function-calling",
    tags: ["api", "example"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "File search",
    href: "/examples/file-search",
    tags: ["files", "example"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "All",
    href: "/examples/all",
    tags: ["example"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "Aevo Copy Trader",
    href: "/aevo-copy-trader",
    tags: ["trading", "script"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "Letta Agent",
    href: "/letta-agent",
    tags: ["chat", "agent"],
    status: "live",
    updatedAt: "2024-07-22",
  },
  {
    title: "Zip to Text Extractor",
    href: "/zip-to-text-extractor",
    tags: ["tool"],
    status: "live",
    updatedAt: "2025-09-14",
  },
  {
    title: "Knowledge Repo",
    href: "/knowledge-repo",
    tags: ["knowledge", "research"],
    status: "draft",
    updatedAt: "2025-09-14",
  },
];

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

const Home = () => {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const filtered = projects.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesTag = tag === "All" || p.tags.includes(tag);
    return matchesQuery && matchesTag;
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.8)]">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
          Assistants workspace
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Build, monitor, and evolve your assistant ecosystem.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          A modern, mobile-ready dashboard that keeps projects, research, and
          agents aligned. Filter by capability, drill into details, and add new
          knowledge in a consistent UI flow.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="w-full">
            <span className="sr-only">Search projects</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            />
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
          >
            {allTags.map((t) => (
              <option key={t} value={t} className="text-slate-900">
                {t}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProjectCard key={item.title} {...item} />
        ))}
      </section>
    </main>
  );
};

export default Home;
