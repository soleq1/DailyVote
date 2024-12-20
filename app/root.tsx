import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";


import { useEffect, useState } from "react";

import BlobBackground from "./Components/WaveBackground";
import { Footer } from "./Components/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  
  const [leftPercentage, setLeftPercentage] = useState(70); // Default 70% purple
  const [rightPercentage, setRightPercentage] = useState(30); // Default 30% blue

  useEffect(() => {
    // Simulate dynamic blob size updates
    const interval = setInterval(() => {
      const newLeft = Math.random() * 100;
      setLeftPercentage(newLeft);
      setRightPercentage(100 - newLeft);
    }, 500); // Update every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);
  
  
  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-kanit">
        <BlobBackground />
        <ScrollRestoration />
        <Scripts />
        <Outlet />
      </body>
      {/* <Footer></Footer> */}
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
