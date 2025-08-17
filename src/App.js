import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    education: false,
    skills: false,
    experience: false,
    projects: false,
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const Section = ({ id, title, content, fontSize = "16px", pageBreak = false }) => {
    const isOpen = openSections[id];
    return (
      <>
        <section aria-labelledby={id} style={{ marginTop: 10, paddingTop: 10 }}>
          <h2 id={id} className="section">
            <button
              className="section-btn"
              onClick={() => toggleSection(id)}
              aria-expanded={isOpen}
              aria-controls={`${id}-content`}
            >
              <span>{title}</span>
              <span
                aria-hidden
                className={`arrow-icon ${isOpen ? "open" : ""}`}
                style={{ marginLeft: 10, display: "inline-block" }}
              >
                ▸
              </span>
            </button>
          </h2>

          <div
            id={`${id}-content`}
            className={`collapsible-content ${isOpen ? "open" : ""}`}
            aria-hidden={!isOpen}
          >
            <div className="content-inner" style={{ fontSize }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          </div>
        </section>

        {pageBreak && <div style={{ pageBreakAfter: "always" }}></div>}

        <hr
          style={{
            margin: "8px 0",
            border: "none",
            borderTop: "2px solid #ddd",
            opacity: 0.3,
          }}
        />
      </>
    );
  };

  return (
    <div className={`app-root ${theme} ${sidebarOpen ? "sidebar-open" : ""}`}>
      <style>{`
        * { box-sizing: border-box; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace !important; }
        html, body, #root { height: 100%; margin: 0; }
        body { font-size: 16px; line-height: 1.6; color: #111; }
        .app-root { height: 100vh; background: #fff; color: #111; display: flex; flex-direction: column; }
        .wrap { display: flex; flex-direction: row; height: 100%; }
        .sidebar {
          background: #fefbf5ff;
          color: #111;
          padding: 10px 12px;
          border-bottom: 1px solid #efefef;
        }
        .sidebar nav {
          display: flex;
          gap: 14px;
        }
        .sidebar a {
          color: inherit;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s ease;
        }
        .sidebar a:hover { color: #19a84b; }
        @media (min-width: 721px) {
          .wrap { flex-direction: row; }
          .sidebar {
            width: 110px;
            padding: 20px 12px;
            border-right: 1px solid #efefef;
            border-bottom: none;
            background: #fefbf5;
            flex-shrink: 0;
          }
          .sidebar nav {
            flex-direction: column;
          }
          .content {
            flex: 1;
            padding: 28px 36px;
            background: #fff;
            color: #111;
            overflow: auto;
          }
        }
        @media (max-width: 720px) {
          .wrap { flex-direction: column; }
          .sidebar {
            width: 100%;
            height: 60px;
            border-right: none;
            border-bottom: 1px solid #efefef;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 10px;
          }
          .sidebar nav {
            display: flex;
            flex-direction: row;
            gap: 16px;
          }
          .sidebar a {
            font-size: 14px;
            white-space: nowrap;
          }
          .content {
            flex: 1;
            padding: 16px;
            overflow: auto;
          }
        }
        .top-row { display: flex; align-items: center; gap: 18px; }
        .name-badge {
          background: #bff5c1;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 20px;
        }
        .section { font-size: 18px; margin-top: 0; font-weight: 800; }
        .section-btn {
          background: none; border: 0; padding: 8px 0;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 20px; font-weight: 800; cursor: pointer;
          color: inherit; transition: color 220ms ease, transform 220ms ease; border-radius: 4px;
        }
        .section-btn:hover { color: #19a84b; transform: translateX(4px); }
        .section-btn:active { transform: translateX(4px) scale(0.98); }
        .arrow-icon { transition: transform 800ms cubic-bezier(.2,.8,.2,1), color 800ms ease; transform-origin: center; color: inherit; }
        .arrow-icon.open { transform: rotate(90deg) scale(1.1); color: #19a84b; }
        .collapsible-content { max-height: 0; overflow: hidden; opacity: 0; padding-top: 0; padding-bottom: 0;
          transition: max-height 900ms cubic-bezier(.22,.9,.3,1), opacity 700ms ease, padding 700ms ease; }
        .collapsible-content.open { max-height: 1000px; opacity: 1; padding-top: 8px; padding-bottom: 8px; }
        .content-inner { opacity: 0; transform: translateY(-10px); transition: opacity 700ms ease, transform 700ms ease; }
        .collapsible-content.open .content-inner { opacity: 1; transform: translateY(0); }
        .app-root.terminal { background: #161616ff; color: #bfffbf; }
        .app-root.terminal .sidebar { background: #1f2022ff; color: #9fe9a1; border-right-color: #050b0f; }
        .app-root.terminal .sidebar a { color: #9fe9a1; }
        .app-root.terminal .sidebar a:hover { color: #6fff97; }
        .app-root.terminal .content { background: #121314ff; color: #bfffbf; }
        .app-root.terminal .name-badge { background: #00ff77; color: #000; }

        /* Markdown list styling */
        .content-inner ul {
          list-style-type: disc; /* solid dot bullets */
          padding-left: 20px; /* indent bullets */
        }
        .content-inner li {
          margin-bottom: 4px; /* space between items */
        }

        /* Markdown horizontal rule style */
        .content-inner hr {
          border: none;
          border-top: 2px solid #ccc; /* thin line */
          margin: 16px 0; /* space above & below */
          opacity: 0.4; /* lighter appearance */
        }
      `}</style>

      <div className="wrap">
        <aside className="sidebar">
          <nav>
            <a href="/Saad-Resume.pdf" target="_blank" rel="noreferrer">resume</a>
            <a href="https://www.linkedin.com/in/saad-shaikh-69a6a630b/" target="_blank" rel="noreferrer">linkedin</a>
            <a href="https://github.com/saaaad8" target="_blank" rel="noreferrer">github</a>
          </nav>
        </aside>

        <main className="content">
          <div className="top-row">
            <div className="name-badge">Mohammad Saad Shaikh</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ fontSize: 13 }}>Theme</label>
              <button
                onClick={() => setTheme((t) => (t === "light" ? "terminal" : "light"))}
                style={{
                  padding: "6px 10px", borderRadius: 8, cursor: "pointer",
                  background: theme === "light" ? "#f5f5f5" : "#071012",
                  color: theme === "light" ? "#111" : "#bfffbf",
                  border: theme === "light" ? "2px solid #ddd" : "2px solid #050b0f",
                  transition: "background 320ms ease, color 320ms ease, transform 420ms ease",
                }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? "Light" : "Terminal"}
              </button>
            </div>
          </div>

          <section id="resume" style={{ marginTop: 10, borderTop: "1px solid #ddd", paddingTop: 10 }}>
            <h2 className="section">👋 About Me</h2>
            <div className="content-inner" style={{ opacity: 1, transform: "none", transition: "none" }}>
              <p>
                I'm a DevOps Engineer with hands-on experience in AWS, Azure, CI/CD, and Kubernetes.
              </p>
              <p>
                Skilled in deploying scalable apps with modern DevOps tools and eager to grow in cloud-native environments.
              </p>
            </div>
          </section>

          <hr style={{ margin: "8px 0", border: "none", borderTop: "2px solid #ddd", opacity: 0.3 }} />

          <Section
            id="experience"
            title="💼 Experience"
            fontSize="15px"
            pageBreak={true}
            content={`
**DevOps Intern — 40 Bears Tech Corp**  
_Aug 2024 – Present | Pune, Maharashtra_
 
- Built and automated CI/CD pipelines for Laravel applications.
- Managed Cloudflare DNS and reverse proxy setups.
- Created optimized Docker images for Laravel, Node.js, and microservices.
- Configured Kubernetes namespaces, ConfigMaps, and Secrets.
- Deployed multiple production-grade Laravel applications.

`}
          />

          <Section
            id="education"
            title="🎓 Education"
            fontSize="16px"
            content={`
**Savitribai Phule Pune University, Pune**  
BBA (Computer Applications) — CGPA 8.49  
_Sep 2022 – June 2025_
`}
          />

          <Section
            id="skills"
            title="🛠 Technical Skills"
            fontSize="15px"
            content={`
**Tools:** Linux, Docker, Kubernetes, Terraform, Ansible, Scripting, Jenkins, GitHub Actions, Azure, AWS
`}
          />

          <Section
            id="projects"
            title="📂 Projects"
            fontSize="15px"
            content={`
**Cloud CI/CD Pipeline – Node.js Web App**  
_Tools: GitHub, Jenkins, Docker, AWS EC2, Amazon ECR_

- Built a CI/CD pipeline for Node.js on AWS EC2 using Jenkins & Docker.
- Integrated GitHub webhooks for automated builds & deployments.
- Pushed images to ECR and deployed on EC2.

---

**Azure CI/CD Pipeline – Microservices App**  
_Tools: Azure DevOps, ACR, Docker, AKS_

- Developed CI/CD with Azure Repos & Pipelines for microservices.
- Containerized services, pushed to ACR, deployed to AKS.
- Configured autoscaling & updates via custom Kubernetes scripts.
`}
          />
        </main>
      </div>
    </div>
  );
}
