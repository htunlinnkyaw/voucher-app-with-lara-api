import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ProductPage from "../pages/ProductPage";
import SalePage from "../pages/SalePage";
import VoucherPage from "../pages/VoucherPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import VoucherDetailPage from "../pages/VoucherDetailPage";
import DashBoardPage from "../pages/DashboardPage";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <DashBoardPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/create",
        element: <ProductCreatePage />,
      },
      {
        path: "/product/edit/:id",
        element: <ProductEditPage />,
      },
      {
        path: "/sale",
        element: <SalePage />,
      },
      {
        path: "/voucher",
        element: <VoucherPage />,
      },
      {
        path: "/voucher/detail/:id",
        element: <VoucherDetailPage />,
      },
    ],
  },
]);

export default routes;
