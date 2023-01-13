import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Countries, { loader as countriesLoader } from "./countries";
import Holidays, { loader as holidaysLoader } from "./holidays";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: countriesLoader(queryClient),
        element: <Countries />,
      },
      {
        path: ":countryCode",
        loader: holidaysLoader(queryClient),
        element: <Holidays />,
      },
    ],
  },
  {
    path: "/:countryCode",
    loader: holidaysLoader(queryClient),
    element: <Holidays />,
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
