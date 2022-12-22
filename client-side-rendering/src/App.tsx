import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tanstack-query" element={<TanstackQuery />} />
        <Route path="/react-router" element={<ReactRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Index() {
  return (
    <ul>
      <li>
        <Link to="tanstack-query">TanStack Query</Link>
      </li>
      <li>
        <Link to="react-router">React Router</Link>
      </li>
    </ul>
  );
}

function TanstackQuery() {
  return <p>TanStack Query</p>;
}

function ReactRouter() {
  return <p>React Router</p>;
}
