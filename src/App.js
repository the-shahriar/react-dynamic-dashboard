import Login from "./views/pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./views/pages/404";
import useAuth from "./hooks/useAuth";
import Home from "./views/pages/home";
import PrivateRoute from "./utils/private_route";

function App() {
  const { context } = useAuth();
  const { user, loading } = context;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute user={user} loading={loading} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
