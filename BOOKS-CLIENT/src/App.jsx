import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
// import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Login,
  ForgotPassword,
  Register,
  Error,
  Landing,
  EmailVerification,
  LinkVerification,
  RestaurantHome,
  AdminLogin,
  IndividualLogin,
  IndividualForgotPassword,
} from "./pages";

import {
  DashboardLayout,
  AddBasicDetails,
  AddCustomer,
  AddEmploymentDetails,
  BasicDetails,
  Customers,
  Dashboard,
  EmploymentDetails,
  Passbook as OldPassbook,
  Settings,
  AddNewAccess,
  Support,
  SalesManagement,
  TotalSales,
  OnlineOrders,
  TakeAway,
  Dining,
  VendorManagement,
  Invoice,
  VendorSettings,
  AddInvoice,
  AddVendor,
  UpdateInvoice,
  UpdateVendor,
  UpdateCustomer,
  UpdateBasicDetails,
  UpdateEmploymentDetails,
  MenuManagement,
  Categories,
  Menu,
  AddNewMenuItem,
  UpdateMenuItem,
  UpdateEmployeeAccess,
  AddTable,
  UpdateTable,
  PosManagement,
  TableDetails,
  CaptainPassbook,
  CaptainManagement,
  TableManagement,
  AddTableForTableManagement,
  UpdateTableInTableManagement,
  OrderOnHoldForTakeAway
} from "./pages/admindashboardpages";

import {
  OrderManagement,
} from "./pages/admindashboardpages/ordermanagement/exports"

// import OrderManagement from "./pages/admindashboardpages/ordermanagement/OrderManagement"

import {
  PosCustomers,
  PosDashboard,
  PosDashboardLayout,
  PosSelectCustomer,
  PosUpdateCustomer,
  PosSupport,
  PosLeads,
  PosAddLead,
  PosUpdateLead,
  PosPassbook,
  // PosAddTodaysExpenses,
  PosUpdateTodaysExpenses,
  PosMenu,
  PosTakeAwayPage,
  PosDineInPage,
} from "./pages/posdashboardpages";
import {
  CaptainDashboardLayout,
  CaptainDashboard,
  CaptainCustomers,
  CaptainSelectCustomer,
  CaptainUpdateCustomer,
  CaptainSupport,
  CaptainLeads,
  CaptainAddLead,
  CaptainUpdateLead,
  CaptainMenu,
} from "./pages/captaindashboard";

