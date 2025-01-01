import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "./providers/AuthSssionprovider";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Lesson Notes App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-full bg-white antialiased`}
      >
        <ToastContainer />
        <AuthSessionProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
