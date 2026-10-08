import type { Metadata } from "next";
import { Poppins, Montserrat, JetBrains_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const signature = Mrs_Saint_Delafield({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${poppins.variable} ${montserrat.variable} ${jetBrainsMono.variable} ${signature.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
