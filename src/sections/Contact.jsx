import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contacts = [
  {
    id: "01",
    title: "Email",
    value: "pablo03grp@gmail.com",
    href: "mailto:pablo03grp@gmail.com",
    duration: "03:24",
  },
  {
    id: "02",
    title: "GitHub",
    value: "github.com/PabloG03",
    href: "https://github.com/PabloG03",
    duration: "02:51",
  },
  {
    id: "03",
    title: "LinkedIn",
    value: "linkedin.com/in/pablo",
    href: "https://linkedin.com",
    duration: "04:08",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Noise() {
  return <div className="contact-noise" />;
}

function Glow() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.12, 0.22, 0.12],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="contact-glow"
    />
  );
}

function VinylRecord() {
  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      }}
      className="vinyl"
    >
      {/* Disco principal */}
      <div className="vinyl-disc">
        {/* Reflejo */}
        <div className="vinyl-highlight" />

        {/* Surcos */}
        {[260, 240, 220, 200, 180, 160, 140, 120, 100].map((size) => (
          <div
            key={size}
            className="vinyl-groove"
            style={{
              width: size,
              height: size,
            }}
          />
        ))}

        {/* Etiqueta */}
        <div className="vinyl-label">
          <span className="label-small">DEV RECORDS</span>
          <div className="label-center-hole" />
          <span className="label-title">LP · 003</span>
        </div>
      </div>

      {/* Brillo exterior */}
      <div className="vinyl-shadow" />
    </motion.div>
  );
}

function SectionTag() {
  return (
    <motion.div variants={fadeUp} className="contact-tag">
      <span />
      SIDE B — CONTACT
    </motion.div>
  );
}

function Heading() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="contact-heading"
    >
      {["Ready to", "build", "something", "great?"].map((line, index) => (
        <motion.div
          key={line}
          variants={fadeUp}
          className={index === 3 ? "heading-outline" : ""}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Track({ item, index }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="track"
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Glow del hover */}
      <motion.div
        className="track-hover"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Número gigante */}
      <motion.div
        className="track-bg-number"
        variants={{
          rest: { opacity: 0, x: -30 },
          hover: { opacity: 0.07, x: 0 },
        }}
      >
        {item.id}
      </motion.div>

      <div className="track-left">
        <div className="track-number">{item.id}</div>
        <div>
          <div className="track-label">{item.title}</div>
          <div className="track-value">{item.value}</div>
        </div>
      </div>

      <div className="track-right">
        <div className="track-duration">{item.duration}</div>
        <motion.div
          className="track-arrow"
          variants={{
            rest: { x: 0, y: 0, rotate: 0 },
            hover: { x: 8, y: -8, rotate: -45 },
          }}
          transition={{ duration: 0.35 }}
        >
          ↗
        </motion.div>
      </div>

      {/* Barra inferior */}
      <motion.div
        className="track-progress"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section id="contact" ref={ref} className="contact-section">
      {/* Inyección de Estilos CSS */}
      <style>{`
        .contact-section {
          position: relative;
          background-color: #0a0a0a;
          color: #ffffff;
          padding: 8rem 2rem;
          overflow: hidden;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* Efecto de ruido analógico */
        .contact-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* Iluminación ambiental de fondo */
        .contact-glow {
          position: absolute;
          top: 20%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Grid general */
        .contact-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 968px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* Columna Izquierda */
        .contact-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          color: #a3a3a3;
          margin-bottom: 2rem;
        }

        .contact-tag span {
          width: 6px;
          height: 6px;
          background-color: #4f46e5;
          border-radius: 50%;
        }

        .contact-heading {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1.1;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .heading-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }

        .contact-description {
          color: #a3a3a3;
          font-size: 1.15rem;
          line-height: 1.6;
          max-width: 480px;
          margin-bottom: 3rem;
        }

        .contact-status {
          font-size: 0.95rem;
          color: #d4d4d4;
          line-height: 1.5;
        }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          margin-right: 0.5rem;
          box-shadow: 0 0 12px #22c55e;
        }

        /* Estilos del Vinilo */
        .vinyl-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .vinyl {
          position: relative;
          width: 300px;
          height: 300px;
        }

        .vinyl-disc {
          position: relative;
          width: 100%;
          height: 100%;
          background: #111111;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        .vinyl-groove {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 50%;
        }

        .vinyl-highlight {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 75%,
            transparent 100%
          );
          border-radius: 50%;
        }

        .vinyl-label {
          position: absolute;
          width: 90px;
          height: 90px;
          background-color: #4f46e5;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          text-align: center;
        }

        .label-small {
          font-size: 0.45rem;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }

        .label-title {
          font-size: 0.55rem;
          margin-top: 2px;
        }

        .label-center-hole {
          width: 12px;
          height: 12px;
          background-color: #0a0a0a;
          border-radius: 50%;
          margin: 4px 0;
        }

        /* Lista de Pistas / Enlaces de Contacto */
        .tracks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .track {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
        }

        .track-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(79, 70, 229, 0.1), transparent);
          transform-origin: left;
          z-index: 0;
        }

        .track-bg-number {
          position: absolute;
          right: 15%;
          font-size: 6rem;
          font-weight: 900;
          color: #fff;
          pointer-events: none;
          z-index: 0;
        }

        .track-left, .track-right {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        .track-left {
          gap: 1.5rem;
        }

        .track-number {
          font-size: 0.9rem;
          color: #6366f1;
          font-family: monospace;
        }

        .track-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #a3a3a3;
          letter-spacing: 0.05em;
        }

        .track-value {
          font-size: 1.1rem;
          font-weight: 500;
          margin-top: 2px;
        }

        .track-right {
          gap: 1rem;
        }

        .track-duration {
          font-family: monospace;
          color: #737373;
        }

        .track-arrow {
          font-size: 1.2rem;
          color: #6366f1;
        }

        .track-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #6366f1;
          transform-origin: left;
        }
      `}</style>

      <Noise />
      <Glow />

      <div className="contact-grid">
        {/* Columna izquierda */}
        <motion.div
          className="contact-left"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionTag />
          <Heading />

          <motion.p variants={fadeUp} className="contact-description">
            Whether it's a new idea, an ambitious product, or simply a
            conversation about technology, I'm always open to creating digital
            experiences that people genuinely enjoy using.
          </motion.p>

          <motion.div variants={fadeUp} className="contact-status">
            <span className="status-dot" />
            Currently available
            <br />
            for freelance & full-time work.
          </motion.div>
        </motion.div>

        {/* Columna derecha */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="vinyl-wrapper">
            <VinylRecord />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="tracks"
          >
            {contacts.map((item, index) => (
              <Track key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}