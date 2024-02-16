import { Outlet } from "react-router-dom";
import SideMenu from "../components/shared/SideMenu";


const MainLayout = () => {
  return (
    <SideMenu>
      <Outlet />
    </SideMenu>
  );
};

export default MainLayout;