// backend imports
import DashboardAccess from "./AcessManager/AccessAtDashboard";
import ReduxReset from "./AcessManager/ReduxReset";
import EmployAccess from "./AcessManager/EmployAccess";
import PosAccess from "./AcessManager/PosAccess";
import CaptainAccess from "./AcessManager/CaptainAccess";
import { Toaster } from "react-hot-toast";
import AddMenuCategory from "./pages/admindashboardpages/menumanagement/AddMenuCategory";
import UpdateMenuCategory from "./pages/admindashboardpages/menumanagement/UpdateMenuCategory";
import PosOnlineData from "./pages/posdashboardpages/posonline/PosOnlineData";
import PosAddTodaysOpeningBalance from "./pages/posdashboardpages/pospassbook/PosAddTodaysOpeningBalance";
import PosAddTodaysExpense from "./pages/posdashboardpages/pospassbook/PosAddTodaysExpense";
import PosAddTodaysClosing from "./pages/posdashboardpages/pospassbook/PosAddTodaysClosing";
import TodaysOpening from "./pages/posdashboardpages/pospassbook/TodaysOpening";
import TodaysExpense from "./pages/posdashboardpages/pospassbook/TodaysExpense";
import PosTodaysClosing from "./pages/posdashboardpages/pospassbook/PosTodaysClosing";
import StockManagement from "./pages/admindashboardpages/stockmanagement/StockManagemnet";
import StockIn from "./pages/admindashboardpages/stockmanagement/StockIn";
import StockOut from "./pages/admindashboardpages/stockmanagement/StockOut";
import Features from "./pages/Features";
import BookADemo from "./pages/BookADemo";
import DemoBooked from "./pages/DemoBooked";
import BillingManagement, { billingManagementLoader } from "./pages/admindashboardpages/billingmanagement/BillingManagement";
import OnlineOrder, { getTotalAndHoldOrdersCountForOnline } from "./pages/admindashboardpages/billingmanagement/OnlineOrder";
import TakeawayOrder, { getTotalAndHoldOrdersCountForTakeAway } from "./pages/admindashboardpages/billingmanagement/TakeawayOrder";
import DineinOrder from "./pages/admindashboardpages/billingmanagement/DineinOrder";
import OrderCharts, { orderChartsLoader } from "./components/billingmanagement/OrderCharts";
import Order, { orderLoader } from "./pages/admindashboardpages/billingmanagement/Order";
import OpeningReport, { openingReportLoader } from "./pages/admindashboardpages/billingmanagement/OpeningReport";
import AddOpeningReport, { addOpeningReportLoader } from "./pages/admindashboardpages/billingmanagement/AddOpeningReport";
import AddExpenseReport from "./pages/admindashboardpages/billingmanagement/AddExpenseReport";
import ExpenseReport, { expenseReportLoader } from "./pages/admindashboardpages/billingmanagement/ExpenseReport";
import Passbook, { passbookReportLoader } from "./pages/admindashboardpages/billingmanagement/Passbook";
import AddClosingReport, { addClosingReportLoader } from "./pages/admindashboardpages/billingmanagement/AddClosingReport";
import ComingSoon from "./pages/ComingSoon";
import AddAggregator from "./pages/admindashboardpages/menumanagement/AddAggregator";
import AddCusine from "./pages/admindashboardpages/menumanagement/AddCusine";
import AddMenuItem, { addMenuItemLoader } from "./pages/admindashboardpages/menumanagement/AddMenuItem";
import Cuisines, { cuisinesLoader } from "./pages/admindashboardpages/menumanagement/Cuisines";
import Aggregators, { aggregatorsLoader } from "./pages/admindashboardpages/menumanagement/Aggregators";
import EmployeeManagement from "./pages/admindashboardpages/employeemanagement/EmployeeManagement";
import AddEmployee from "./pages/admindashboardpages/employeemanagement/AddEmployee";
import Employees from "./pages/admindashboardpages/employeemanagement/Employees";
import { totalCountOfAddedTableDataLoader } from "./pages/admindashboardpages/tablemanagement/TableManagement";
import { totalOrderDetailsForSelectedTable } from "./pages/admindashboardpages/tablemanagement/UpdateTableInTableManagement";
import TablesOnHold from "./pages/admindashboardpages/billingmanagement/TablesOnHold";
import TableOnHoldAndAvailable from "./pages/admindashboardpages/billingmanagement/TableOnHoldAndAvailable";
import { getTablesOnHoldDataFn } from "./pages/admindashboardpages/billingmanagement/TablesOnHold";
import { getHoldAndAvailableTableDataFn } from "./pages/admindashboardpages/billingmanagement/TableOnHoldAndAvailable";
import { fetchHoldBillsFn } from "./pages/admindashboardpages/billingmanagement/OrderOnHoldForTakeAway";
import TotalOrdersForTakeAway from "./pages/admindashboardpages/billingmanagement/TotalOrdersForTakeAway";
import OrderOnHoldForOnline, { fetchHoldBillsForOnlineFn } from "./pages/admindashboardpages/billingmanagement/OrderOnHoldForOnline";
import TotalOrdersForOnline from "./pages/admindashboardpages/billingmanagement/TotalOrdersForOnline";
import UpdateOrder, { getOrderDetails } from "./pages/admindashboardpages/billingmanagement/UpdateOrder";
import NewOrderCharts, { newOrderChartsLoader } from "./components/ordermanagement/NewOrderCharts";
import { getTotalSalesDataFn } from "./pages/admindashboardpages/salesmanagement/TotalSales";
import HourlySales from "./pages/admindashboardpages/salesmanagement/HourlySales";
import HighestBillingAmount from "./pages/admindashboardpages/salesmanagement/HighestBillingAmount";
import OnlineOrderManagement from "./pages/admindashboardpages/ordermanagement/OnlineOrderManagement";
import TakeAwayOrderManagement from "./pages/admindashboardpages/ordermanagement/TakeAwayOrderManagement";
import DineInOrderManagement from "./pages/admindashboardpages/ordermanagement/DineInOrderManagement";
// import src from "react-select/dist/declarations/src";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "features",
        element: <Features />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "link-verification/token/:token",
        element: <LinkVerification />,
      },
      {
        path: "email-verification",
        element: <EmailVerification />,
      },
      {
        path: "book-a-demo",
        element: <BookADemo />,
      },
      {
        path: "demo-booked",
        element: <DemoBooked />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "admin-login",
        element: (
          <>
            <ReduxReset />
            <AdminLogin />,
          </>
        ),
      },
      {
        path: "employee-login",
        element: (
          <>
            <EmployAccess />
            <IndividualLogin />,
          </>
        ),
      },
      {
        path: "individual-forgot-password",
        element: <IndividualForgotPassword />,
      },
      {
        path: "restaurant-home",
        element: (
          <>
            <ReduxReset />
            <RestaurantHome />
          </>
        ),
      },
      {
        path: "dashboard",
        element: (
          <>
            <DashboardAccess />
            <DashboardLayout />
          </>
        ),
        children: [
          // {
          //   index: true,
          //   element: <Dashboard />,
          // },
          {
            path: 'billing-management',
            element: <BillingManagement />,
            loader: billingManagementLoader,
            children: [
              {
                index: true,
                element: <OrderCharts />,
                loader: orderChartsLoader,
              },
              {
                path: 'online-order',
                element: <OnlineOrder />,
                loader: getTotalAndHoldOrdersCountForOnline
              },
              {
                path: 'takeaway-order',
                element: <TakeawayOrder />,
                loader: getTotalAndHoldOrdersCountForTakeAway
              },
              {
                path: 'dinein-order',
                element: <DineinOrder />
              }
            ]
          },
          {
            path: "billing-management/dinein-order/tables-on-hold",
            element: <TablesOnHold />,
            loader: getTablesOnHoldDataFn
          },
          {
            path: "billing-management/dinein-order/tables-on-hold-and-available",
            element: <TableOnHoldAndAvailable />,
            loader: getHoldAndAvailableTableDataFn
          },
          {
            path: "billing-management/takeaway-order/orders-on-hold",
            element: <OrderOnHoldForTakeAway />,
            loader: fetchHoldBillsFn
          },
          {
            path: "billing-management/takeaway-order/total-orders",
            element: <TotalOrdersForTakeAway />
          },
          {
            path: "billing-management/online-order/orders-on-hold",
            element: <OrderOnHoldForOnline />,
            loader: fetchHoldBillsForOnlineFn
          },
          {
            path: "billing-management/online-order/total-orders",
            element: <TotalOrdersForOnline />
          },
          {
            path: 'billing-management/order',
            loader: orderLoader,
            element: <Order />
          },
          {
            path: 'billing-management/update-order',
            element: <UpdateOrder />,
            loader: getOrderDetails
          },
          {
            path: 'billing-management/opening-report',
            element: <OpeningReport />,
            loader: openingReportLoader,
          },
          {
            path: 'billing-management/opening-report/add-report',
            element: <AddOpeningReport />,
            loader: addOpeningReportLoader
          },
          {
            path: 'billing-management/expense-report',
            element: <ExpenseReport />,
            loader: expenseReportLoader,
          },
          {
            path: 'billing-management/expense-report/add-report',
            element: <AddExpenseReport />,
          },
          {
            path: 'billing-management/passbook',
            element: <Passbook />,
            loader: passbookReportLoader,
          },
          {
            path: 'billing-management/passbook/closing-report',
            element: <AddClosingReport />,
            loader: addClosingReportLoader,
          },
          // {
          //   path: "pos-management",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <PosManagement />
          //     },
          //     {
          //       path: "pos-passbook",
          //       element: <OldPassbook />,
          //     },

          //   ],
          // },
          {
            path: 'sales-management',
            element: <Outlet />,
            // loader: getTotalSalesDataFn,
            children: [
              {
                index: true,
                element: <SalesManagement />,
              },
              {
                path: 'total-sales',
                element: <TotalSales />,
                // loader: getTotalSalesDataFn,
              },
              {
                path: "hourly-sales",
                element: <HourlySales />,
              },
              {
                path: "highest-billing",
                element: <HighestBillingAmount />,
              },
              {
                path: "online-sales",
                element: <OnlineOrders />,
              },
              {
                path: "take-away",
                element: <TakeAway />,
              },
              {
                path: "dining-sales",
                element: <Dining />,
              },
            ],
          },
          {
            path: "order-management",
            element: <OrderManagement />,
            loader: billingManagementLoader,
            children: [
              {
                index: true,
                element: <NewOrderCharts />,
                loader: newOrderChartsLoader
              },
              {
                path: 'online-order',
                element: <OnlineOrderManagement />,
              }, {
                path: 'takeaway-order',
                element: <TakeAwayOrderManagement />,
              },
              {
                path: 'dinein-order',
                element: <DineInOrderManagement />,
              },
            ]
          },
          // {
          //   path: "vendor-management",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <VendorManagement />,
          //     },
          //     {
          //       path: "invoice",
          //       element: <Invoice />,
          //     },
          //     {
          //       path: "add-invoice",
          //       element: <AddInvoice />,
          //     },
          //     {
          //       path: "update-invoice",
          //       element: <UpdateInvoice />,
          //     },
          //     {
          //       path: "vendor-settings",
          //       element: <VendorSettings />,
          //     },
          //     {
          //       path: "add-vendor",
          //       element: <AddVendor />,
          //     },
          //     {
          //       path: "update-vendor",
          //       element: <UpdateVendor />,
          //     },
          //   ],
          // },
          {
            path: "employee-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <EmployeeManagement />,
              },
              {
                path: 'employees',
                element: <Employees />,
              },
              {
                path: 'employees/add-employee',
                element: <AddEmployee />,
              },
              {
                path: "basic-details",
                element: <BasicDetails />,
              },
              {
                path: "add-basic-details",
                element: <AddBasicDetails />,
              },
              {
                path: "update-basic-details/:employId",
                element: <UpdateBasicDetails />,
              },
              {
                path: "employment-details",
                element: <EmploymentDetails />,
              },
              {
                path: "add-employment-details",
                element: <AddEmploymentDetails />,
              },
              {
                path: "update-employment-details/:employId",
                element: <UpdateEmploymentDetails />,
              },
            ],
          },
          // {
          //   path: "customer-management",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <Customers />,
          //     },
          //     {
          //       path: "add-customer",
          //       element: <AddCustomer />,
          //     },
          //     {
          //       path: "update-customer/:Id",
          //       element: <UpdateCustomer />,
          //     },
          //   ],
          // },
          // {
          //   path: "stock-management",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <StockManagement />,
          //     }, {
          //       path: "stock-in",
          //       element: <StockIn />,
          //     },
          //     {
          //       path: "stock-out",
          //       element: <StockOut />,
          //     },
          //   ],
          // },
          {
            path: "menu-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <MenuManagement />,
              },
              {
                path: 'aggregators',
                element: <Aggregators />,
                loader: aggregatorsLoader
              },
              {
                path: 'aggregators/add-aggregator',
                element: <AddAggregator />,
              },
              {
                path: 'cuisines',
                element: <Cuisines />,
                loader: cuisinesLoader
              },
              {
                path: 'cuisines/add-cuisine',
                element: <AddCusine />,
              },
              {
                path: 'menu/add-menu-item',
                element: <AddMenuItem />,
                loader: addMenuItemLoader
              },
              {
                path: "menu",
                element: <Menu />,
              },
              {
                path: "add-new-menu-item",
                element: <AddNewMenuItem />,
              },
              {
                path: "update-menu-item/:menuId",
                element: <UpdateMenuItem />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "new-categories",
                element: <AddMenuCategory />,
              },
              {
                path: "update-category/:categoryId",
                element: <UpdateMenuCategory />,
              },
            ],
          },
          // {
          //   path: "captain-management",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <CaptainManagement />,
          //     },
          //     {
          //       path: "table-details",
          //       element: <TableDetails />
          //     },
          //     {
          //       path: "add-table",
          //       element: <AddTable />,
          //     },
          //     {
          //       path: "update-table/:tableId",
          //       element: <UpdateTable />,
          //     },
          //     {
          //       path: "captain-passbook",
          //       element: <CaptainPassbook />
          //     },
          //   ],
          // },
          {
            path: "table-management",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <TableManagement />,
                loader: totalCountOfAddedTableDataLoader
              },
              {
                path: "add-table",
                element: <AddTableForTableManagement />
              },
              {
                path: "table-details",
                element: <TableDetails />
              },
              {
                path: "update-table/:tableId",
                element: <UpdateTableInTableManagement />,
                loader: totalOrderDetailsForSelectedTable
              },
              {
                path: "captain-passbook",
                element: <CaptainPassbook />
              },
            ],
          },
          // {
          //   path: "settings",
          //   element: <Outlet />,
          //   children: [
          //     {
          //       index: true,
          //       element: <Settings />,
          //     },
          //     {
          //       path: "add-new-access",
          //       element: <AddNewAccess />,
          //     },
          //     {
          //       path: "update-employee-access",
          //       element: <UpdateEmployeeAccess />,
          //     },
          //   ],
          // },
          // {
          //   path: "support",
          //   element: <Support />,
          // },
        ],
      },
      // {
      //   path: "pos-dashboard",
      //   element: (
      //     <>
      //       <PosAccess />
      //       <PosDashboardLayout />
      //     </>
      //   ),
      //   children: [
      //     {
      //       index: true,
      //       element: (
      //         <>
      //           <PosDashboard />,
      //         </>
      //       ),
      //     },

      //     {
      //       path: "pos-menu",
      //       element: <PosMenu />,
      //     },
      //     {
      //       path: "pos-takeaway",
      //       element: <PosTakeAwayPage />,
      //     },
      //     {
      //       path: "pos-online",
      //       element: <PosOnlineData />,
      //     },
      //     {
      //       path: "pos-dinein",
      //       element: <PosDineInPage />,
      //     },
      //     {
      //       path: "pos-leads",
      //       element: <Outlet />,
      //       children: [
      //         {
      //           index: true,
      //           element: <PosLeads />,
      //         },
      //         {
      //           path: "pos-add-lead",
      //           element: <PosAddLead />,
      //         },
      //         {
      //           path: "pos-update-lead/:leadId",
      //           element: <PosUpdateLead />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "pos-customers",
      //       element: <Outlet />,
      //       children: [
      //         {
      //           index: true,
      //           element: <PosCustomers />,
      //         },
      //         {
      //           path: "select-customer",
      //           element: <PosSelectCustomer />,
      //         },
      //         {
      //           path: "update-customer",
      //           element: <PosUpdateCustomer />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "pos-passbook",
      //       element: <Outlet />,
      //       children: [
      //         {
      //           index: true,
      //           element: <PosPassbook />,
      //         },
      //         {
      //           path: "todays-opening",
      //           element: <TodaysOpening />,
      //         },
      //         {
      //           path: "todays-closing",
      //           element: <PosTodaysClosing />,
      //         },
      //         {
      //           path: "todays-expense",
      //           element: <TodaysExpense />,
      //         },
      //         {
      //           path: "add-todays-expense",
      //           element: <PosAddTodaysExpense />,
      //         },
      //         {
      //           path: "add-todays-opening-balance",
      //           element: <PosAddTodaysOpeningBalance />,
      //         },
      //         {
      //           path: "add-todays-closing",
      //           element: <PosAddTodaysClosing />,
      //         },
      //         {
      //           path: "update-todays-closing",
      //           element: <PosUpdateTodaysExpenses />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "support",
      //       element: <PosSupport />,
      //     },
      //   ],
      // },
      // {
      //   path: "captain-dashboard",
      //   element: (
      //     <>
      //       <CaptainAccess />
      //       <CaptainDashboardLayout />
      //     </>
      //   ),
      //   children: [
      //     {
      //       index: true,
      //       element: <CaptainDashboard />,
      //     },
      //     {
      //       path: "captain-menu",
      //       element: <CaptainMenu />,
      //     },
      //     {
      //       path: "captain-leads",
      //       element: <Outlet />,
      //       children: [
      //         {
      //           index: true,
      //           element: <CaptainLeads />,
      //         },
      //         {
      //           path: "captain-add-lead",
      //           element: <CaptainAddLead />,
      //         },
      //         {
      //           path: "captain-update-lead/:leadId",
      //           element: <CaptainUpdateLead />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "captain-customers",
      //       element: <Outlet />,
      //       children: [
      //         {
      //           index: true,
      //           element: <CaptainCustomers />,
      //         },
      //         {
      //           path: "select-customer",
      //           element: <CaptainSelectCustomer />,
      //         },
      //         {
      //           path: "update-customer",
      //           element: <CaptainUpdateCustomer />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "support",
      //       element: <CaptainSupport />,
      //     },
      //   ],
      // },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
