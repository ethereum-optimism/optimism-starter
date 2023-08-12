import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Table({
  columns,
  rows,
  chain,
}: {
  columns: string[];
  rows: Array<{
    refUID: string;
    grantRecipient: string;
    multisigWallet: string;
    title: string;
    milestones: BigInt;
    amount: BigInt;
  }>;
  chain: any;
}) {
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
                refUID,
                title,
                grantRecipient,
                multisigWallet,
                milestones,
                amount,
              },
              index
            ) => {
              const isLast = index === rows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b bg-lena2 border-blue-gray-50";

              return (
                <tr key={refUID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <a
                        href={`https://${chain?.network}.easscan.org/attestation/view/${refUID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {refUID}
                      </a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {grantRecipient}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {multisigWallet}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {milestones}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
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
                          pathname: "/grant/[id]",
                          query: { id: refUID },
                        }}
                      >
                        View
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
