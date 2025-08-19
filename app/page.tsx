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
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Project Dashboard</h1>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded border px-3 py-2"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded border px-3 py-2"
        >
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProjectCard key={item.title} {...item} />
        ))}
      </div>
    </main>
  );
};

export default Home;
