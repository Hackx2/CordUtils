import React from "react";

import { motion } from "framer-motion";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex flex-col gap-2 w-full max-w-md p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700"
  >
    {children}
  </motion.div>
);

export default Container;
