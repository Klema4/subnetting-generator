import React from "react";
import { SubnetRequest } from "@/lib/types/subnetting";
import SubnetInput from "./SubnetInput";
import { Plus } from "lucide-react";

interface SubnetListProps {
   subnets: SubnetRequest[];
   onSubnetChange: (
      id: string,
      field: "name" | "size",
      value: string | number,
   ) => void;
   onAddSubnet: () => void;
   onRemoveSubnet: (id: string) => void;
}

/**
 * A component that manages and displays a list of subnet inputs.
 * @param subnets The array of subnet request objects.
 * @param onSubnetChange Callback to handle changes in a specific subnet input.
 * @param onAddSubnet Callback to add a new, empty subnet input.
 * @param onRemoveSubnet Callback to remove a specific subnet input.
 * @returns The JSX for the list of subnet inputs.
 */
const SubnetList: React.FC<SubnetListProps> = ({
   subnets,
   onSubnetChange,
   onAddSubnet,
   onRemoveSubnet,
}) => {
   return (
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mt-6">
         <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-tighter mb-4 text-zinc-100">
            Požadavky na podsítě
         </h2>
         {subnets.map((subnet) => (
            <SubnetInput
               key={subnet.id}
               subnet={subnet}
               onSubnetChange={onSubnetChange}
               onRemoveSubnet={onRemoveSubnet}
            />
         ))}
         <button
            onClick={onAddSubnet}
            className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white text-zinc-900 hover:bg-zinc-200 font-medium uppercase tracking-tight transition-colors"
         >
            <Plus size={18} />
            Přidat podsíť
         </button>
      </div>
   );
};

export default SubnetList;
