
import React from "react";
import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "Java", "Python", "SQL"]
  },
  {
    title: "Frontend",
    skills: ["React.js", "Tailwind CSS", "Shadcn UI", "Responsive Design"]
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js (Basic)", "REST APIs (Basic)", "Supabase", "Firebase"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Linux", "OpenAI API"]
  }
];

const Skills = () => {
  return (
    <section className="skills section" id="skills">
      <div className="section-heading">
        <span className="section-tag">MY EXPERTISE</span>
        <h2>Technical <span className="gradient-text">Skills</span></h2>
        <p>Technologies and tools I work with.</p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <motion.div
            className="skill-card"
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <h3>{group.title}</h3>

            <div className="skill-list">
              {group.skills.map((skill) => (
                <span className="skill-badge" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
