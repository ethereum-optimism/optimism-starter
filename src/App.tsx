
import { useAccount } from "wagmi";
import Header from "./components/Header/Header";


export function App() {

  const { isConnected } = useAccount();

  return (
    <>
    <Header/>


    </>
  );
}
