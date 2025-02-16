import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="flex flex-col gap-2 w-full max-w-md p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700">
    {children}
  </main>
);

export default Container;
