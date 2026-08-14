import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { works, type Work } from '../data/works'

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function WorkItem({ work }: { work: Work }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="work-item"
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <span className="work-index">{work.index}</span>

      <div className="work-body">
        <h3 className="work-title">{work.title}</h3>
        {work.subtitle && (
          <p className="work-subtitle">{work.subtitle}</p>
        )}
        <p className="work-description">{work.description}</p>

        {/* Narrative — revealed on hover */}
        <AnimatePresence>
          {hovered && work.narrative && (
            <motion.p
              className="work-narrative"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {work.narrative}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="work-tags">
          {work.tags.map(tag => (
            <span key={tag} className="work-tag">{tag}</span>
          ))}
        </div>

        {work.link && (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="work-link-btn liquid-glass-strong"
          >
            View Project ↗
          </a>
        )}
      </div>

      {work.mediaUrl ? (
        <div className="work-media">
          {work.mediaType === 'video' ? (
            <video src={work.mediaUrl} muted loop playsInline preload="metadata" />
          ) : (
            <img src={work.mediaUrl} alt={work.title} loading="lazy" />
          )}
        </div>
      ) : (
        <span className="work-year">{work.year}</span>
      )}
    </motion.article>
  )
}

export default function Works() {
  return (
    <section id="works" className="section">
      <div className="section-header">
        <h2 className="section-badge liquid-glass">Selected Works</h2>
      </div>

      <motion.div
        className="works-list"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {works.map(work => (
          <WorkItem key={work.id} work={work} />
        ))}
      </motion.div>
    </section>
  )
}
