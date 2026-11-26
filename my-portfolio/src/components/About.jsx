
import React from "react";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const qualities = [
    {
      icon: <Code2 />,
      title: "Technical Team Member",
      description: "Supporting workshops, meetups, and developer events with GDG On Campus."
    },
    {
      icon: <Lightbulb />,
      title: "Frontend Contributor",
      description: "Building reusable, responsive React and Tailwind CSS components at HackBase."
    },
    {
      icon: <Rocket />,
      title: "Hackathon Organizer",
      description: "Organized HackAgra Chapter 1 and coordinated participants, mentors, and judges."
    }
  ];

  return (
    <section className="about section" id="about">
      <div className="section-heading">
        <span className="section-tag">GET TO KNOW ME</span>
        <h2>About <span className="gradient-text">Me</span></h2>
        <p>A little introduction about who I am.</p>
      </div>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3>Turning Ideas Into Reality Through Code.</h3>

          <p>
            I'm Ashish Solanki, currently pursuing an MCA at GLA University.
            I build responsive web interfaces with React.js, TypeScript,
            and Tailwind CSS, and have contributed to frontend development
            at HackBase.
          </p>

          <p>
            I also work with Supabase and Firebase, with foundational
            experience in Node.js and REST APIs. Outside project work, I
            support developer events with GDG On Campus - Sharda University.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Connect
          </a>
        </motion.div>

        <div className="about-cards">
          {qualities.map((item, index) => (
            <motion.div
              className="about-card"
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="about-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
