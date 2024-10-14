
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import TableGridForTableOnHold from "@/components/tablemanagement/TableGridForTableOnHold";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetTablesOnHoldData } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";

const TablesOnHold = () => {
    const [activeTab, setActiveTab] = useState(0);

    const { HoldedTwoSeaterData = [], HoldedFourSeaterData = [], HoldedSixSeaterData = [], HoldedEightSeaterData = [] } = useLoaderData();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const onHold = queryParams.get("on-hold");
    const totalTables = queryParams.get("total-table");

    return (
        <ScrollArea className="h-screen pb-20 pr-10">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="w-full flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/billing-management/dinein-order">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Tables On Hold</p>
                    </div>
                    <div className="flex gap-4">
                        <p className="">
                            Tables On Hold <span className="font-bold">{onHold}</span>{" "}
                            from <span className="font-bold">{totalTables}</span> results
                        </p>
                    </div>
                </div>
                <div className="w-full bg-white pt-3 pl-2 pr-2 items-center flex flex-col rounded-[10px] gap-4">
                    <div className="w-[99%] h-[49px] flex items-center bg-color-C1E4FF rounded-[6px]">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`flex justify-center items-center w-[317px] 
                                ${index === 0 ? 'rounded-l-lg' : ''} 
                                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}
                                ${activeTab === index ? 'bg-color-1F303C text-white h-[49px]' : 'bg-color-C1E4FF text-black h-[36px]'}
                                ${index === 1 ? 'border-l border-r border-color-50758F' : ''} 
                                ${index === 2 ? 'border-r border-color-50758F' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >

                                {tab}
                            </button>
                        ))}
                    </div>
                    <TableGridForTableOnHold holdedTableData={
                        activeTab === 0 ? HoldedTwoSeaterData : 
                        activeTab === 1 ? HoldedFourSeaterData : 
                        activeTab === 2 ? HoldedSixSeaterData : 
                        activeTab === 3 ? HoldedEightSeaterData : []
                    } />
                </div>
            </div>
        </ScrollArea>
    )
}

export default TablesOnHold;

const tabs = ['2 Seater', '4 Seater', '6 Seater', '8 Seater'];

export const getTablesOnHoldDataFn = async () => {
    try {
        const { data } = await GetTablesOnHoldData();
        console.log('data:', data);
        let HoldedTwoSeaterData, HoldedFourSeaterData, HoldedSixSeaterData, HoldedEightSeaterData;
        if(data?.success) {
            HoldedTwoSeaterData = data?.onHoldTableData[0]?.tables
            HoldedFourSeaterData = data?.onHoldTableData[1]?.tables
            HoldedSixSeaterData = data?.onHoldTableData[2]?.tables
            HoldedEightSeaterData = data?.onHoldTableData[3]?.tables
        }

        return { HoldedTwoSeaterData, HoldedFourSeaterData, HoldedSixSeaterData, HoldedEightSeaterData }
    } catch(error) {
        console.log("Error in getTablesOnHoldDataFn TablesOnHold.jsx :", error);
    }
}