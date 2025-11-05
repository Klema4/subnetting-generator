/**
 * Represents a request for a new subnet with a specific size.
 */
export interface SubnetRequest {
  id: string;
  name: string;
  size: number;
}

/**
 * Represents a calculated subnet with all its network details.
 */
export interface CalculatedSubnet {
  name: string;
  requiredSize: number;
  allocatedSize: number;
  cidr: number;
  subnetMask: string;
  networkAddress: string;
  usableRange: {
    start: string;
    end: string;
  };
  broadcastAddress: string;
}

/**
 * Represents the overall result of the subnetting calculation.
 */
export interface SubnettingResult {
  success: boolean;
  error?: string;
  subnets?: CalculatedSubnet[];
}
