import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CountriesPage } from "./countries-page";
import { HolidaysPage } from "./holidays-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CountriesPage />,
  },
  {
    path: "/:countryCode",
    element: <HolidaysPage />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
