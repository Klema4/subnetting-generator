"use client";

import React, { useState } from "react";
import { CalculatedSubnet } from "@/lib/types/subnetting";
import {
   generateMikrotikConfig,
   generateCiscoConfig,
} from "@/lib/utils/export";
import { Bot, Wifi } from "lucide-react";

interface ExportModalProps {
   subnets: CalculatedSubnet[];
   onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ subnets, onClose }) => {
   const [activeTab, setActiveTab] = useState("mikrotik");
   const [copySuccess, setCopySuccess] = useState("");

   const mikrotikConfig = generateMikrotikConfig(subnets);
   const ciscoConfig = generateCiscoConfig(subnets, 10);

   const handleCopy = (config: string) => {
      navigator.clipboard.writeText(config).then(
         () => {
            setCopySuccess("Zkopírováno!");
            setTimeout(() => setCopySuccess(""), 2000);
         },
         () => {
            setCopySuccess("Nelze zkopírovat.");
            setTimeout(() => setCopySuccess(""), 2000);
         },
      );
   };

   const renderConfig = () => {
      const config = activeTab === "mikrotik" ? mikrotikConfig : ciscoConfig;
      return (
         <div className="relative bg-zinc-800/50 p-4 rounded-lg mt-4 border border-zinc-700/50">
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
               <code>{config}</code>
            </pre>
            <button
               onClick={() => handleCopy(config)}
               className="cursor-pointer absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-bold uppercase py-1 px-2 rounded text-xs transition-colors"
            >
               {copySuccess || "Zkopírovat"}
            </button>
         </div>
      );
   };

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-2xl border border-zinc-800">
            <h2 className="text-xl lg:text-2xl tracking-tighter uppercase font-bold text-zinc-100 mb-4">
               Exportovat Konfiguraci
            </h2>
            <div className="flex border-b border-zinc-700 mb-4">
               <button
                  onClick={() => setActiveTab("mikrotik")}
                  className={`py-2 px-4 text-sm font-medium tracking-tight uppercase ${activeTab === "mikrotik" ? "border-b-2 border-zinc-400 text-zinc-100" : "text-zinc-400"}`}
               >
                  <Bot size={16} className="inline mr-2 mb-0.75" />
                  Mikrotik
               </button>
               <button
                  onClick={() => setActiveTab("cisco")}
                  className={`py-2 px-4 text-sm font-medium tracking-tight uppercase ${activeTab === "cisco" ? "border-b-2 border-zinc-400 text-zinc-100" : "text-zinc-400"}`}
               >
                  <Wifi size={16} className="inline mr-2 mb-0.75" />
                  Cisco
               </button>
            </div>
            {renderConfig()}
            <button
               onClick={onClose}
               className="w-full mt-4 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white text-zinc-900 hover:bg-zinc-200 font-medium uppercase tracking-tight transition-colors"
            >
               Zavřít
            </button>
         </div>
      </div>
   );
};

export default ExportModal;
