import { motion } from 'framer-motion'
import { siteConfig } from '../config/site'
import BlurText from './BlurText'

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 },
  },
}

export default function Hero() {
  return (
    <section className="hero">
      {/* Top-right meta */}
      <motion.div
        className="hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="hero-meta-label">{siteConfig.location}</span>
        <motion.div className="hero-meta-dot" variants={dotVariants} initial="hidden" animate="visible" />
      </motion.div>

      {/* Main content */}
      <div className="hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge liquid-glass"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-badge-dot" />
          {siteConfig.tagline}
        </motion.div>

        {/* BlurText title */}
        <BlurText
          text={siteConfig.name}
          as="h1"
          className="hero-title"
          delay={120}
        />

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {siteConfig.heroDescription}
        </motion.p>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="hero-scroll-line" />
          <span className="hero-scroll-label">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
