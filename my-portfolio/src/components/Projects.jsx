
import React from "react";
import { motion } from "framer-motion";
const projects = [
  {
    title: "Trustify",
    category: "Web3 Platform",
    description:
      "Built a Web3-enabled platform for tracking NGO donations and fund utilization, with milestone-based tracking and Ethereum smart contracts.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Ethereum"],
    number: "01"
  },
  {
    title: "RBAC Configurator Tool",
    category: "Full Stack Development",
    description:
      "Developed a role-based access control system with Supabase authentication and deployed it on Vercel.",
    tech: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    number: "02"
  },
  {
    title: "Anime Streaming Website",
    category: "Frontend Development",
    description:
      "Built a responsive streaming interface with reusable components and modern layouts.",
    tech: ["React.js", "Tailwind CSS"],
    number: "03"
  },
  {
    title: "Food Ordering Website",
    category: "Frontend Development",
    description:
      "Developed a responsive food ordering interface with listings, a cart, and an order flow.",
    tech: ["React.js", "Tailwind CSS"],
    number: "04"
  }
];

const Projects = () => {
  return (
    <section className="projects section" id="projects">
      <div className="section-heading">
        <span className="section-tag">MY PORTFOLIO</span>
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p>Some things I've built with passion and code.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={project.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="project-top">
              <span className="project-number">{project.number}</span>
              <span className="project-category">{project.category}</span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="project-tech">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
