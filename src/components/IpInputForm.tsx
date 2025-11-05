import React from "react";

interface IpInputFormProps {
   networkAddress: string;
   setNetworkAddress: (value: string) => void;
}

/**
 * A form component for inputting the base network address and CIDR prefix.
 * @param networkAddress The current network address value from the parent state.
 * @param setNetworkAddress The function to update the network address in the parent state.
 * @returns The JSX for the IP input form component.
 */
const IpInputForm: React.FC<IpInputFormProps> = ({
   networkAddress,
   setNetworkAddress,
}) => {
   return (
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700">
         <h2 className="text-xl font-semibold mb-4 text-zinc-100">
            Základní síť
         </h2>
         <div>
            <label
               htmlFor="network-address"
               className="block text-sm font-medium text-zinc-400 mb-1"
            >
               Síťová adresa / CIDR
            </label>
            <input
               id="network-address"
               type="text"
               placeholder="např. 192.168.0.0/24"
               className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 text-zinc-100 font-mono"
               value={networkAddress}
               onChange={(e) => setNetworkAddress(e.target.value)}
            />
         </div>
      </div>
   );
};

export default IpInputForm;
