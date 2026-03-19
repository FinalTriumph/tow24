import './globals.css';

export const metadata = {
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
