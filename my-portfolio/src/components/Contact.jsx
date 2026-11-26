
import React from "react";
import { motion } from "framer-motion";
import { Mail, Code2, Globe, Phone, Send } from "lucide-react";

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <div className="section-heading">
        <span className="section-tag">GET IN TOUCH</span>
        <h2>Let's Work <span className="gradient-text">Together</span></h2>
        <p>Have an idea or opportunity? Let's connect.</p>
      </div>

      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="contact-info">
          <h3>Let's start a conversation!</h3>

          <p>
            I'm always interested in discussing new projects,
            creative ideas and opportunities to grow.
          </p>

          <a href="mailto:ashishss741@gmail.com" className="contact-link">
            <Mail />
            <span>ashishss741@gmail.com</span>
          </a>

          <a href="tel:+916397061171" className="contact-link">
            <Phone />
            <span>+91 63970 61171</span>
          </a>

          <a
            href="https://github.com/Ash6396"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <Code2 />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://linkedin.com/in/ashish-solanki-514941271"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <Globe />
            <span>LinkedIn Profile</span>
          </a>
        </div>

        <div className="contact-message">
          <div className="contact-decoration">✦</div>
          <h3>Have a project in mind?</h3>
          <p>Let's turn your idea into something amazing.</p>

          <a
            href="mailto:ashishss741@gmail.com?subject=Project%20Enquiry"
            className="btn btn-primary"
          >
            Send Me an Email <Send size={17} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
