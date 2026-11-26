import React from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck, BriefcaseBusiness, Users } from "lucide-react";

const experiences = [
  {
    role: "Member of Technical Team",
    organization: "Google Developer Groups (GDG) On Campus - Sharda University",
    duration: "Nov 2025 – Present",
    location: "Agra, Uttar Pradesh",
    responsibilities: [
      "Supported the technical execution of workshops, meetups, and developer events.",
      "Assisted with setup and troubleshooting during live sessions.",
      "Guided participants during hands-on coding sessions and demos."
    ]
  },
  {
    role: "Frontend Developer (Contributor)",
    organization: "HackBase",
    duration: "Nov 2024 – Nov 2026",
    location: "",
    responsibilities: [
      "Contributed to frontend development and UI/UX improvements.",
      "Built reusable, responsive components using React.js and Tailwind CSS.",
      "Collaborated on feature updates and bug fixes."
    ]
  }
];

const highlights = [
  {
    icon: <Users />,
    title: "HackAgra Chapter 1",
    subtitle: "Hackathon Organizer",
    details:
      "Organized a city-level hackathon, coordinating participant onboarding, scheduling, mentors, and judges."
  },
  {
    icon: <Award />,
    title: "Achievements",
    subtitle: "AxisHackSprint - National Level",
    details:
      "Qualified for the grand finale and participated in multiple hackathons and collaborative coding events."
  },
  {
    icon: <BadgeCheck />,
    title: "Certifications",
    subtitle: "Prompt Engineering 101 · AWS Solutions Architecture",
    details:
      "Prompt Engineering 101 - Google Student Ambassador Program; AWS Solutions Architecture - Forage."
  }
];

const Experience = () => {
  return (
    <section className="experience section" id="experience">
      <div className="section-heading">
        <span className="section-tag">WHERE I'VE CONTRIBUTED</span>
        <h2>Experience & <span className="gradient-text">Highlights</span></h2>
        <p>My developer community, frontend, and leadership experience.</p>
      </div>

      <div className="education-timeline">
        {experiences.map((item, index) => (
          <motion.div
            className="education-card experience-card"
            key={item.organization}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="education-icon">
              <BriefcaseBusiness size={25} />
            </div>

            <div className="education-info">
              <span className="education-date">{item.duration}</span>
              <h3>{item.role}</h3>
              <h4>{item.organization}</h4>
              {item.location && <p>{item.location}</p>}
              <ul className="experience-duties">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="skills-grid experience-highlights">
        {highlights.map((item, index) => (
          <motion.div
            className="skill-card experience-highlight"
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
          >
            <div className="about-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <h4>{item.subtitle}</h4>
            <p>{item.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
