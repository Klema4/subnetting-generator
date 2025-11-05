import React from "react";
import { SubnetRequest } from "@/lib/types/subnetting";
import { X } from "lucide-react";

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
            className="w-full p-2.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-white tracking-tight font-medium"
            value={subnet.name}
            onChange={(e) => onSubnetChange(subnet.id, "name", e.target.value)}
         />
         <input
            type="number"
            placeholder="Počet hostitelů"
            className="w-full p-2.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-white tracking-tight font-medium"
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
            className="cursor-pointer bg-rose-600 hover:bg-rose-700 text-white font-bold min-w-12 h-12 flex items-center justify-center rounded-md transition-colors"
            aria-label="Odebrat podsíť"
         >
            <X size={20} />
         </button>
      </div>
   );
};

export default SubnetInput;
