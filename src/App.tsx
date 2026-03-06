import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/Home";
import BookDetail from "./pages/BookDetail";
import BookList from "./pages/BookList";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MyCart from "@/pages/Cart";
import UserPage from "./pages/UserPage";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "sonner";
import { useAuthRestore } from "./features/auth/useAuthRestore";
import PostCheckout from "./pages/PostCheckout";

function App() {
  useAuthRestore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH Header */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/books" element={<BookList />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/success"
            element={
              <ProtectedRoute>
                <PostCheckout />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Pages WITHOUT Header */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
}

export default App;
