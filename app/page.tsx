"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./components/project-card";

type Item = {
  title: string;
  href: string;
};

const staticItems: Item[] = [
  { title: "Basic chat", href: "/examples/basic-chat" },
  { title: "Function calling", href: "/examples/function-calling" },
  { title: "File search", href: "/examples/file-search" },
  { title: "All", href: "/examples/all" },
  { title: "Aevo Copy Trader", href: "/aevo-copy-trader" },
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [blobs, setBlobs] = useState<Item[]>([]);

  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        const res = await fetch("/api/blob/list");
        if (!res.ok) return;
        const data = await res.json();
        const items: Item[] = (data.blobs || []).map((b: any) => ({
          title: b.pathname,
          href: `https://i13543ak1qmumggz.public.blob.vercel-storage.com/${b.pathname}`,
        }));
        setBlobs(items);
      } catch {
        // ignore
      }
    };
    fetchBlobs();
  }, []);

  const items = [...staticItems, ...blobs].filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">Project Dashboard</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
        className="mb-6 w-full rounded border px-3 py-2"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProjectCard key={item.title} title={item.title} href={item.href} />
        ))}
      </div>
    </main>
  );
};

export default Home;
