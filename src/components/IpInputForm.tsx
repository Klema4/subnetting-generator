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
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
         <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-tighter mb-4 text-zinc-100">
            Základní síť
         </h2>
         <div>
            <label
               htmlFor="network-address"
               className="block text-sm font-medium tracking-tight text-zinc-400 mb-1"
            >
               Síťová adresa / CIDR
            </label>
            <input
               id="network-address"
               type="text"
               placeholder="např. 192.168.0.0/24"
               className="w-full p-2.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-white tracking-tight font-medium"
               value={networkAddress}
               onChange={(e) => setNetworkAddress(e.target.value)}
            />
         </div>
      </div>
   );
};

export default IpInputForm;
