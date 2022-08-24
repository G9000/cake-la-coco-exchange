import * as React from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>La Pepe Scammer Crypto Exchange</title>
        <meta name="description" content="La Coco scammer exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
