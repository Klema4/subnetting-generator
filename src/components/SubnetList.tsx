import React from "react";
import { SubnetRequest } from "@/lib/types/subnetting";
import SubnetInput from "./SubnetInput";

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
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 mt-6">
         <h2 className="text-xl font-semibold mb-4 text-zinc-100">
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
            className="mt-4 bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-bold py-2 px-4 rounded transition-colors"
         >
            Přidat podsíť
         </button>
      </div>
   );
};

export default SubnetList;
