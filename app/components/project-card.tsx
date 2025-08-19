"use client";

import React from "react";

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
  <div className="cursor-pointer rounded border p-4">
    <a
      href={href}
      className="flex flex-col focus:outline-none"
      aria-label={title}
    >
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="mb-4 flex flex-wrap gap-1">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex justify-between text-sm text-gray-500">
        <span className="capitalize">{status}</span>
        <span>{updatedAt}</span>
      </div>
    </a>
    {dataHref && (
      <button
        onClick={() => window.open(dataHref, "_blank")}
        className="w-full rounded bg-blue-600 py-1 text-sm text-white"
      >
        View Data
      </button>
    )}
  </div>
);

export default ProjectCard;
