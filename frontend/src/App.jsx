import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Products from "./pages/product/Products.jsx";
import AddProduct from "./pages/product/AddProduct.jsx";
import EditProduct from "./pages/product/EditProduct.jsx";
import Categories from "./pages/Categories.jsx";
import "./index.css";
import RootLayout from "./layouts/RootLayout.jsx";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
