import { useAccount } from "wagmi";
import Header from "./components/Header/Header";
import RouterConfig from "./layout/RouterConfig";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="bg-primary w-full">
      <Header />
      <main className="main-wrapper">
        <RouterConfig />
        <Outlet />
      </main>
    </div>
  );
}
