import {
    createBrowserRouter, Outlet,
} from "react-router-dom";

// loaders
import { loader as authLoader } from "../components/Auth";
import { loader as SignOutLoader } from "../components/SignOut";
import { loader as StoreViewForUserLoader } from "../components/StoreViewForUser";
import { loader as StoreViewForUserGridProductLoader } from "../components/StoreViewForUserGridProduct";
import { loader as SetAddressAndPayLoader } from "../components/SetAddressAndPay";
import { loader as UserAccountLoader } from "../components/UserAccount";
import { loader as SignupLoader } from "./../pages/Signup";
import { loader as LoginLoader } from "./../pages/Login";
import { loader as LandingLoader } from "./../pages/Landing";
import { loader as OrderDetailsLoader } from "../components/OrderDetails";
import { loader as CustomerCareLoader } from "./../pages/CustomerCare";
import { loader as RazorPayGatewayLoader } from "../components/paymentPages/IndiaPayment/RazorPayGateway";
// import { loader as GlobalSettingsLoader } from "../components/GlobalSettings";
// import { loader as AllExploredStoresLoader } from "../components/AllExploredStores";
// import { loader as StoreAuthLoader } from "../components/StoreAuth";
// import { loader as CreateStoreLoader } from "../components/CreateStore";
// import { loader as StoreSettingsLoader } from "../components/StoreSettings";
// import { loader as ImportProductsLoader } from "../components/Import/ImportProducts";
// import { loader as ManageProductsLoader } from "../components/ManageProducts";
// import { loader as MyStoreEditProductLoader } from "../components/MyStoreEditProduct";
// import { loader as MyStoreSettingsLoader } from "../components/MyStoreSettings";
// import { loader as StoreDashboardLoader } from "../components/StoreDashboard";
// import { loader as AddNewProductLoader } from "../components/AddNewProduct";

import Landing from "./../pages/Landing"
import Signup from './../pages/Signup';
import Error404Page from './../components/Error404Page'
import Login from './../pages/Login';
import ForgotPassword from './../pages/ForgotPassword';
import Auth from "../components/Auth";
import UserMenu from "../components/UserMenu";
import SignOut from "../components/SignOut";
import StoreViewForUser from "../components/StoreViewForUser";
import StoreViewForUserGrid from "../components/StoreViewForUserGrid";
import StoreViewForUserGridProduct from "../components/StoreViewForUserGridProduct";
import UserNotifications from "../components/UserNotifications";
import UserBag from "../components/UserBag";
import SetAddressAndPay from "../components/SetAddressAndPay";
// import PaytmCheckout from "../components/paymentPages/IndiaPayment/PaytmCheckout";
import UserAccount from "../components/UserAccount";
import PreviousOrders from "../components/PreviousOrders";
import OrderDetails from "../components/OrderDetails";
import Search from "../components/Search";
import CustomerCare from "./../pages/CustomerCare";
import RazorPayGateway from "../components/paymentPages/IndiaPayment/RazorPayGateway";
// import GlobalSettings from "../components/GlobalSettings";
// import GlobalLoader from './../components/commons/GlobalLoader'
// import StoreAuth from "../components/StoreAuth";
// import Explore from "../components/Explore";
// import ExploreStores from "../components/ExploreStores";
// import CreateStore from "../components/CreateStore";
// import StoreMenu from "../components/StoreMenu";
// import StoreSettings from "../components/StoreSettings";
// import ImportProducts from "../components/Import/ImportProducts";
// import ImportProductsMenu from "../components/Import/ImportProductsMenu";
// import ImportProductsViaCsvFile from "../components/Import/ImportProductsViaCsvFile";
// import ManageProducts from "../components/ManageProducts";
// import MyStoreEditProduct from "../components/MyStoreEditProduct";
// import MyStoreSettings from "../components/MyStoreSettings";
// import BrazilPayment from "../components/paymentPages/BrazilPayment";
// import USPayment from "../components/paymentPages/USPayment";
// import TictagIntegration from "../components/Import/TictagIntegration";
// import StorePreviousOrders from "../components/StorePreviousOrders";
// import StoreDashboard from "../components/StoreDashboard";
// import TicTagStoreManagementMessage from "../pages/TicTagStoreManagementMessage";
// import AddNewProduct from "../components/AddNewProduct";

