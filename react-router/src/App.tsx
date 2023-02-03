import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CountriesPage, loader as countriesLoader } from "./countries-page";
import { HolidaysPage, loader as holidaysLoader } from "./holidays-page";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: countriesLoader,
        element: <CountriesPage />,
      },
      {
        path: ":countryCode",
        loader: holidaysLoader,
        element: <HolidaysPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
