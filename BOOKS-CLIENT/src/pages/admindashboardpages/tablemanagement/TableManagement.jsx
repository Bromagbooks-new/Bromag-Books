
import { Button } from "@/components/ui/button";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { TableRowsSplit } from "lucide-react";
import TableAcessAnalyticsCard from "@/components/tablemanagement/TableAcessAnalyticsCard";
import Seater2Table from "@/assets/images/table-management/Seater2Table.svg"
import Seater4Table from "@/assets/images/table-management/Seater4Table.svg"
import Seater6Table from "@/assets/images/table-management/Seater6Table.svg"
import Seater8Table from "@/assets/images/table-management/Seater8Table.svg"
import addTable from "@/assets/images/table-management/addTable.svg"
import UpdateCountIcon1 from "@/assets/images/table-management/UpdateCountIcon1.svg"
import UpdateCountIcon2 from "@/assets/images/table-management/UpdateCountIcon2.svg"

import UpdateCountIcon3 from "@/assets/images/table-management/UpdateCountIcon3.svg"
import UpdateCountIcon4 from "@/assets/images/table-management/UpdateCountIcon4.svg"
import TotalAddedTable from "@/components/tablemanagement/TotalAddedTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetNewTableDatCount } from "@/config/routeApi/owner";
import { useState } from "react";

const TableManagement = () => {
    const { TotalAddedTableData = [] } = useLoaderData();
    // console.log('TotalAddedTableData1:', TotalAddedTableData)

    return (
        <ScrollArea className="h-screen pb-20 pr-10">
            <div className="w-full h-full py-4 flex flex-col gap-4">
                <div className="flex justify-between">
                    <p className="text-3xl font-semibold" style={{ color: "#1F303C" }}>Table Management</p>
                    <div className="flex gap-4">
                        <Link to="/dashboard/table-management/add-table">
                            <Button className="bg-[#01A0A0] gap-2">
                                <img src={addTable} className="w-[1.5rem] h-[1.5rem]" />
                                Add Table
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-3">
                    {
                        TableOptions?.map((item, index) => {
                            return (
                                <TableAcessAnalyticsCard
                                    key={item.id}
                                    title={item.title}
                                    id={item.id}
                                    borderClass={item.borderClass}
                                    icon={item.icon}
                                    textcolor={item.textcolor}
                                    tableValue={TotalAddedTableData[index]?.totalTableCountBasedOnSeaterType}
                                    UpdateCountIcon={item.UpdateCountIcon}
                                />
                            )
                        })
                    }
                </div>
                <p className="text-3xl font-semibold" style={{ color: "#1F303C" }}>Total Tables Added</p>
                <TotalAddedTable totalAddedTableCount = {Number(TotalAddedTableData[0]?.totalTableCountBasedOnSeaterType) + Number(TotalAddedTableData[1]?.totalTableCountBasedOnSeaterType) + Number(TotalAddedTableData[2]?.totalTableCountBasedOnSeaterType) + Number(TotalAddedTableData[3]?.totalTableCountBasedOnSeaterType) } />
            </div>
        </ScrollArea>
    )
}

export default TableManagement;

const TableOptions = [
    {
        id: "2-Seater-Table",
        title: "2 Seater Table",
        borderClass: "3px solid #02B033",
        icon: Seater2Table,
        textcolor: "#02b033",
        tableValue: 123,
        UpdateCountIcon: UpdateCountIcon1
    },
    {
        id: "4-Seater-Table",
        title: "4 Seater Table",
        borderClass: "3px solid #E0A20F",
        icon: Seater4Table,
        textcolor: "#E0A20F",
        tableValue: 123,
        UpdateCountIcon: UpdateCountIcon2
    },
    {
        id: "6-Seater-Table",
        title: "6 Seater Table",
        borderClass: "3px solid #514FC8",
        icon: Seater6Table,
        textcolor: "#514FC8",
        tableValue: 123,
        UpdateCountIcon: UpdateCountIcon3
    },
    {
        id: "8-Seater-Table",
        title: "8 Seater Table",
        borderClass: "3px solid #DB5F32",
        icon: Seater8Table,
        textcolor: "#DB5F32",
        tableValue: 123,
        UpdateCountIcon: UpdateCountIcon4
    },
]

export const totalCountOfAddedTableDataLoader = async () => {
    try {
        const TotalAddedTableData = await GetNewTableDatCount();
        // console.log('TotalAddedTableData:', TotalAddedTableData)
        return { TotalAddedTableData : TotalAddedTableData?.data?.getNewTableDatCount }
    } catch (error) {
        console.log('table loader error:', error)
        return { TotalAddedTableData: [] }
    }
}