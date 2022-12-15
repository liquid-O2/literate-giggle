'use client'
import Image from 'next/image'
import hero from '/public/hero-min.webp'
import { useScroll, useTransform, m, LazyMotion } from 'framer-motion'
import { Container } from './container'
export const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%'])
  const loadFeatures = () => import('./framerFeatures').then((res) => res.default)
  const button = {
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0, y: '35%' },
    hover: { opacity: 1 },
  }
  const buttonCircle = {
    visible: { scale: 1 },
    hover: { y: 0, scale: 99, transition: { duration: 0.4 } },
    hidden: { y: '-100%', scale: 1 },
  }
  return (
    <>
      <LazyMotion features={loadFeatures}>
        <Container>
          <div className='hero-text flex flex-col justify-center items-center leading-tight' id='hero'>
            <div className='overflow-hidden'>
              <m.p
                initial={{ opacity: 0, y: '35%' }}
                whileInView={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.8, delay: 0.0, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='font-serif text-3xl md:text-4xl mt-[9rem]'>
                緑茶
              </m.p>
            </div>
            <div className='overflow-hidden pb-4'>
              <m.p
                initial={{ opacity: 0, y: '35%' }}
                whileInView={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='font-serif font-bold tracking-tighter text-5xl md:text-6xl mt-3'>
                Ryokucha
              </m.p>
            </div>
            <div className='overflow-hidden relative mt-[-1rem]'>
              <m.h1
                initial={{ opacity: 0, y: '35%' }}
                whileInView={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='text-lg leading-snug font-sans text-center mt-6 px-2 md:px-0'>
                Enjoy the Finest Japanese Green Tea.
                <br className='hidden md:block' /> Taste the extraordinary flavour of pure, organic green
                <br className='hidden md:block' />
                {`tea from Japan's finest tea growers.`}
              </m.h1>
            </div>
            <m.button
              variants={button}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              className='relative overflow-hidden py-4 px-16 text-background text-lg font-semibold rounded-full transition-colors mt-10 bg-primary shadow-2xl shadow-primary/80 hover:bg-primary/90'>
              <m.div
                variants={buttonCircle}
                className='bg-primary-dark w-2 h-2 absolute top-0 left-[50%] rounded-full z-10'></m.div>
              <span className='relative z-20'>BROWSE OUR TEAS</span>
            </m.button>
          </div>
          <div className='hero-image w-full relative  mt-14  mb-24 md:mb-32 overflow-hidden rounded-3xl md:rounded-[3rem]'>
            <m.div
              initial={{ height: '100%' }}
              whileInView={{ height: '0%' }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'circOut' }}
              viewport={{ once: true }}
              className='absolute top-0 w-full h-full z-20 bg-primary'></m.div>
            <figure className='overflow-hidden '>
              <m.div
                initial={{ scale: 1.3, y: 0 }}
                style={{ scale: 1.3, y: y }}
                className={'relative w-full h-full overflow-hidden'}>
                <Image
                  src={hero}
                  alt={'teapot, teacups filled with green tea with some loose green tea leaves around them'}
                  className='object-cover h-[55vh] md:h-[80vh]  w-full rounded-3xl md:rounded-[3rem]'
                  quality={75}
                  priority
                />
              </m.div>
            </figure>
          </div>
        </Container>
      </LazyMotion>
    </>
  )
}
