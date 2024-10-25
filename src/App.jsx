import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProductManagementPage from "./pages/admin/ProductManagementPage.jsx";
import CreateProductPage from "./pages/admin/CreateProductPage.jsx";
import EditProductPage from "./pages/admin/EditProductPage.jsx";
import CounterPage from "./pages/CounterPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { useHydration } from "./hooks/useHydration.js";
import HistoryPage from "./pages/HistoryPage.jsx";
import HistoryDetailPage from "./pages/HistoryDetailPage.jsx";
import ExpressTestPage from "./pages/exspress/ExpressTestPage.jsx";
import ExpressLoginPage from "./pages/exspress/ExpressLoginPage.jsx";
import ExpressHomePage from "./pages/exspress/ExpressHomePage.jsx";
import ExpressProductDetailPage from "./pages/exspress/ExpressProductDetailPage.jsx";
import ExpressCreateProductPage from "./pages/exspress/admin/ExpressCreateProductPage.jsx";
import ExpressRegisterPage from "./pages/exspress/ExpressRegisterPage.jsx";
import { ExpressHeader } from "./components/ExpressHeader.jsx";
import ExpressCartPage from "./pages/exspress/ExpressCartPage.jsx";
import ExpressHistoryPage from "./pages/exspress/ExpressHistoryPage.jsx";
import ExpressHistoryDetailPage from "./pages/exspress/ExpressHistoryDetailPage.jsx";
import ExpressProductManagementPage from "./pages/exspress/admin/ExpressProductManagementPage.jsx";
import ExpressEditProductPage from "./pages/exspress/admin/ExpressEditProductPage.jsx";
import axios from "axios";
import ExpressLoginPageJWT from "./pages/exspress/ExpressLoginPageJWT.jsx";
import ExpressTestHomePage from "./pages/exspress/ExpressTestHomePage.jsx";






function App() {
  const location = useLocation()


  const { isHydrated } = useHydration()

  if (!isHydrated) {
    return <div>...Loading</div>
  }

  return (
    <>
      {
        location.pathname.startsWith("/admin") ? null : <ExpressHeader />
      }


      <Routes>
        <Route path="/" Component={ExpressHomePage} />
        <Route path="/test" Component={ExpressTestHomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />
        <Route path="/counter" Component={CounterPage} />
        <Route path="/history" Component={HistoryPage} />
        <Route path="/history/:transactionId" Component={HistoryDetailPage} />

        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>
        <Route path="*" Component={NotFoundPage} />

        <Route path="/express">
          <Route path="login" Component={ExpressLoginPage} />
          <Route path="loginjwt" Component={ExpressLoginPageJWT} />
          <Route path="register" Component={ExpressRegisterPage} />
          <Route path="" Component={ExpressHomePage} />
          <Route path="products/:productId" Component={ExpressProductDetailPage} />
          <Route path="cart" Component={ExpressCartPage} />
          <Route path="history" Component={ExpressHistoryPage} />
          <Route path="history/:transactionId" Component={ExpressHistoryDetailPage} />
        </Route>

        <Route path="/express/admin">
          <Route path="products/" Component={ExpressProductManagementPage} />
          <Route path="products/create" Component={ExpressCreateProductPage} />
          <Route path="products/edit/:productId" Component={ExpressEditProductPage} />
        </Route>
      </Routes>


      {
        location.pathname.startsWith("/admin") ? null : <Footer />
      }
    </>
  )
}

export default App;