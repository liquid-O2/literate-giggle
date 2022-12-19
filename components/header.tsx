'use client'

import Link from 'next/link'
import { Container } from './container'
import { ShoppingCart } from 'react-feather'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { GlobalContext } from './contextProvider'
import emptyProfile from '../public/Frame 61.png'

const links = [
  { href: '/shop', label: 'shop' },
  { href: '/search', label: 'search' },
]

const Header = () => {
  const { isLoggedIn, cartItemNo, userDetails } = useContext(GlobalContext)
  const { photoUrl } = userDetails
  const path = usePathname()

  return (
    <header className={` w-full  font-bold leading-none fixed top-0 left-0 z-50 mt-6`}>
      <Container className='h-16 flex rounded-3xl justify-center leading-none items-center'>
        <Link
          href={'/'}
          className='mr-auto rounded-full bg-background flex justify-center items-center px-6 py-4 text-center max-h-[56px] '>
          <p className=' text-xl md:text-2xl leading-none font-bold'>ryo.</p>
        </Link>
        <div className='flex gap-2 justify-center items-center py-4 px-6 rounded-full overflow-hidden bg-background  max-h-[56px]'>
          <nav>
            <ul className={`flex justify-center items-center gap-4 ${isLoggedIn ? 'mr-4' : 'mr-2'}`}>
              {links.map((link) => {
                return (
                  <li key={link.href}>
                    <Link className='relative' href={link.href}>
                      <div className='absolute left-0 top-full overflow-hidden block h-[1px] w-full'>
                        {link.href === path && <span className=' block h-[1px] w-full bg-primary' />}
                      </div>
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              {!isLoggedIn && (
                <li>
                  <Link className='relative' href={'/login'}>
                    <div className='absolute left-0 top-full overflow-hidden block h-[1px] w-full'>
                      {'/login' === path && <span className=' block h-[1px] w-full bg-primary' />}
                    </div>
                    login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {isLoggedIn && (
            <div className='relative overflow-hidden rounded-full h-7 w-7'>
              <Image
                src={photoUrl ? `${photoUrl}` : emptyProfile}
                alt={'your avatar'}
                width={24}
                height={24}
                className='w-full h-full object-cover'
              />
            </div>
          )}
          <div className='relative'>
            <button className=' w-12 h-12 flex justify-center items-center'>
              <span className='sr-only'>Cart</span>
              <ShoppingCart size={20} />
            </button>
            <div className='flex justify-center items-center absolute top-[3px] right-0 rounded-full bg-primary m-auto text-center p-1 px-[5.5px] leading-none  text-[8px] text-neon'>
              {cartItemNo}
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
