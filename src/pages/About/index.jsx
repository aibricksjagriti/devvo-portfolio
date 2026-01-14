import React from "react";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <div className="w-full bg-gray-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
        >
          About Devvo
        </motion.h1>
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
          We are a full-stack technology team building scalable, secure, and
          high-performance digital products — from web platforms and mobile apps
          to cloud-hosted AI systems.
        </p>
      </section>

      {/* Overview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🚀 Our Development Team
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our expertise covers the complete product lifecycle — design,
              development, deployment, and scaling.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We don’t just write code. We build production-ready systems that
              businesses can rely on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
          >
            <ul className="space-y-4 text-gray-300">
              <li>✔ End-to-end product engineering</li>
              <li>✔ Secure & scalable architecture</li>
              <li>✔ Cloud & AI-ready systems</li>
              <li>✔ Business-focused development</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition"
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  {item.points.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Why Clients Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <p className="text-lg font-semibold">{reason}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xl text-gray-300 max-w-3xl mx-auto">
          We don’t just build software — we build scalable digital products that
          grow with your business.
        </p>
      </section>
    </div>
  );
}

const services = [
  {
    title: "🧠 Backend Engineering",
    desc: "Secure and scalable backend systems powering modern applications.",
    points: [
      "Java, Spring Boot, Node.js, Python",
      "REST & API-based architectures",
      "Authentication & authorization",
      "Payments, analytics & real-time features",
    ],
  },
  {
    title: "🎨 Frontend Engineering",
    desc: "Fast, responsive, and conversion-focused web interfaces.",
    points: [
      "React.js & Next.js",
      "Dashboards & SaaS platforms",
      "SEO-optimized web apps",
      "Mobile-friendly UI",
    ],
  },
  {
    title: "📱 Mobile App Development",
    desc: "Cross-platform mobile apps for Android & iOS.",
    points: [
      "Flutter development",
      "Secure API integrations",
      "Push notifications",
      "App Store & Play Store deployment",
    ],
  },
  {
    title: "🗄️ Databases & Storage",
    desc: "High-availability data architecture.",
    points: [
      "MySQL, PostgreSQL, SQLite",
      "Firestore & Firebase",
      "Real-time syncing",
      "Cloud storage",
    ],
  },
  {
    title: "☁️ Cloud & DevOps",
    desc: "Production-grade cloud infrastructure.",
    points: [
      "AWS, GCP, Azure",
      "CI/CD pipelines",
      "Auto-scaling & monitoring",
      "Secure deployments",
    ],
  },
  {
    title: "🤖 AI & GenAI",
    desc: "Real-world AI systems integrated into products.",
    points: [
      "AI chatbots",
      "Recommendation engines",
      "FastAPI & Python",
      "AI-powered services",
    ],
  },
];

const reasons = [
  "Full-stack expertise under one team",
  "Production-grade architecture",
  "AI-driven solutions",
  "Cloud-ready deployment",
  "Business-focused development",
];
