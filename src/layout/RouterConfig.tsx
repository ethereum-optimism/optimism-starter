// App
import { Outlet, Route, Routes } from "react-router-dom";
import { appRoutes } from "../lib/appRoutes";
import { App } from "../App";


// Components


const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path={appRoutes.home_path} element={<App />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default RouterConfig;
