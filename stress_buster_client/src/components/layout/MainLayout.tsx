import { Outlet } from "react-router-dom";
import Navbar from "../shared/NavBar";

export const MainLayout = () => {
  return (
    <div className="MainLayoutContainer  ">
      {/* nav starts  */}
      <div className="navContainer   ">
        <Navbar />
      </div>
      {/* nav ends */}

      {/* child component  */}
      <div className="childComponent mt-[4rem]   ">
        <Outlet />
      </div>
      {/* child component  */}

      <div className="footerContainer  py-3  ">
        <div className="footerTop flex items-center justify-center gap-2 mb-2  ">
          <p>Terms of Service</p>

          <p>|</p>

          <p>Privacy Policy</p>
        </div>

        <p className=" text-center ">Copyright © 2024</p>
        <p className=" text-center ">ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};
