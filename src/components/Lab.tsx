import { motion } from 'framer-motion'
import { labItems, type LabItem } from '../data/lab'

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

function LabCard({ item }: { item: LabItem }) {
  const href = item.embedUrl || item.instagramUrl
  const wrapperClass = href ? 'lab-item-link' : 'lab-item'

  const inner = (
    <>
      <div className="lab-thumbnail">
        {item.thumbnailUrl ? (
          <img src={item.thumbnailUrl} alt={item.title} loading="lazy" />
        ) : (
          <div className="lab-thumbnail-placeholder">{item.date}</div>
        )}
      </div>
      <div className="lab-meta">
        <span className="lab-title">{item.title}</span>
        {item.description && (
          <span className="lab-desc">{item.description}</span>
        )}
        <span className="lab-date">{item.date}</span>
      </div>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
        variants={itemVariants}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.div className={wrapperClass} variants={itemVariants}>
      {inner}
    </motion.div>
  )
}

export default function Lab() {
  return (
    <section id="lab" className="section">
      <div className="section-header">
        <h2 className="section-badge liquid-glass">Lab / Archive</h2>
      </div>

      <motion.div
        className="lab-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {labItems.map(item => (
          <LabCard key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  )
}
