// App
import { Outlet, Route, Routes } from "react-router-dom";
import { appRoutes } from "../lib/appRoutes";

// Components
import Mint from "./Mint/Mint";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={appRoutes.home_path} element={<Mint />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default RouterConfig;
