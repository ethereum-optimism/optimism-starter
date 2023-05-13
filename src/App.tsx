
import { useAccount } from "wagmi";
import Header from "./components/Header/Header";
import RouterConfig from "./layout/RouterConfig";
import { Outlet } from "react-router-dom";


export function App() {

  return (
    <div className="bg-primary h-screen p-5">
    <Header/>
    <h1>Welcome to Minty Badget!</h1>

    <main className="main-wrapper">
        <RouterConfig />
        <Outlet />
        {/* {checkDisclaimer && (
          <Disclaimer
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            handleAccepted={handleAccepted}
          />
        )} */}
      </main>
    </div>
  );
}
