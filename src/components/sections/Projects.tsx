import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Info, X, Cpu, Code2, Rocket } from 'lucide-react';

type ProjectCategory = 'AI/ML' | 'Full Stack' | 'Cyber Security' | 'QA' | 'Geospatial' | 'Other';

interface Project {
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  tech: string[];
  github: string;
  link: string;
  details: {
    architecture: string;
    features: string[];
    stack: string[];
  };
}

const projects: Project[] = [
  {
    title: "Career Compass AI",
    description: "Production-grade career guidance platform with AI-powered skill assessments, personalized learning paths, and an intelligent career assistant. Built with a scalable microservices architecture.",
    image: "/src/assets/career_compass.png",
    category: "AI/ML",
    tech: ["FastAPI", "React", "Docker", "MySQL", "Redis"],
    github: "#",
    link: "#",
    details: {
      architecture: "Microservices-based architecture focused on AI scalability and high-availability data processing.",
      features: [
        "Natural Language Skill Analysis",
        "Personalized Learning Path Generation",
        "Floating GPT-4o Career Assistant",
        "Admin Dashboard with Bulk Analytics"
      ],
      stack: ["Python (FastAPI)", "React 18 + Vite", "Docker Compose", "Redis Caching", "Nginx Load Balancing"]
    }
  },
  {
    title: "AquaVision AI",
    description: "Geospatial groundwater intelligence platform for village-level water security. Fuses satellite data and ground sensors to estimate groundwater levels, generate 3-month forecasts, detect anomalies, and deliver actionable advisories to farmers via a mobile-first portal.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2080&auto=format&fit=crop",
    category: "AI/ML",
    tech: ["FastAPI", "PostGIS", "Redis", "XGBoost", "ST-GNN"],
    github: "#",
    link: "#",
    details: {
      architecture: "Digital Twin per village using spatio-temporal graph neural networks (ST-GNNs) + XGBoost regression. Scheduled geospatial pipelines feed a forecasting & anomaly-detection layer, cached for low-latency dashboard and farmer portal delivery.",
      features: [
        "AI-driven interpolation to fill sensor sparsity gaps (village-level estimates)",
        "3-month groundwater forecasting (Prophet + LSTM models)",
        "Interactive 2D/3D command center (Leaflet + Three.js aquifer visualization)",
        "Anomaly detection for illegal borewell usage / sensor failures (Isolation Forest)",
        "Farmer portal with GPS-based localized crop advisories (Telugu + English, low-bandwidth)",
        "Geospatial stack of environmental covariates (DEM, soil permeability, rainfall lag, LULC, land cover)"
      ],
      stack: [
        "Python (FastAPI)",
        "PostgreSQL + PostGIS",
        "Redis (Caching)",
        "XGBoost Regression",
        "ST-GNN (Spatio-Temporal GNN)",
        "Prophet + LSTM Forecasting",
        "Isolation Forest",
        "Leaflet + GeoServer (WMS/WFS)",
        "Three.js (3D Aquifer Rendering)",
        "Apache Airflow (Pipelines)",
        "Docker"
      ]
    }
  },
  {
    title: "Ruchi Ragam",
    description: "Full-stack SaaS marketplace for authentic Indian food. Features dual-gateway payments (Stripe/Razorpay), AI-driven search, and robust JWT auth. Built with a clean microservices-ready architecture.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop",
    category: "Full Stack",
    tech: ["Node.js", "Express", "Supabase", "TypeScript", "OpenAI"],
    github: "#",
    link: "#",
    details: {
      architecture: "Clean Architecture implementation in Node.js with a monorepo structure and Supabase/Postgres backend.",
      features: [
        "AI-Powered Smart Search",
        "Dual Payment Gateway Integration",
        "Automated Product Descriptions",
        "Real-time Order Tracking & State Management"
      ],
      stack: ["Node.js 20 LTS", "Express.js", "TypeScript", "Supabase (Postgres)", "OpenAI GPT-4o"]
    }
  },
  {
    title: "Sentinal Guard",
    description: "Advanced network security monitoring system with real-time threat detection and automated response protocols. Implements zero-trust architecture principles.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    category: "Cyber Security",
    tech: ["Python", "Suricata", "Elasticsearch", "React"],
    github: "#",
    link: "#",
    details: {
      architecture: "SIEM-inspired architecture utilizing Suricata for IDS/IPS and ELK stack for log orchestration.",
      features: [
        "Real-time Packet Inspection",
        "Anomalous Traffic Detection",
        "Automated Firewall Rule Injection",
        "Security Audit Reporting"
      ],
      stack: ["Python", "Bash", "Suricata", "Elasticsearch", "Kibana", "React"]
    }
  },
  {
    title: "TestFlow Pro",
    description: "Comprehensive automated testing suite for microservices. Features distributed load testing, visual regression, and integrated CI/CD quality gates.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    category: "QA",
    tech: ["Playwright", "Jest", "K6", "GitHub Actions"],
    github: "#",
    link: "#",
    details: {
      architecture: "Modular testing framework designed for scalability and high-concurrency performance validation.",
      features: [
        "Cross-browser Visual Regression",
        "High-load Performance Testing",
        "API Contract Validation",
        "Automated Flaky Test Detection"
      ],
      stack: ["TypeScript", "Playwright", "Jest", "K6", "Docker", "GitHub Actions"]
    }
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All Projects');

  const tabs = ['All Projects', 'AI/ML', 'Full Stack', 'Cyber Security', 'QA'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const filteredCategories = activeTab === 'All Projects' 
    ? Array.from(new Set(projects.map(p => p.category)))
    : [activeTab as ProjectCategory];

  return (
    <section id="projects" className="section-wrap">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="w-full"
      >
        <motion.div variants={item} className="section-header text-center">
          <h2 className="text-4xl font-bold">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            A selection of projects that showcase my ability to solve complex technical problems 
            and deliver beautiful user experiences.
          </p>
        </motion.div>

        {/* 📑 Filter Tabs */}
        <motion.div variants={item} className="filter-tabs-wrapper">
          <div className="tabs-inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredCategories.map((category) => {
              const categoryProjects = projects.filter(p => p.category === category);
              if (categoryProjects.length === 0) return null;

              return (
                <div key={category} className="mb-16 last:mb-0">
                  {activeTab === 'All Projects' && (
                    <motion.div
                      variants={item}
                      className="section-header text-center"
                      style={{ marginBottom: '2.5rem' }}
                    >
                      <h3 className="text-2xl font-bold text-gradient">{category} Projects</h3>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2">
                    {categoryProjects.map((project) => (
                      <motion.div
                        key={project.title}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass project-card hover-lift"
                      >
                        <div className="project-img-wrap">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="project-img"
                          />
                          <div className="absolute top-4 right-4 z-10">
                            <span className="glass-pill text-[10px] py-1 px-3">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        <div className="project-info">
                          <div className="project-text">
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                            <p className="text-[var(--text-secondary)] text-sm mt-4">
                              {project.description}
                            </p>
                          </div>

                          <div className="tech-list flex gap-2 flex-wrap">
                            {project.tech.map(t => (
                              <span key={t} className="tech-pill">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="project-links flex items-center justify-between mt-4">
                            <div className="flex gap-4">
                              <a href={project.github} className="social-icon">
                                <Github size={20} />
                              </a>
                              <a href={project.link} className="social-icon">
                                <ExternalLink size={20} />
                              </a>
                            </div>
                            <button 
                              onClick={() => setSelectedProject(project)}
                              className="flex items-center justify-center gap-2 text-[var(--accent-cyan)] font-bold text-sm bg-transparent border-none cursor-pointer hover:brightness-125"
                              style={{ lineHeight: 1, whiteSpace: 'nowrap' }}
                            >
                              View Details <Info size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={20} />
              </button>

              <div className="modal-section">
                <p className="modal-subtitle">Project Overview</p>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <p className="modal-desc">{selectedProject.description}</p>
              </div>

              <div className="modal-section">
                <p className="modal-subtitle">Architecture & Core Logic</p>
                <div className="detail-item mb-4" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent-cyan)' }}>
                  <Cpu size={18} />
                  {selectedProject.details.architecture}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="modal-section">
                  <p className="modal-subtitle">Key Features</p>
                  <ul className="detail-list" style={{ gridTemplateColumns: '1fr' }}>
                    {selectedProject.details.features.map(f => (
                      <li key={f} className="detail-item">
                        <Rocket size={14} color="var(--accent-cyan)" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <p className="modal-subtitle">Technical Stack</p>
                  <ul className="detail-list" style={{ gridTemplateColumns: '1fr' }}>
                    {selectedProject.details.stack.map(s => (
                      <li key={s} className="detail-item">
                        <Code2 size={14} color="var(--accent-cyan)" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                 <a href={selectedProject.github} className="btn-glass" style={{ padding: '0.75rem 1.5rem' }}>
                   Github Source <Github size={18} />
                 </a>
                 <a href={selectedProject.link} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                   Live Demo <ExternalLink size={18} />
                 </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
