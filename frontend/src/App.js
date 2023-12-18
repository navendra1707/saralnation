import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ROUTES from "./static/routes";
import KidsContestHome from "./pages/KidsContestHome";
import ContestForm from "./pages/ContestForm";
import Products from "./pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={ROUTES.BABY_CONTEST} element={<KidsContestHome />} />
          <Route path={ROUTES.PAYMENT_COMPLETE} element={<ContestForm />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
