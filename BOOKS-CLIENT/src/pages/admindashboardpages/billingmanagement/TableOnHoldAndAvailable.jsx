
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetHoldAndAvailableTableData } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";
import availableCircle from "@/assets/images/table-management/availableCircle.svg"
import onHoldCircle from "@/assets/images/table-management/onHoldCircle.svg"
import TableGridForTableOnHoldAndAvailable from "@/components/billingmanagement/TableGridForTableOnHoldAndAvailable";


const TableOnHoldAndAvailable = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [sortBy, setSortBy] = useState("reset");
    const { HoldedAndAvailableTwoSeaterData = [], HoldedAndAvailableFourSeaterData = [], HoldedAndAvailableSixSeaterData = [], HoldedAndAvailableEightSeaterData = [] } = useLoaderData();
    // console.log('HoldedAndAvailableEightSeaterData:', HoldedAndAvailableEightSeaterData)
    // console.log('HoldedAndAvailableSixSeaterData:', HoldedAndAvailableSixSeaterData)
    // console.log('HoldedAndAvailableFourSeaterData:', HoldedAndAvailableFourSeaterData)
    // console.log('HoldedAndAvailableTwoSeaterData:', HoldedAndAvailableTwoSeaterData)
    const locations = useLocation();
    const queryParams = new URLSearchParams(locations.search);
    const totalTablesCount = queryParams.get("total-tables");

    return (
        <ScrollArea className="h-screen pb-20 pr-10">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="w-full flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/billing-management/dinein-order">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Total Tables</p>
                    </div>
                    <div className="flex gap-4">
                        {/* <p className="">
                            Tables On Hold <span className="font-bold">{onHold}</span>{" "}
                            from <span className="font-bold">{totalTables}</span> results
                        </p> */}
                    </div>
                </div>
                <div className="w-full bg-white py-3 px-2 items-center flex flex-col rounded-[10px] gap-4">
                    <div className="border-0 w-[99%] h-[72px] flex justify-center items-center">
                        <div className="border-r-[2px] border-color-CCD7DF w-[36%] h-full flex flex-col justify-center gap-2">
                            <span className="text-color-1F303C m-0 p-0 text-[18px] font-roboto font-semibold">Table Legends</span>
                            <div className="border-0 flex justify-between w-[80%]">
                                <span className="flex gap-2 text-color-5C7A8F text-[16px] font-medium font-roboto justify-center items-center"><img className="w-[20px] h-[20px]" src={availableCircle} alt="" /> Available Tables</span>
                                <span className="flex gap-2 text-color-5C7A8F text-[16px] font-medium font-roboto justify-center items-center"><img className="w-[20px] h-[20px]" src={onHoldCircle} alt="" /> Tables On Hold</span>
                            </div>
                        </div>
                        <div className="border-r-[2px] border-color-CCD7DF w-[27%] h-full flex flex-col justify-center items-center">
                            <span className="font-semibold text-[16px] text-color-1F303C font-roboto m-0 p-0 relative top-[15px]">Total Tables</span>
                            <span className="font-black text-[50px] font-roboto text-color-80A1B9 m-0 p-0 relative">{totalTablesCount}</span>
                        </div>
                        <div className="border-0 w-[31%] h-full flex justify-end">
                            <div className="w-[253px] h-full flex flex-col justify-between">
                                <label htmlFor="sortByDuration" className="text-color-89A3B7 text-[16px] font-normal font-roboto">Sort by</label>
                                <select onChange={(event) => setSortBy(event.target.value)} name="sortByDuration" id="sortByDuration" className="cursor-pointer border-1 bg-[#F4FAFF] border-color-C6C6C6 w-full h-[42px] px-[12px] rounded-[7px] text-color-1F303C text-[16px] font-semibold font-roboto">
                                    <option value="">Select duration...</option>
                                    <option value="today">Today</option>
                                    <option value="reset">Reset</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-[99%] h-[49px] flex items-center bg-color-C1E4FF rounded-[6px]">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
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
                    <TableGridForTableOnHoldAndAvailable sortBy={sortBy} HoldedAndAvailableTableData={
                        activeTab === 0 ?HoldedAndAvailableTwoSeaterData : 
                        activeTab === 1 ?HoldedAndAvailableFourSeaterData : 
                        activeTab === 2 ?HoldedAndAvailableSixSeaterData : 
                        activeTab === 3 ?HoldedAndAvailableEightSeaterData : []
                    } />
                </div>
            </div>
        </ScrollArea>
    )
}

export default TableOnHoldAndAvailable;

const tabs = ['2 Seater', '4 Seater', '6 Seater', '8 Seater'];

export const getHoldAndAvailableTableDataFn = async () => {
    try {
        const { data } = await GetHoldAndAvailableTableData();
        // console.log('data:', data);
        let HoldedAndAvailableTwoSeaterData, HoldedAndAvailableFourSeaterData, HoldedAndAvailableSixSeaterData, HoldedAndAvailableEightSeaterData;
        if (data?.success) {
            HoldedAndAvailableTwoSeaterData = data?.onHoldAndAvailableTableData[0]?.holdAndAvailableTableData
            HoldedAndAvailableFourSeaterData = data?.onHoldAndAvailableTableData[1]?.holdAndAvailableTableData
            HoldedAndAvailableSixSeaterData = data?.onHoldAndAvailableTableData[2]?.holdAndAvailableTableData
            HoldedAndAvailableEightSeaterData = data?.onHoldAndAvailableTableData[3]?.holdAndAvailableTableData
        }

        return { HoldedAndAvailableTwoSeaterData, HoldedAndAvailableFourSeaterData, HoldedAndAvailableSixSeaterData, HoldedAndAvailableEightSeaterData }
    } catch (error) {
        console.log("Error in getHoldAndAvailableTableDataFn TableOnHoldAndAvailable.jsx :", error);
    }
}