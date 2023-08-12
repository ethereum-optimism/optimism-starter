"use client";

import { useRouter } from "next/navigation";

export default function MilestoneDetailPage() {
  const router = useRouter();
  console.log(router?.query);

  return (
    <div>
      <div className="h1">Milestone Page</div>
    </div>
  );
}
