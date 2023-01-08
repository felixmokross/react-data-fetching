import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries, { loader as countriesLoader } from "./countries";
import Holidays, { loader as holidaysLoader } from "./holidays";

const router = createBrowserRouter([
  {
    path: "/",
    loader: countriesLoader,
    element: <Countries />,
  },
  {
    path: "/:countryCode",
    loader: holidaysLoader,
    element: <Holidays />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
