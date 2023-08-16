import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import WithNav from "./WithNav/WithNav";
import Products from "./components/Product/Products";
import { useEffect } from "react";
import { ProductDetailModal } from "./components/Product/ProductDetailsModel";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Routes>
        {/* Login route */}
        <Route path={"/login"} element={<Login />} />
        {/* Protected route */}
        <Route path="/" element={<WithNav />}>
          <Route path={"/products"} element={<Products />} />
          <Route path={"/products/:id"} element={<ProductDetailModal />} />
          <Route path={"/add_product"} element={<AddProduct />} />
          <Route path={"/edit_product"} element={<EditProduct />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
