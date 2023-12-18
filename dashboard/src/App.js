import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ROUTES from "./static/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Products from "./pages/Products";

function App() {
  const isAuth = useSelector(state => state.token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={isAuth ? <Navigate to='/' /> : <Login />} />
          <Route path='/' element={isAuth ? <Home /> : <Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.TRANSACTIONS} element={isAuth ? <Transactions /> : <Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.PRODUCTS} element={isAuth ? <Products /> : <Navigate to={ROUTES.LOGIN} /> } />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    </div>
  );
}

export default App;
