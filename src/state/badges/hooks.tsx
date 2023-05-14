import { useEffect, useState } from "react";
import { verifyEligibility } from "../../../eligibility-verification/verify-eligibility";
import { EligibilityStatus } from "./types";

export const useCheckUserEligibility = (
  userAddress: string,
  badgeId: number,
  protocolId: number,
) => {
  const [eligibilityStatus, setEligibilityStatus] =
    useState<EligibilityStatus>("idle");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkEligibility();
  }, [userAddress, badgeId, protocolId]);

  const checkEligibility = async () => {
    try {
      setIsLoading(true);
      const isUserEligible = await verifyEligibility(
        userAddress,
        badgeId,
        protocolId,
      );
      setEligibilityStatus(isUserEligible ?? false);
      setIsLoading(false);
    } catch (error) {
      if (error) {
        setError("Error checking eligibility");
      }
      setIsLoading(false);
    }
  };

  return {
    eligibilityStatus,
    isLoading,
    error,
    refetch: () => {
      checkEligibility();
    },
  };
};
