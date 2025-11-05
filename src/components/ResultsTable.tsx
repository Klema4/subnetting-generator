import React from "react";
import { SubnettingResult } from "@/lib/types/subnetting";

interface ResultsListProps {
   results: SubnettingResult | null;
}

/**
 * A component to display the subnetting calculation results as a list of cards.
 * @param results The SubnettingResult object from the calculation.
 * @returns The JSX for the results list.
 */
const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
   if (!results) {
      return null;
   }

   if (!results.success) {
      return (
         <div className="mt-6 p-4 rounded-md bg-red-900/50 border border-red-700 text-red-300">
            <div className="flex items-center">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mr-3 stroke-current"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
               </svg>
               <span>{results.error || "Došlo k neznámé chybě."}</span>
            </div>
         </div>
      );
   }

   const DetailItem = ({
      label,
      value,
   }: {
      label: string;
      value: string | number;
   }) => (
      <div className="flex justify-between items-center py-2 border-b border-zinc-700">
         <span className="text-zinc-400 tracking-tight font-medium uppercase text-sm">
            {label}
         </span>
         <span className="font-bold tracking-tight uppercase text-zinc-200">
            {value}
         </span>
      </div>
   );

   return (
      <div className="mt-8">
         <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Výsledky</h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {results.subnets?.map((subnet, index) => (
               <div
                  key={index}
                  className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50"
               >
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-zinc-100 mb-4">
                     {subnet.name}
                  </h3>
                  <div className="flex flex-col gap-1">
                     <DetailItem
                        label="Požadováno hostitelů"
                        value={subnet.requiredSize}
                     />
                     <DetailItem
                        label="Přiděleno hostitelů"
                        value={subnet.allocatedSize}
                     />
                     <DetailItem
                        label="Adresa sítě"
                        value={subnet.networkAddress}
                     />
                     <DetailItem
                        label="První použitelná IP"
                        value={subnet.usableRange.start}
                     />
                     <DetailItem
                        label="Poslední použitelná IP"
                        value={subnet.usableRange.end}
                     />
                     <DetailItem
                        label="Broadcast"
                        value={subnet.broadcastAddress}
                     />
                     <DetailItem label="Maska sítě" value={subnet.subnetMask} />
                     <DetailItem label="CIDR" value={`/${subnet.cidr}`} />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ResultsList;
