import React from "react";

/**
 * Renders the header for the application.
 * @returns The JSX for the header component.
 */
const Header = () => {
   return (
      <header className="bg-zinc-800 text-white p-4 shadow-md">
         <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-zinc-100">
               Subnetting Kalkulátor
            </h1>
         </div>
      </header>
   );
};

export default Header;
