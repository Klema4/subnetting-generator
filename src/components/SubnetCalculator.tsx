"use client";

import React, { useState, useEffect } from "react";
import IpInputForm from "@/components/IpInputForm";
import SubnetList from "@/components/SubnetList";
import ResultsList from "@/components/ResultsTable";
import { SubnetRequest, SubnettingResult } from "@/lib/types/subnetting";
import { calculateSubnets } from "@/lib/utils/subnetting";
import ExportModal from "./ExportModal";

/**
 * Generates a simple UUID for client-side use.
 * This is a fallback for environments where crypto.randomUUID is not available.
 * @returns A new UUID string.
 */
const generateUUID = () => {
   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
         v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
};

const SubnetCalculator = () => {
   const [networkAddress, setNetworkAddress] = useState("192.168.0.0/24");
   const [subnets, setSubnets] = useState<SubnetRequest[]>([]);
   const [results, setResults] = useState<SubnettingResult | null>(null);
   const [isExportModalOpen, setExportModalOpen] = useState(false);

   useEffect(() => {
      setSubnets([
         { id: generateUUID(), name: "Marketing", size: 25 },
         { id: generateUUID(), name: "Vývoj", size: 50 },
         { id: generateUUID(), name: "Účetní", size: 12 },
      ]);
   }, []);

   const handleAddSubnet = () => {
      setSubnets([
         ...subnets,
         { id: generateUUID(), name: `Podsíť ${subnets.length + 1}`, size: 0 },
      ]);
   };

   const handleRemoveSubnet = (id: string) => {
      setSubnets(subnets.filter((subnet) => subnet.id !== id));
   };

   const handleSubnetChange = (
      id: string,
      field: "name" | "size",
      value: string | number,
   ) => {
      setSubnets(
         subnets.map((subnet) =>
            subnet.id === id ? { ...subnet, [field]: value } : subnet,
         ),
      );
   };

   const handleCalculate = () => {
      const result = calculateSubnets(networkAddress, subnets);
      setResults(result);
   };

   return (
      <>
         <IpInputForm
            networkAddress={networkAddress}
            setNetworkAddress={setNetworkAddress}
         />
         <SubnetList
            subnets={subnets}
            onSubnetChange={handleSubnetChange}
            onAddSubnet={handleAddSubnet}
            onRemoveSubnet={handleRemoveSubnet}
         />
         <div className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-2">
            <button
               onClick={handleCalculate}
               className="w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-3 text-lg rounded-md bg-white text-zinc-900 hover:bg-zinc-200 font-medium uppercase tracking-tight transition-colors"
            >
               Vypočítat
            </button>
            {results && results.success && (
               <button
                  onClick={() => setExportModalOpen(true)}
                  className="w-full cursor-pointer flex items-center justify-center gap-2 px-3 py-3 text-lg rounded-md bg-zinc-800 text-white hover:bg-zinc-700 font-medium uppercase tracking-tight transition-colors"
               >
                  Exportovat Konfiguraci
               </button>
            )}
         </div>
         {results && <ResultsList results={results} />}
         {isExportModalOpen && results && results.subnets && (
            <ExportModal
               subnets={results.subnets}
               onClose={() => setExportModalOpen(false)}
            />
         )}
      </>
   );
};

export default SubnetCalculator;
