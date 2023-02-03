import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CountriesPage, loader as countriesLoader } from "./countries-page";
import { HolidaysPage, loader as holidaysLoader } from "./holidays-page";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: countriesLoader(queryClient),
        element: <CountriesPage />,
      },
      {
        path: ":countryCode",
        loader: holidaysLoader(queryClient),
        element: <HolidaysPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
