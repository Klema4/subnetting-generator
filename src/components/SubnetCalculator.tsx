"use client";

import React, { useState } from 'react';
import IpInputForm from '@/components/IpInputForm';
import SubnetList from '@/components/SubnetList';
import ResultsList from "@/components/ResultsTable";
import { SubnetRequest, SubnettingResult } from '@/lib/types/subnetting';
import { calculateSubnets } from '@/lib/utils/subnetting';

/**
 * Generates a simple UUID for client-side use.
 * This is a fallback for environments where crypto.randomUUID is not available.
 * @returns A new UUID string.
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const SubnetCalculator = () => {
  const [networkAddress, setNetworkAddress] = useState('192.168.0.0/24');
  const [subnets, setSubnets] = useState<SubnetRequest[]>([]);
  const [results, setResults] = useState<SubnettingResult | null>(null);

  React.useEffect(() => {
    setSubnets([
      { id: generateUUID(), name: 'Marketing', size: 25 },
      { id: generateUUID(), name: 'Vývoj', size: 50 },
      { id: generateUUID(), name: 'Účetní', size: 12 },
    ]);
  }, []);

  const handleAddSubnet = () => {
    setSubnets([...subnets, { id: generateUUID(), name: `Podsíť ${subnets.length + 1}`, size: 0 }]);
  };

  const handleRemoveSubnet = (id: string) => {
    setSubnets(subnets.filter((subnet) => subnet.id !== id));
  };

  const handleSubnetChange = (id: string, field: 'name' | 'size', value: string | number) => {
    setSubnets(
      subnets.map((subnet) =>
        subnet.id === id ? { ...subnet, [field]: value } : subnet
      )
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
      <div className="mt-6">
        <button
          onClick={handleCalculate}
          className="w-full bg-zinc-500 hover:bg-zinc-400 text-zinc-900 font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
          Vypočítat
        </button>
      </div>
      {results && <ResultsList results={results} />}
    </>
  );
};

export default SubnetCalculator;
