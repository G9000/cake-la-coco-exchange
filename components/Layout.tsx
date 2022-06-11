import * as React from "react";
import { Navbar } from "@/components/Navbar";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen h-full px-4">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
