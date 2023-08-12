import { Attestation } from "@ethereum-attestation-service/eas-sdk";
import { Card, Typography } from "@material-tailwind/react";
import { getNetwork } from "@wagmi/core";
import Link from "next/link";

export default function MilestoneTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<{
    ID: string;
    grantTitle: string;
    grantUID: string;
    milestoneDescription: string;
    numberOfMilestones: number;
  }>;
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
          {rows.map(
            (
              {
                ID,
                grantTitle,
                grantUID,
                milestoneDescription,
                numberOfMilestones,
              },
              index
            ) => {
              const isLast = index === rows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b bg-lena2 border-blue-gray-50";

              return (
                <tr key={ID}>
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
                        {ID}
                      </a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {grantTitle}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {grantUID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {milestoneDescription}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {numberOfMilestones}
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
                          query: { id: ID },
                        }}
                      >
                        Approve
                      </Link>
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}
