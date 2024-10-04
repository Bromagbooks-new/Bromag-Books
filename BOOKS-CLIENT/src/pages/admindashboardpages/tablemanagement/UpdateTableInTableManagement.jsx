
import UpdateTableForm from "@/components/tablemanagement/UpdateTableForm";
import TotalOrderDetailsForSelectedTable from "@/components/tablemanagement/TotalOrderDetailsForSelectedTable";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/ui/button";
import deleteTable from "@/assets/images/table-management/deleteTable.svg"
import { ScrollArea } from "@/components/ui/scroll-area";
import Diagram2Seater from "@/assets/images/table-management/Diagram2Seater.svg"
import Diagram4Seater from "@/assets/images/table-management/Diagram4Seater.svg"
import Diagram6Seater from "@/assets/images/table-management/Diagram6Seater.svg"
import Diagram8Seater from "@/assets/images/table-management/Diagram8Seater.svg"

import { GetSingleTableInfo } from "@/config/routeApi/owner";
import { useState, useEffect } from "react";

const UpdateTableInTableManagement = () => {
    // console.log("Rendering AddTableForTableManagement");
    const { TotalAddedTableData, singleTableData } = useLoaderData();


    return (
        <ScrollArea className="h-screen pb-20 pr-10">
            <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
                <div className="flex justify-between items-center">
                    <div className="text-3xl flex gap-4 items-center font-semibold">
                        <Link to="/dashboard/table-management">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <p>Edit Table</p>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-[#ED2B2B] gap-2">
                            <img src={deleteTable} className="w-[1.5rem] h-[1.5rem]" />
                            Delete Table
                        </Button>
                    </div>
                </div>
                <UpdateTableForm singleTableData={singleTableData} />
                <TotalOrderDetailsForSelectedTable reports={TotalAddedTableData} />
            </div>
        </ScrollArea>
    )

};

export default UpdateTableInTableManagement;

export const totalOrderDetailsForSelectedTable = async ({ params }) => {
    try {
        const { tableId } = params
        // console.log('tableId:', tableId)
        const { data } = await GetSingleTableInfo(tableId)
        // console.log('data:', data)
        const TotalAddedTableData = [
            {
                _id : 1,
                tableDiagram: Diagram2Seater,
                tableNumber: 1,
                seatingType: 2,
                createdAt: new Date()
            },
            {
                _id : 2,
                tableDiagram: Diagram4Seater,
                tableNumber: 2,
                seatingType: 4,
                createdAt: new Date()
            },
            {
                _id : 3,
                tableDiagram: Diagram6Seater,
                tableNumber: 3,
                seatingType: 6,
                createdAt: new Date()
            },
            {
                _id : 4,
                tableDiagram: Diagram8Seater,
                tableNumber: 4,
                seatingType: 8,
                createdAt: new Date()
            }
        ]

        return { TotalAddedTableData, singleTableData : data?.getSingleTableInfo[0] }
    } catch (error) {
        console.log('table loader error:', error)
        return { TotalAddedTableData: [] }
    }
}