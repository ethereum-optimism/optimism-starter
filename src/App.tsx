import { useAccount } from "wagmi";
import Header from "./components/Header/Header";
import RouterConfig from "./layout/RouterConfig";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";

export function App() {
  return (
    <>
      <Header />
      <main className="main-wrapper">
        <RouterConfig />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
