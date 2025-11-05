"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import IpInputForm from "@/components/IpInputForm";
import SubnetList from "@/components/SubnetList";
import ResultsList from "@/components/ResultsTable";
import { SubnetRequest, SubnettingResult } from "@/lib/types/subnetting";
import { calculateSubnets } from "@/lib/utils/subnetting";

/**
 * The main page of the Subnetting Calculator application.
 * It holds the state for the inputs and results, and orchestrates the calculation.
 * @returns The JSX for the main page.
 */
const HomePage = () => {
   const [networkAddress, setNetworkAddress] = useState("192.168.0.0/24");
   const [subnets, setSubnets] = useState<SubnetRequest[]>([
      { id: crypto.randomUUID(), name: "Marketing", size: 25 },
      { id: crypto.randomUUID(), name: "Vývoj", size: 50 },
      { id: crypto.randomUUID(), name: "Účetní", size: 12 },
   ]);
   const [results, setResults] = useState<SubnettingResult | null>(null);

   const handleAddSubnet = () => {
      setSubnets([
         ...subnets,
         {
            id: crypto.randomUUID(),
            name: `Podsíť ${subnets.length + 1}`,
            size: 0,
         },
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
      <div className="min-h-screen bg-zinc-900">
         <Header />
         <main className="container mx-auto p-4 md:p-8">
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
            <div className="mt-6">
               <button
                  onClick={handleCalculate}
                  className="w-full bg-zinc-500 hover:bg-zinc-400 text-zinc-900 font-bold py-3 px-4 rounded-lg transition-colors text-lg"
               >
                  Vypočítat
               </button>
            </div>
            {results && <ResultsList results={results} />}
         </main>
      </div>
   );
};

export default HomePage;
