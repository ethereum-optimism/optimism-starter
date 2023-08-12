import { Attestation } from "@ethereum-attestation-service/eas-sdk";
import { Card, Typography } from "@material-tailwind/react";
import { getNetwork } from "@wagmi/core";
import Link from "next/link";

const classes = "p-4 border-b bg-lena2 border-blue-gray-50";

export default function MilestoneTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Attestation;
}) {
  const { chain, chains } = getNetwork();

  return (
    <Card className="h-full w-full overflow-scroll block rounded-ml ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={rows.uid}>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                <a
                  href={`https://${chain?.network}.easscan.org/attestation/view/${rows.uid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {rows.uid}
                </a>
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Milestone Title
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {rows.refUID}
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                2
              </Typography>
            </td>
            <td className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Milestone Description
              </Typography>
            </td>

            <td className={classes}>
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                <Link
                  href={{
                    pathname: "/milestone/[id]",
                    query: { id: rows.uid },
                  }}
                >
                  Approve
                </Link>
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
