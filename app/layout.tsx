import type { Metadata } from "next";
import { Poppins, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.summary,
};

// Runs before first paint: use the saved choice, else follow the browser/OS
// setting, and keep following it live until the visitor picks a theme.
const themeScript = `(function(){try{var m=matchMedia('(prefers-color-scheme: dark)');var d=document.documentElement;function a(){var s=localStorage.getItem('theme');d.dataset.theme=s||(m.matches?'dark':'light')}a();m.addEventListener('change',a)}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
