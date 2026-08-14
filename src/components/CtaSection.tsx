import { motion } from 'framer-motion'
import { siteConfig } from '../config/site'

export default function CtaSection() {
  const contactHref = siteConfig.email
    ? `mailto:${siteConfig.email}`
    : siteConfig.links.instagram || siteConfig.links.twitter || siteConfig.links.github || '#about'
  const contactIsExternal = contactHref.startsWith('http') || contactHref.startsWith('mailto')

  return (
    <section className="cta-section">
      <motion.h2
        className="cta-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {siteConfig.ctaHeading}
      </motion.h2>

      <motion.p
        className="cta-sub"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {siteConfig.availableMessage}
      </motion.p>

      <motion.div
        className="cta-actions"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href={contactHref}
          className="cta-btn-primary liquid-glass-strong"
          target={contactIsExternal ? '_blank' : undefined}
          rel={contactIsExternal ? 'noopener noreferrer' : undefined}
        >
          Contact ↗
        </a>
        <a href="#works" className="cta-btn-secondary">
          View Works
        </a>
      </motion.div>
    </section>
  )
}
