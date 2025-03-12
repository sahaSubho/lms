import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import { DM_Sans } from "@next/font/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const dmSans = DM_Sans({
  subsets: ["latin"], // Specify the subset you want to load
  weight: ["400", "500", "700"], // Optional: load specific font weights
  style: ["normal", "italic"], // Optional: load specific font styles
  display: "swap",
});

export const metadata: Metadata = {
  title: "Circlechess | Learning Management System",
  description:
    "CircleChess is an advanced Learning Management System (LMS) designed to enhance education with interactive courses, progress tracking, and seamless collaboration. Perfect for schools, businesses, and online educators looking for an efficient and user-friendly learning platform.",
  icons: {
    icon: "data:image/svg+xml;charset=UTF-8,%3csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 25.5996)' fill='%23D1AB41'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 25.5996)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 25.6016 25.5996)' fill='%23806234'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 0)' fill='%23D1AB41'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 0)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 51.2)' fill='%23D1AB41'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 51.1992 51.2)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 64 12.7996)' fill='%23FACF47'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 64 12.7996)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 38.4008 12.7996)' fill='%23A9873B'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 38.4008 12.7996)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 64 38.4004)' fill='%23FACF47'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 64 38.4004)' stroke='white'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 38.4008 38.4004)' fill='%23A9873B'/%3e%3crect width='12.8' height='12.8' transform='matrix(-1 0 0 1 38.4008 38.4004)' stroke='white'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0L32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56L32 64Z' fill='%234D3F37'/%3e%3c/svg%3e ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} `}>
        <Header />
        <LeftMenu />
        <div style={{ marginLeft: 68 }}>
          {/* <Spacer spacing={72} horizontal /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
