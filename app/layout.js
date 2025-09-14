import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ReduxProvider from "@/src/store/reduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import CommonToast from "@/src/Components/Common/CommonToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatGPT | AI Chat Assistant",
  description:
    "An AI-powered chat application. Chat with your personal AI assistant, create projects, manage conversations, and stay productive.",
  keywords: [
    "ChatGPT",
    "AI chat app",
    "Next.js AI",
    "OpenAI Assistant",
    "AI chatbot",
    "Clerk authentication",
    "Redux state management",
    "Chat application",
  ],
  authors: [{ name: "Rahul Joshi" }],
  creator: "Rahul Joshi",
  publisher: "Rahul Joshi",
  icons: {
    icon: "/favicon.svg", // update with your favicon path
  },
  openGraph: {
    title: "ChatGPT | AI Chat Assistant",
    description:
      "An AI-powered chat application. Chat with your personal AI assistant, create projects, manage conversations, and stay productive.",
    url: "https://chat-gpt-frontend-chi.vercel.app",
    siteName: "ChatGPT",
    images: [
      {
        url: "/og-image.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "ChatGPT - AI Chat App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT | AI Chat Assistant",
    description:
      "An AI-powered chat application. Chat with your personal AI assistant, create projects, manage conversations, and stay productive.",
    images: ["/og-image.png"], // replace with your OG image
    creator: "@your_twitter_handle", // optional
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <CommonToast />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
