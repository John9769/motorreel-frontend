import './globals.css';

export const metadata = {
  title: 'MotorReel — Sell Your Vehicle Faster',
  description: 'Transform your vehicle photos into cinematic social media videos. RM9.99 per video.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}