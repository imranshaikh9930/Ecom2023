import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoutes";
// import secret from "./pages/user/secret";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserDashboard from "./pages/user/UserDashboard";
import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import AdminOrders from "./pages/admin/Orders";
import Search from "./pages/Search";
import CategoriesList from "./pages/CategoriesList";
import CategoriesView from "./pages/CategoriesView";
import Productview from "./pages/Productview";
import Cart from "./pages/Cartview";
import { Toaster } from "react-hot-toast";



function App() {
  function PageNotFound() {
    return (
      <div
        className="d-flex justify-content-center align-item-center "
        style={{ padding: "15rem" }}
      >
        404 | Page Not Found{" "}
      </div>
    );
  }
  return (
    <>
      <Router>
        <Menu />
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<CategoriesList />} />
          <Route path="/category/:slug" element={<CategoriesView />} />
          <Route path="/product/:slug" element={<Productview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<PrivateRoute />}>
          
            <Route path="user" element={<userDashboard />} />
          </Route>
         
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<adminDashboard />} />
          </Route> */}
           <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard/>} />
          <Route path="user/profile" element={<UserProfile/>} />
          <Route path="user/orders" element={<UserOrders/>} />
          
          
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
          <Route path="admin/orders" element={<AdminOrders />} />

        </Route>

          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </Router>
    </>
  );
}

export default App;
