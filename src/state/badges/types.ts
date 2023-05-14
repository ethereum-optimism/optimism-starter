export type EligibilityStatus = "success" | "error" | "loading" | "idle";
export type HexAddress = `0x${string}`;
export interface BadgeData {
  badgeId: number;
  name: string;
  description: string;
  imageUri: string;
  tier: string;
  protocolId: number;
  eligibilityStatus: EligibilityStatus;
}