export const router = createBrowserRouter([
    {
        path: "/StoreNotFound",
        element: <Error404Page />,
        errorElement: <Error404Page />,
    },
    {
        path: "/",
        element: <Error404Page />,
    },
    {
        path: "/:storeId",
        element: <Outlet />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/:storeId",
                element: <Auth />,
                errorElement: <Error404Page />,
                loader: authLoader,
                children: [
                    {
                        path: "/:storeId/list",
                        element: <StoreViewForUser />,
                        errorElement: <Error404Page />,
                        loader: StoreViewForUserLoader,
                    },
                    {
                        path: "/:storeId/grid",
                        element: <StoreViewForUserGrid />,
                        loader: StoreViewForUserLoader,
                        children: [
                            {
                                path: "/:storeId/grid/:productId",
                                element: <StoreViewForUserGridProduct />,
                                loader: StoreViewForUserGridProductLoader,
                            },
                        ]
                    },
                    {
                        path: "/:storeId/search",
                        element: <Outlet />,
                        errorElement: <Error404Page />,
                        children: [
                            {
                                path: "/:storeId/search",
                                element: <Search />,
                                errorElement: <Error404Page />,
                            },
                            {
                                path: "/:storeId/search/list",
                                element: <StoreViewForUser fromSearch={true} />,
                                errorElement: <Error404Page />,
                                loader: StoreViewForUserLoader,
                            },
                            {
                                path: "/:storeId/search/grid",
                                element: <StoreViewForUserGrid fromSearch={true} />,
                                loader: StoreViewForUserLoader,
                                children: [
                                    {
                                        path: "/:storeId/search/grid/:productId",
                                        element: <StoreViewForUserGridProduct />,
                                        loader: StoreViewForUserGridProductLoader,
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: "/:storeId/notifications",
                        element: <UserNotifications /> ,
                    },
                    {
                        path: "/:storeId/bag",
                        element: <Outlet /> ,
                        children: [
                            {
                                path: "/:storeId/bag",
                                element: <UserBag />,
                            },
                            {
                                path: "/:storeId/bag/:orderId/addressAndPay",
                                element: <SetAddressAndPay />,
                                loader: SetAddressAndPayLoader,
                            },
                            // {
                            //     path: "/:storeId/bag/:orderId/IndiaPayment",
                            //     element: <PaytmCheckout />,
                            //     // loader: SetAddressAndPayLoader,
                            // },
                            {
                                path: "/:storeId/bag/:orderId/RazorPayGateway",
                                element: <RazorPayGateway />,
                                loader: RazorPayGatewayLoader,
                            },
                        ]
                    },
                    {
                        path: "/:storeId/menu",
                        element: <Outlet />,
                        children: [
                            {
                                path: "/:storeId/menu",
                                element: <UserMenu />,
                            },
                            {
                                path: "/:storeId/menu/account-settings",
                                element: <UserAccount />,
                                loader: UserAccountLoader,
                            },
                            // {
                            //     path: "/:storeId/menu/general-settings",
                            //     element: <GlobalSettings />,
                            //     loader: GlobalSettingsLoader,
                            // },
                            {
                                path: "/:storeId/menu/previous-orders",
                                element: <Outlet />,
                                children: [
                                    {
                                        path: "/:storeId/menu/previous-orders",
                                        element: <PreviousOrders />,
                                    },
                                    {
                                        path: "/:storeId/menu/previous-orders/:orderId",
                                        element: <OrderDetails />,
                                        loader: OrderDetailsLoader,
                                    },
                                ]
                            },
                            {
                                path: "/:storeId/menu/customer-service",
                                element: <CustomerCare />,
                                loader: CustomerCareLoader,
                            },
                        ]
                    },
                ]
            },
            {
                path: "/:storeId/landing",
                element: <Landing />,
                loader: LandingLoader,
                errorElement: <Error404Page />,
            },
            {
                path: "/:storeId/termsAndConditions",
                element: <h6>Terms And Conditions</h6>,
            },
            {
                path: "/:storeId/privacyPolicy",
                element: <h6>Privacy Policy</h6>,
            },
            {
                path: "/:storeId/signup",
                loader: SignupLoader,
                element: <Signup />,
            },
            {
                path: "/:storeId/login",
                loader: LoginLoader,
                element: <Login />,
            },
            {
                path: "/:storeId/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/:storeId/sign-out",
                element: <SignOut />,
                loader: SignOutLoader,
            },
        ]
    },
]);