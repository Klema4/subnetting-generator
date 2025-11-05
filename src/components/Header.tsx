import Link from "next/link";
import React from "react";

/**
 * Renders the header for the application.
 * @returns The JSX for the header component.
 */
const Header = () => {
   return (
      <header className="sticky top-2 mx-auto w-full flex justify-center">
         <div className="bg-zinc-900/50 border border-zinc-800 p-2 rounded-md backdrop-blur-md w-fit flex items-center justify-center gap-8">
            <h1 className="text-sm uppercase font-bold tracking-tighter text-zinc-100">
               Subnet Generátor
            </h1>
            <Link
               href="https://adam-klement.cz"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 p-2 text-sm rounded-md tracking-tight font-semibold uppercase transition-colors"
            >
               Autor
            </Link>
         </div>
      </header>
   );
};

export default Header;
