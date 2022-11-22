import Head from './head'
import localfont from '@next/font/local'
export const NeueMontreal = localfont({
  src: [
    {
      path: '/fonts/NeueMontreal-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/NeueMontreal-Light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '/fonts/NeueMontreal-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-NeueMontreal',
})
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={NeueMontreal.variable}>
      <Head />
      <body>{children}</body>
    </html>
  )
}
