'use client'

import { AnimatePresence, LazyMotion, m } from 'framer-motion'
import { ReactNode } from 'react'

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  const loadFeatures = () => import('../components/utils/framerFeaturesMax').then((res) => res.default)
  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.47, ease: 'easeOut' }}>
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default PageWrapper
