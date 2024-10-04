import Wrapper from "../../assets/wrappers/adminwrappers/DashboardSalesManagementWrapper"
import SalesHourlyChart from "./SalesHourlyChart";
import { useEffect, useState } from "react";
import { SalesDashboard } from "../../config/routeApi/owner";
import { toastError } from "../../helpers/helpers";

const SalesCard = ({title, amount})=> {


    return <div className="sales-card">
        <p className="sales-title">{title}</p>
        <p className="sales-amount">₹{amount}</p>
    </div>
};


const SalesManagement = ()=> {

    
    const [salesData, setSalesData] = useState([
        {title: 'Total Sales', value: 0},
        {title: 'Previous Hour Sales', value: 0},
        {title: 'Previous Hour Higest Billing Amount', value: 0},
        {title: 'Online Order Sales', value: 0},
        {title: 'Take Away Sales', value: 0},
        {title: 'Dine-in Sales', value: 0},
    ]);

    const [twoHourlySalesData, setTwoHourlySalesData] = useState([
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
              const response = await SalesDashboard(dates || {});
              // console.log(response.data);
        
              if (response.data.success) {
                // data as cards

                setSalesData([
                    {title: 'Total Sales', value: response.data.TotalSalesPerDay?.totalAmount || 0},
                    {title: 'Previous Hour Sales', value: response.data.hourlySalesAmount || 0},
                    {title: 'Previous Hour Higest Billing Amount', value: response.data.HighestBillingAmountPerHr || 0},
                    {title: 'Online Order Sales', value: response.data.TotalOnlineSales || 0},
                    {title: 'Take Away Sales', value: response.data.totalTakeAwayTotalAmount || 0},
                    {title: 'Dine-in Sales', value: response.data.totalDineInPerDay || 0},
                ]);

                // console.log(response.data.twoHourlySalesData);
                setTwoHourlySalesData(response.data.twoHourlySalesData);


                

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
            <p className="dashboard-title">Sales Management</p>
            <div className="sales-container">

            <div className="sales-and-chart-container">
                <div className="sales-horizontal">
                    {salesData.slice(0, 3).map(sale=> <SalesCard key={sale.title} title={sale.title} amount={sale.value} />)}
                </div>
                    <SalesHourlyChart data={twoHourlySalesData} />
            </div>
            <div className="sales-vertical">
            {salesData.slice(3, 6).map(sale=> <SalesCard key={sale.title} title={sale.title} amount={sale.value} />)}

            </div>
            </div>
        </div>
    </Wrapper>
};

export default SalesManagement;

