/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.webllm.ai"),
  title: "Tonomy Shadow Chat",
  description:
    "Privacy-first AI assistant powered by Tonomy. Chat with AI language models running securely in your browser with complete data sovereignty.",
  keywords: [
    "Tonomy",
    "AI chat",
    "privacy-first",
    "browser AI",
    "language model",
    "decentralized",
    "data sovereignty",
  ],
  authors: [{ name: "Tonomy" }],
  publisher: "Tonomy",
  creator: "Tonomy",
  robots: "index, follow",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1F1A2D" },
    { media: "(prefers-color-scheme: dark)", color: "#09031A" },
  ],
  appleWebApp: {
    title: "Tonomy Shadow Chat",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    url: "https://chat.webllm.ai",
    title: "Tonomy Shadow Chat",
    description:
      "Privacy-first AI assistant powered by Tonomy - Chat with complete data sovereignty",
    siteName: "Tonomy Shadow Chat",
    images: [
      {
        url: "https://chat.tonomy.io/tonomy-logo.png",
        width: 360,
        height: 360,
        alt: "Tonomy Shadow Chat - Browser-based AI conversation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonomy Shadow Chat",
    description:
      "Chat with AI large language models running natively in your browser",
    images: ["https://chat.tonomy.io/tonomy-logo.png"],
  },
  alternates: {
    canonical: "https://chat.tonomy.io",
  },
};

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    worker-src 'self';
    connect-src 'self' blob: data: https: http:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={cspHeader.replace(/\n/g, "")}
        />
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#062578" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Tonomy Shadow Chat",
              url: "https://chat.webllm.ai",
              description:
                "Chat with AI large language models running natively in your browser. Enjoy private, server-free, seamless AI conversations.",
              applicationCategory: "Artificial Intelligence",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              operatingSystem: "Web Browser",
              creator: {
                "@type": "Organization",
                name: "WebLLM",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
