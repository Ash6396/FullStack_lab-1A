
import React from "react";
import { Code2, Globe, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#home" className="logo">
          Ashish<span className="accent">.</span>
        </a>

        <p>
          Designed & Built by Ashish Solanki
        </p>

        <div className="footer-socials">
          <a
            href="https://github.com/Ash6396"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Code2 />
          </a>

          <a
            href="https://linkedin.com/in/ashish-solanki-514941271"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Globe />
          </a>

          <a href="#home" aria-label="Back to top">
            <ArrowUp />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ashish Solanki. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
