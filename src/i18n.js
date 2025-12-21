import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navHome: "Home",
      navAiBricks: "AiBricks",
      navProCounsel: "ProCounsel",
      navTheMindSoul: "TheMindSoul",
      langSwitch: "Español",
      homeTitle: "Building Tomorrow's Technology Today",
      homeSubtitle:
        "We are a leading software innovation company crafting intelligent solutions that empower businesses and transform industries worldwide.",
      homeDescription:
        "From AI-powered real estate platforms to career guidance systems and mental wellness applications, we deliver cutting-edge software products that solve real-world challenges. Partner with us to accelerate your digital transformation journey.",
      homeScroll: "Scroll to explore our solutions",
      productsTitle: "Our Product Suite",
      productsSubtitle:
        "Innovative solutions designed to transform your business operations and drive measurable results across multiple industries.",
      whyChooseUs: "Why Choose Us",
      whyChooseUsSubtitle:
        "We combine technical excellence with business insight to deliver solutions that make a real impact.",
      innovationIcon: "🚀",
      innovationTitle: "Innovation First",
      innovationDescription:
        "Cutting-edge technology and creative solutions that push boundaries and set new standards.",
      qualityIcon: "⭐",
      qualityTitle: "Premium Quality",
      qualityDescription:
        "Rigorous testing and attention to detail ensure flawless performance and reliability.",
      supportIcon: "🤝",
      supportTitle: "24/7 Support",
      supportDescription:
        "Dedicated team always ready to assist you with any questions or technical challenges.",
      securityIcon: "🔒",
      securityTitle: "Enterprise Security",
      securityDescription:
        "Bank-level encryption and compliance with international security standards.",
      ctaTitle: "Ready to Transform Your Business?",
      ctaSubtitle:
        "Join hundreds of companies already leveraging our innovative software solutions.",
      ctaButton1: "Get Started Today",
      ctaButton2: "View Demo",
      aiBricksTitle: "aiBricks: The Future of Real Estate",
      aiBricksIntro:
        "From digital blueprints to virtual skylines, we are revolutionizing property tech.",
      aiBricksFeature1Title: "AI-Powered Real Estate, Simplified",
      aiBricksFeature1Desc:
        "AIBricks is a next-generation real estate platform that uses artificial intelligence to simplify online property buying. We analyze user preferences, market data, and behavioral insights to deliver highly personalized property recommendations — making every property decision smarter, faster, and more transparent. By combining advanced technology with real estate expertise, AIBricks bridges the gap between buyers and the right opportunities. Our platform continuously learns and adapts, ensuring that recommendations evolve with changing needs and market conditions, helping customers make confident, future-ready property choices.",
      aiBricksFeature2Title: "Intelligent Property Matching",
      aiBricksFeature2Desc:
        "At AIBricks, our AI engine goes beyond basic filters. It understands buyer intent by analyzing budget, location preference, property type, lifestyle needs, and long-term goals. This allows us to recommend properties that truly align with what customers are looking for — saving time, reducing confusion, and improving decision accuracy. Our intelligent system continuously learns from user interactions and market movements, refining its recommendations over time. As a result, buyers receive increasingly relevant options, ensuring a personalized property journey that feels intuitive, efficient, and aligned with their evolving needs.",
      aiBricksFinal: "Reach for the Sky.",
      proCounselTitle:
        "ProCounsel – Your Personal Admission Expert: The Student & Parent Guide",
      proCounselIntro: "",
      proCounselDesc1: "It starts with a single step...",
      proCounselDesc2: "...through challenges and learning...",
      proCounselDesc3: "...towards a bright future.",
      proCounselFinal: "Graduate to Your Potential.",
      proCounselStart: "The Journey",
      proCounselEnd: "Success",
      mindSoulTitle: "theMindSoul: Digital Wellness",
      mindSoulDesc:
        "Compassionate, accessible, and intelligent tools for mental and emotional well-being. We provide a safe space to grow.",
      mindSoulFeature1: "Personalized Journeys",
      mindSoulFeature2: "Interactive Activities",
      mindSoulFeature3: "Professional Support",
      footerRights: "© 2025 Devvo. All rights reserved.",
      footerPrivacy: "Privacy Policy",
      footerTerms: "Terms of Service",
    },
  },
  es: {
    translation: {
      navHome: "Inicio",
      navAiBricks: "aiBricks",
      navProCounsel: "proCounsel",
      navTheMindSoul: "theMindSoul",
      langSwitch: "English",
      homeTitle: "Construyendo la Tecnología del Mañana Hoy",
      homeSubtitle:
        "Somos una empresa líder en innovación de software que crea soluciones inteligentes que empoderan a las empresas y transforman industrias en todo el mundo.",
      homeDescription:
        "Desde plataformas inmobiliarias impulsadas por IA hasta sistemas de orientación profesional y aplicaciones de bienestar mental, ofrecemos productos de software de vanguardia que resuelven desafíos del mundo real. Asóciese con nosotros para acelerar su viaje de transformación digital.",
      homeScroll: "Desplácese para explorar nuestras soluciones",
      productsTitle: "Nuestro Conjunto de Productos",
      productsSubtitle:
        "Soluciones innovadoras diseñadas para transformar sus operaciones comerciales e impulsar resultados medibles en múltiples industrias.",
      whyChooseUs: "Por Qué Elegirnos",
      whyChooseUsSubtitle:
        "Combinamos excelencia técnica con perspicacia empresarial para ofrecer soluciones que generan un impacto real.",
      innovationIcon: "🚀",
      innovationTitle: "Innovación Primero",
      innovationDescription:
        "Tecnología de vanguardia y soluciones creativas que empujan límites y establecen nuevos estándares.",
      qualityIcon: "⭐",
      qualityTitle: "Calidad Premium",
      qualityDescription:
        "Pruebas rigurosas y atención al detalle garantizan un rendimiento y confiabilidad impecables.",
      supportIcon: "🤝",
      supportTitle: "Soporte 24/7",
      supportDescription:
        "Equipo dedicado siempre listo para ayudarlo con cualquier pregunta o desafío técnico.",
      securityIcon: "🔒",
      securityTitle: "Seguridad Empresarial",
      securityDescription:
        "Cifrado de nivel bancario y cumplimiento de estándares de seguridad internacionales.",
      ctaTitle: "¿Listo para Transformar su Negocio?",
      ctaSubtitle:
        "Únase a cientos de empresas que ya aprovechan nuestras soluciones de software innovadoras.",
      ctaButton1: "Comience Hoy",
      ctaButton2: "Ver Demostración",
      aiBricksTitle: "aiBricks: El Futuro de los Bienes Raíces",
      aiBricksIntro:
        "Desde planos digitales hasta horizontes virtuales, estamos revolucionando la tecnología inmobiliaria.",
      aiBricksFeature1Title: "Construir al Desplazar",
      aiBricksFeature1Desc:
        "Nuestra plataforma permite la visualización dinámica en tiempo real de proyectos arquitectónicos. Desplácese hacia abajo para verlo en acción.",
      aiBricksFeature2Title: "Perspectivas con IA",
      aiBricksFeature2Desc:
        "Aproveche el aprendizaje automático para predecir tendencias del mercado y optimizar la construcción.",
      aiBricksFinal: "Alcanza el Cielo.",
      proCounselTitle: "proCounsel: Tu Camino, Iluminado",
      proCounselIntro:
        "Navegar una carrera profesional es complejo. Nosotros proporcionamos el mapa.",
      proCounselDesc1: "Comienza con un solo paso...",
      proCounselDesc2: "...a través de desafíos y aprendizaje...",
      proCounselDesc3: "...hacia un futuro brillante.",
      proCounselFinal: "Gradúate a Tu Potencial.",
      proCounselStart: "El Viaje",
      proCounselEnd: "Éxito",
      mindSoulTitle: "theMindSoul: Bienestar Digital",
      mindSoulDesc:
        "Herramientas compasivas, accesibles e inteligentes para el bienestar mental y emocional. Brindamos un espacio seguro para crecer.",
      mindSoulFeature1: "Viajes Personalizados",
      mindSoulFeature2: "Actividades Interactivas",
      mindSoulFeature3: "Soporte Profesional",
      footerRights: "© 2025 Devvo. Todos los derechos reservados.",
      footerPrivacy: "Política de Privacidad",
      footerTerms: "Términos de Servicio",
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
