import Login from "./views/pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./views/pages/NotFound";
import useAuth from "./hooks/useAuth";
import Home from "./views/pages/home";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.email ? <Home /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
