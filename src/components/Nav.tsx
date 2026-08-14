import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../config/site'

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'Lab', href: '#lab' },
  { label: 'About', href: '#about' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const ctaHref = siteConfig.email
    ? `mailto:${siteConfig.email}`
    : siteConfig.links.instagram || siteConfig.links.twitter || siteConfig.links.github || '#about'
  const ctaIsExternal = ctaHref.startsWith('http') || ctaHref.startsWith('mailto')

  return (
    <>
      <motion.nav
        className="nav"
        data-scrolled={scrolled}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#" className="nav-logo">{siteConfig.name}</a>

        {/* Desktop: centered liquid-glass pill */}
        <div className="nav-pill liquid-glass">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link${activeSection === link.href.slice(1) ? ' nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop: CTA button */}
        <a
          href={ctaHref}
          className="nav-cta"
          target={ctaIsExternal ? '_blank' : undefined}
          rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
        >
          Contact ↗
        </a>

        {/* Mobile: hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`nav-hamburger-line${menuOpen ? ' nav-hamburger-open' : ''}`} />
          <span className={`nav-hamburger-line${menuOpen ? ' nav-hamburger-open' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="nav-overlay-content">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="nav-overlay-link"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={ctaHref}
                className="nav-overlay-cta liquid-glass-strong"
                target={ctaIsExternal ? '_blank' : undefined}
                rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Contact ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
