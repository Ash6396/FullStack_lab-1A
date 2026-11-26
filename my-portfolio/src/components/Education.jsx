
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "GLA University",
    duration: "2026 – Present",
    location: "Mathura, Uttar Pradesh",
    description:
      "Currently pursuing postgraduate studies in computer applications."
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Anand Engineering College",
    duration: "2023 – 2026",
    location: "Agra, Uttar Pradesh",
    description:
      "Undergraduate studies in computer applications."
  }
];

const Education = () => {
  return (
    <section className="education section" id="education">
      <div className="section-heading">
        <span className="section-tag">MY JOURNEY</span>
        <h2>Education & <span className="gradient-text">Learning</span></h2>
        <p>My academic background and educational journey.</p>
      </div>

      <div className="education-timeline">
        {education.map((item, index) => (
          <motion.div
            className="education-card"
            key={item.degree}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="education-icon">
              <GraduationCap size={25} />
            </div>

            <div className="education-info">
              <span className="education-date">{item.duration}</span>
              <h3>{item.degree}</h3>
              <h4>{item.institution}</h4>
              <p className="education-location">{item.location}</p>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
