import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CreateApprovedGrantPage } from "../pages";
import { ApprovedGrantDetailPage } from "../pages";

export function Header() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */

  return (
    <>
      <h1>Grant Attestation Service</h1>

      <Router>
        <nav>
          <ul className="flex flex">
            <li className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900">
              <Link to="/create-approved-grant">Create Approved Grant</Link>
              <Link to="/approved-grant">Create Approved Grant</Link>
            </li>
          </ul>
          {/** @see https://www.rainbowkit.com/docs/connect-button */}
          <ConnectButton />
        </nav>

        <Routes>
          <Route
            path="/create-approved-grant"
            element={<CreateApprovedGrantPage />}
          />
          <Route path="/approved-grant" element={<ApprovedGrantDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}
