import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Reveal({ delay = 0, className = '', children, as = 'div', ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
