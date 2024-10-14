import Wrapper from "../../assets/wrappers/adminwrappers/DashboardSalesManagementWrapper"
import SalesHourlyChart from "./SalesHourlyChart";
import { useEffect, useState } from "react";
import { OrderDataAtAdmin, SalesDashboard } from "../../config/routeApi/owner";
import { toastError } from "../../helpers/helpers";
import OrderHourlyChart from "./OrderHourlyChart";

const SalesCard = ({title, amount})=> {


    return <div className="sales-card">
        <p className="sales-title">{title}</p>
        <p className="sales-amount">{amount}</p>
    </div>
};


const OrderManagement = ()=> {

    
    const [orderData, setOrderData] = useState([
        {title: 'Total Orders', value: 0},
        {title: 'Hourly Orders', value: 0},
        {title: 'Highest Order Item', value: 0},
        {title: 'Online Orders', value: 0},
        {title: 'Take-Away Orders', value: 0},
        {title: 'Dine-in Orders', value: 0},
    ]);

    const [twoHourlyOrdersData, setTwoHourlyOrdersData] = useState([
        { time: '12 AM', value: 500 },
        { time: '2 AM', value: 700 },
        { time: '4 AM', value: 200 },
        { time: '6 AM', value: 900 },
        { time: '8 AM', value: 1200 },
        { time: '10 AM', value: 1500 },
        { time: '12 PM', value: 1800 },
        { time: '2 PM', value: 1300 },
        { time: '4 PM', value: 1000 },
        { time: '6 PM', value: 1100 },
        { time: '8 PM', value: 1600 },
        { time: '10 PM', value: 1700 },
      ]);


    useEffect(()=> {
        const handleSalesDashboard = async (dates) => {
            // console.log("here");
            try {
              // console.log("here");
              const response = await OrderDataAtAdmin();
              // console.log({...response.data, CompleteOrder: []});
        
              if (response.data.success) {
                // data as cards

                setOrderData([
                  {title: 'Total Orders', value: response.data.TodayOrdersPerDay},
                  {title: 'Hourly Orders', value: response.data.TodayOrdersPerDay},
                  {title: 'Highest Order Item', value: response.data.mostQuantity},
                  {title: 'Online Orders', value: response.data.OnlineAggregates[0] || 0},
                  {title: 'Take-Away Orders', value: response.data.TakeAwayPerHour},
                  {title: 'Dine-in Orders', value: response.data.DineInPerHour},
              ]);

                // console.log(response.data.twoHourlySalesData);
                setTwoHourlyOrdersData(response.data.twoHourlyOrderData);


                

                // console.log(response)
                
              } else {
                toastError(response.data.message);
              }
            } catch (error) {
              console.log(error);
            }
          };

          const todayDate = new Date().toISOString().split("T")[0];
          const defaultDates = { start: todayDate, end: todayDate };
      handleSalesDashboard(defaultDates);
    }, []);

    

    return <Wrapper>
        <div>
            <p className="dashboard-title">Order Management</p>
            <div className="sales-container">

            <div className="sales-and-chart-container">
                <div className="sales-horizontal">
                    {orderData.slice(0, 3).map(sale=> <SalesCard key={sale.title} title={sale.title} amount={sale.value} />)}
                </div>
                    <OrderHourlyChart data={twoHourlyOrdersData} />
            </div>
            <div className="sales-vertical">
            {orderData.slice(3, 6).map(sale=> <SalesCard key={sale.title} title={sale.title} amount={sale.value} />)}

            </div>
            </div>
        </div>
    </Wrapper>
};

export default OrderManagement;

