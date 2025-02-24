/**
* Packages
*/
import React from "react";
import { motion } from "framer-motion";

/**
* Components
*/
import Header from "./Header";
import Footer from "./Footer";

/**
* Container Props
*/
interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  showFooter?:boolean;
}

/**
* Container Component
*/
export default function ContainerComponent({ children, className = "", showFooter = false }: ContainerProps) {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex flex-col gap-2 w-full p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700 
        ${className.includes("max-w-") ? "" : "max-w-md"} ${className}`}
      >
        {children}
        {showFooter ? <Footer/> : ""}
      </motion.div>
    </>
  )
}