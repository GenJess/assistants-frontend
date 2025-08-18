import React from "react";

type ProjectCardProps = {
  title: string;
  href: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, href }) => (
  <a
    href={href}
    className="block rounded-lg border p-6 shadow-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <h2 className="text-lg font-semibold">{title}</h2>
  </a>
);

export default ProjectCard;
