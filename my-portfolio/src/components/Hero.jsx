
import React from "react";
import { Code2, Globe, ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import profile from "../assets/ashish-profile.jpeg";

const Hero = () => {
  return (
    <section className="hero section" id="home">
      <div className="hero-content">
        <motion.p
          className="hero-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hello, I'm Ashish Solanki
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Building Digital
          <br />
          Experiences That
          <br />
          <span className="gradient-text">Make an Impact.</span>
        </motion.h1>

        <p className="hero-description">
          I'm an MCA student and frontend developer building responsive
          web experiences with React, TypeScript, and modern UI tools.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            Explore My Work <ArrowUpRight size={18} />
          </a>

          <a href="/resume.pdf" className="btn btn-outline" download>
            Download Resume <Download size={18} />
          </a>
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/Ash6396"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 />
          </a>

          <a
            href="https://linkedin.com/in/ashish-solanki-514941271"
            target="_blank"
            rel="noreferrer"
          >
            <Globe />
          </a>
        </div>
      </div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="image-glow"></div>

        <img src={profile} alt="Ashish Solanki" />

        <div className="floating-card">
          <span>💻</span>
          <div>
            <strong>Developer</strong>
            <small>Always Learning</small>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
