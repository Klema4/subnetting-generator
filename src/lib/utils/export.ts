import { CalculatedSubnet } from '@/lib/types/subnetting';

/**
 * Generates a configuration script for Mikrotik devices.
 * @param subnets An array of calculated subnets.
 * @param gatewayAsFirstIp If true, the first usable IP is assigned to the interface.
 * @returns A string containing the Mikrotik configuration script.
 */
export const generateMikrotikConfig = (subnets: CalculatedSubnet[]): string => {
  let config = `# Mikrotik Configuration Script\n# ------------------------------------\n\n`;

  config += `# Add IP addresses to interfaces\n`;
  subnets.forEach(subnet => {
    const gateway = subnet.usableRange.start;
    config += `/ip address add address=${gateway}/${subnet.cidr} interface=[CHANGE_INTERFACE] comment="${subnet.name}"\n`;
  });

  config += `\n# Add IP pools for DHCP\n`;
  subnets.forEach(subnet => {
    // Mikrotik pool range is inclusive, but the first IP is the gateway, so we start from the second usable IP.
    const poolStart = subnet.networkAddress.split('.').map(Number);
    poolStart[3] += 2;
    const poolStartIp = poolStart.join('.');

    config += `/ip pool add name="${subnet.name}-pool" ranges=${poolStartIp}-${subnet.usableRange.end}\n`;
  });

  return config;
};

/**
 * Generates a configuration script for Cisco IOS devices (L3 Switch/Router).
 * @param subnets An array of calculated subnets.
 * @param startingVlanId The starting VLAN ID for the first subnet.
 * @returns A string containing the Cisco IOS configuration script.
 */
export const generateCiscoConfig = (subnets: CalculatedSubnet[], startingVlanId: number = 10): string => {
  let config = `! Cisco IOS Configuration Script\n! ------------------------------------\n\n`;

  subnets.forEach((subnet, index) => {
    const vlanId = startingVlanId + index;
    const gateway = subnet.usableRange.start;

    config += `! Configuration for ${subnet.name}\n`;
    config += `vlan ${vlanId}\n`;
    config += ` name ${subnet.name.replace(/\s+/g, '_')}\n`;
    config += `!\n`;
    config += `interface Vlan${vlanId}\n`;
    config += ` description ${subnet.name} Subnet\n`;
    config += ` ip address ${gateway} ${subnet.subnetMask}\n`;
    config += ` no shutdown\n`;
    config += `!\n\n`;
  });

  return config;
};
