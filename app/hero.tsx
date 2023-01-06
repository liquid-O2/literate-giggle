import hero from '/public/hero.png'
import Section from '../components/section'
import Image from 'next/image'
import { Container } from '../components/container'
import SlideUp from '../components/slideUp'

export const Hero = () => {
  return (
    <Section full className='h-[99vh] md:h-[99vh] text-background'>
      <section className='relative w-full h-full '>
        <Image
          src={hero}
          fill
          placeholder={'blur'}
          sizes='(min-width: 100px) 70vw'
          alt={' a chawan(tea bowl) on top of a a wooden table with a hand holding a chasen(bamboo whisk) over it'}
          quality={100}
          className='object-cover relative h-full w-full'
          priority={true}
        />

        <section className='relative z-30 w-full h-full  flex flex-col '>
          <Container className='self-end flex flex-col justify-end mt-auto h-full'>
            <SlideUp delay={0.5}>
              <div className='mb-24 md:mb-32'>
                <aside className='flex text-sm md:text-base min-[2000px]:text-lg gap-1 md:gap-3 mt-5 mb-5 opacity-80 flex-wrap min-[2000px]:mt-8'>
                  <p className='px-2 md:px-3 py-1 rounded-full border border-background/60'>3-5 hours of energy</p>
                  <p className='px-2 md:px-3 py-1 rounded-full border border-background/60'>Organic</p>
                </aside>
                <h1 className=' md:pr-1 text-4xl md:text-5xl lg:text-7xl font-light  leading-[1.1] max-w-[21ch] '>
                  Enjoy the <span className='font-light italic'>finest</span> Japanese green teas and cherish the
                  <span className='font-light italic '> extraordinary </span>
                  flavour
                </h1>
              </div>
            </SlideUp>
          </Container>
        </section>
      </section>
    </Section>
  )
}
