
import { useAccount } from "wagmi";
import Header from "./components/Header/Header";


export function App() {

  return (
    <div className="bg-primary h-screen p-5">
    <Header/>
    <h1>Welcome to Minty Badget!</h1>

    </div>
  );
}
