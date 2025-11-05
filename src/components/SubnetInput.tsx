import React from "react";
import { SubnetRequest } from "@/lib/types/subnetting";

interface SubnetInputProps {
   subnet: SubnetRequest;
   onSubnetChange: (
      id: string,
      field: "name" | "size",
      value: string | number,
   ) => void;
   onRemoveSubnet: (id: string) => void;
}

/**
 * A component for a single subnet input row, including name, size, and a remove button.
 * @param subnet The subnet request object.
 * @param onSubnetChange Callback to handle changes to the subnet's name or size.
 * @param onRemoveSubnet Callback to handle the removal of the subnet.
 * @returns The JSX for a single subnet input row.
 */
const SubnetInput: React.FC<SubnetInputProps> = ({
   subnet,
   onSubnetChange,
   onRemoveSubnet,
}) => {
   return (
      <div className="flex items-center gap-4 mb-4">
         <input
            type="text"
            placeholder="Název podsítě"
            className="w-full max-w-xs p-2 rounded-md bg-zinc-700 border border-zinc-600 text-zinc-100"
            value={subnet.name}
            onChange={(e) => onSubnetChange(subnet.id, "name", e.target.value)}
         />
         <input
            type="number"
            placeholder="Počet hostitelů"
            className="w-full max-w-xs p-2 rounded-md bg-zinc-700 border border-zinc-600 text-zinc-100 font-mono"
            value={subnet.size}
            onChange={(e) =>
               onSubnetChange(
                  subnet.id,
                  "size",
                  parseInt(e.target.value, 10) || 0,
               )
            }
            min="0"
         />
         <button
            onClick={() => onRemoveSubnet(subnet.id)}
            className="bg-red-600/50 hover:bg-red-600 text-white font-bold p-2 rounded-md transition-colors"
            aria-label="Odebrat podsíť"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-6 w-6"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
               />
            </svg>
         </button>
      </div>
   );
};

export default SubnetInput;
