import {
   SubnetRequest,
   CalculatedSubnet,
   SubnettingResult,
} from "@/lib/types/subnetting";

/**
 * Converts an IPv4 address string to its 32-bit integer representation.
 * @param ip The IPv4 address string (e.g., "192.168.1.1").
 * @returns The 32-bit integer representation of the IP address.
 */
const ipToInt = (ip: string): number => {
   return (
      ip
         .split(".")
         .reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0
   );
};

/**
 * Converts a 32-bit integer representation of an IPv4 address to its string format.
 * @param int The 32-bit integer representation of the IP address.
 * @returns The IPv4 address string.
 */
const intToIp = (int: number): string => {
   return `${int >>> 24}.${(int >> 16) & 255}.${(int >> 8) & 255}.${int & 255}`;
};

/**
 * Calculates the smallest power of 2 that is greater than or equal to the given number.
 * This is used to determine the required block size for a given number of hosts.
 * @param n The number of hosts required.
 * @returns The required block size (a power of 2).
 */
const nextPowerOf2 = (n: number): number => {
   if (n === 0) return 0;
   let power = 1;
   while (power < n) {
      power *= 2;
   }
   return power;
};

/**
 * Validates an IPv4 address and CIDR prefix.
 * @param networkStr The network address string (e.g., "192.168.0.0/24").
 * @returns An object with the validation status and parsed data or an error message.
 */
const validateNetworkInput = (
   networkStr: string,
): {
   isValid: boolean;
   error?: string;
   networkAddressInt?: number;
   cidr?: number;
} => {
   const parts = networkStr.split("/");
   if (parts.length !== 2) {
      return {
         isValid: false,
         error: "Neplatný formát sítě. Použijte formát IP/CIDR (např. 192.168.0.0/24).",
      };
   }

   const [ip, cidrStr] = parts;
   const ipParts = ip.split(".");
   if (
      ipParts.length !== 4 ||
      ipParts.some(
         (p) => isNaN(parseInt(p)) || parseInt(p) < 0 || parseInt(p) > 255,
      )
   ) {
      return { isValid: false, error: "Neplatná IP adresa." };
   }

   const cidr = parseInt(cidrStr, 10);
   if (isNaN(cidr) || cidr < 0 || cidr > 32) {
      return {
         isValid: false,
         error: "Neplatný CIDR prefix. Musí být mezi 0 a 32.",
      };
   }

   const networkAddressInt = ipToInt(ip);
   const mask = -1 << (32 - cidr);
   const baseNetworkAddressInt = networkAddressInt & mask;

   return { isValid: true, networkAddressInt: baseNetworkAddressInt, cidr };
};

/**
 * Calculates the subnets based on the provided network address and a list of subnet requests.
 * This is the core function for the subnetting logic.
 * @param networkStr The base network address in CIDR notation (e.g., "192.168.0.0/24").
 * @param requests An array of subnet requests, each with a name and a required size (number of hosts).
 * @returns A SubnettingResult object containing the list of calculated subnets or an error message.
 */
export const calculateSubnets = (
   networkStr: string,
   requests: SubnetRequest[],
): SubnettingResult => {
   const validation = validateNetworkInput(networkStr);
   if (
      !validation.isValid ||
      validation.networkAddressInt === undefined ||
      validation.cidr === undefined
   ) {
      return { success: false, error: validation.error };
   }

   let { networkAddressInt, cidr } = validation;

   // Sort requests from largest to smallest required size
   const sortedRequests = [...requests].sort((a, b) => b.size - a.size);

   const calculatedSubnets: CalculatedSubnet[] = [];
   let currentAddress = networkAddressInt;

   const totalAvailableHosts = Math.pow(2, 32 - cidr) - 2;
   const totalRequestedHosts = sortedRequests.reduce(
      (sum, req) => sum + req.size + 2,
      0,
   );

   if (totalRequestedHosts > totalAvailableHosts + 2) {
      return {
         success: false,
         error: "Nedostatek adresního prostoru. Požadujete více hostitelů, než je v dané síti k dispozici.",
      };
   }

   for (const request of sortedRequests) {
      const requiredSizeWithNetworkAndBroadcast = request.size + 2;
      const allocatedSize = nextPowerOf2(requiredSizeWithNetworkAndBroadcast);
      const subnetCidr = 32 - Math.log2(allocatedSize);

      if (subnetCidr < cidr) {
         return {
            success: false,
            error: `Podsíť '${request.name}' je příliš velká pro zadanou síť.`,
         };
      }

      const subnetMaskInt = -1 << (32 - subnetCidr);
      const networkAddress = currentAddress;
      const broadcastAddress = currentAddress + allocatedSize - 1;

      // Check if the new subnet fits within the main network
      const mainNetworkMask = -1 << (32 - cidr);
      if (
         (networkAddress & mainNetworkMask) !==
         (networkAddressInt & mainNetworkMask)
      ) {
         return {
            success: false,
            error: "Nedostatek adresního prostoru pro přidělení všech podsítí.",
         };
      }

      calculatedSubnets.push({
         name: request.name,
         requiredSize: request.size,
         allocatedSize: allocatedSize - 2, // Usable hosts
         cidr: subnetCidr,
         subnetMask: intToIp(subnetMaskInt),
         networkAddress: intToIp(networkAddress),
         usableRange: {
            start: intToIp(networkAddress + 1),
            end: intToIp(broadcastAddress - 1),
         },
         broadcastAddress: intToIp(broadcastAddress),
      });

      currentAddress += allocatedSize;
   }

   return { success: true, subnets: calculatedSubnets };
};
