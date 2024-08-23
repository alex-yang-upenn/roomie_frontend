import Navbar from "./_components/navbar/Navbar";
import LoginModal from "./_components/modals/LoginModal";
import SignupModal from "./_components/modals/SignupModal";
import SearchModal from "./_components/modals/SearchModal";
import AddPropertyModal from "./_components/modals/AddPropertyModal";
import BookingNotificationModal from "./_components/modals/BookingNotificationModal";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roomie",
  description: "An AirBnB Alternative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-32">
          {children}
        </div>

        <SearchModal />
        <LoginModal />
        <SignupModal />
        <AddPropertyModal />
        <BookingNotificationModal />
      </body>
    </html>
  );
}
