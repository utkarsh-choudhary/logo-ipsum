// import React from "react";
// import SideNav from "../Components/SideNav";
// import { useLocation } from "react-router-dom";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const isAuthRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/signup');
//   return (
//     <div className="flex w-full min-h-screen overflow-hidden">
//      {!isAuthRoute && <SideNav />}
//       <div className="flex-grow overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import SideNav from "../Components/SideNav";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/homepage') || location.pathname.startsWith('/data') || location.pathname.startsWith('/jobs') || location.pathname.startsWith('/profile')

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {isAuthRoute && (
        <div className="hidden md:block w-72 flex-shrink-0">
          <SideNav />
        </div>
      )}
      <div className="flex-grow overflow-auto">
        {isAuthRoute && (
          <div className="md:hidden">
            <SideNav />
          </div>
        )}
        <div className="md:">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;