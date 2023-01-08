import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="tanstack-query" replace={true} /> },
      { path: "tanstack-query", element: <TanstackQuery /> },
      {
        path: "react-router",
        loader: ({ request }) =>
          fetch("https://date.nager.at/api/v3/nextpublicholidays/ch", {
            signal: request.signal,
          }),
        element: <ReactRouter />,
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

function Layout() {
  const navigation = useNavigation();
  return (
    <>
      <nav>
        <Link to="tanstack-query">TanStack Query</Link> |{" "}
        <Link to="react-router">React Router</Link>
        {navigation.state === "loading" && " | Loading…"}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

type PublicHolidayType =
  | "Public"
  | "Bank"
  | "School"
  | "Authorities"
  | "Optional"
  | "Observance";

type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number;
  types: PublicHolidayType[];
};

function TanstackQuery() {
  const { data, status } = useQuery({
    queryKey: ["holidays", "ch"],
    queryFn: async () =>
      (await (
        await fetch("https://date.nager.at/api/v3/nextpublicholidays/ch")
      ).json()) as PublicHoliday[],
  });

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p>An error occurred!</p>;

  return (
    <ul>
      {data.map((holiday) => (
        <li key={holiday.date}>{holiday.name}</li>
      ))}
    </ul>
  );
}

function ReactRouter() {
  const data = useLoaderData() as PublicHoliday[];
  return (
    <ul>
      {data.map((holiday) => (
        <li key={holiday.date}>{holiday.name}</li>
      ))}
    </ul>
  );
}
