import { Metadata } from 'next'

import Providers from '~/app/providers'
import CheckNetWork from '~/components/CheckNetWork'
import Navbar from '~/components/Navbar'
import '~/styles/globals.css'

export const metadata: Metadata = {
  title: 'Pen Chat Fight',
  description: 'Fight and chat on the blockchain',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <CheckNetWork>
            <div className='text-black h-screen flex flex-col'>
              <Navbar />
              {/* <AnimatePresence initial={false} mode='wait'>
              {children}
            </AnimatePresence> */}
              <div className='flex-1'>{children}</div>
            </div>
          </CheckNetWork>
        </Providers>
      </body>
    </html>
  )
}
