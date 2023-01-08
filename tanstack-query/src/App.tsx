import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./countries";
import Holidays from "./holidays";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Countries />,
  },
  {
    path: "/:countryCode",
    element: <Holidays />,
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
