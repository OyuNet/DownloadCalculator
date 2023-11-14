import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Download Calculator',
  description: 'İndireceğiniz dosyaları mevcut internet hızınızla ne kadar sürede tamamlayacağınızı hesaplayan bir site.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
