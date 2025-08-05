
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DashboardLayout from "./DashboardLayout/DashboardLayout";
// import { routelist } from "./Routes/Route";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
     
//           <Route element={<DashboardLayout />} >
//                 {routelist.map(({ path, element }) => (
//                   <Route key={path} path={path} element={element} />
//                 ))}
//               </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }


import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./DashboardLayout/DashboardLayout";
import { routelist } from "./Routes/Route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
         
          <Route index element={<Navigate to="/dashboard"/>} />

       
          {routelist.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
