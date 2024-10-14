import React, { useState, useEffect } from 'react';
import HoldTableDiagram2Seater from "@/assets/images/table-management/HoldTableDiagram2Seater.svg";
import HoldTableDiagram4Seater from "@/assets/images/table-management/HoldTableDiagram4Seater.svg";
import HoldTableDiagram6Seater from "@/assets/images/table-management/HoldTableDiagram6Seater.svg";
import HoldTableDiagram8Seater from "@/assets/images/table-management/HoldTableDiagram8Seater.svg";
import dialogBoxArrow from "@/assets/images/table-management/dialogBoxArrow.svg";
import DialogCrossBtn from "@/assets/images/table-management/DialogCrossBtn.svg";
import HoldTableDiagramSelected2Seater from "@/assets/images/table-management/HoldTableDiagramSelected2Seater.svg";
import HoldTableDiagramSelected4Seater from "@/assets/images/table-management/HoldTableDiagramSelected4Seater.svg";
import HoldTableDiagramSelected6Seater from "@/assets/images/table-management/HoldTableDiagramSelected6Seater.svg";
import HoldTableDiagramSelected8Seater from "@/assets/images/table-management/HoldTableDiagramSelected8Seater.svg";
import { Button } from '../ui/button';

import { Link } from "react-router-dom";

const TableGridForTableOnHold = ({ holdedTableData }) => {
    // console.log('holdedTableData:', holdedTableData)
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [indexGrid, setIndexGrid] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    // console.log('dialogOpen:', dialogOpen)

    useEffect(() => {
        setDialogOpen(false);
    }, [holdedTableData])

    const handleTableClick = (id, index) => {
        // Toggle selection
        if (dialogOpen) return;
        setSelectedTableId(id);
        setIndexGrid(index);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        // Close the dialog box
        setDialogOpen(false);
        setSelectedTableId(null);
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${holdedTableData[0]?.numberOfSeats === 2 ? "lg:grid-cols-8" : "lg:grid-cols-5"}  w-[99%] place-items-center gap-8 p-4`}>
            {
                holdedTableData?.map((element, index) => {
                    const isSelected = selectedTableId === element?._id;

                    return (
                        <div
                            key={element?._id}
                            className={`relative flex items-center justify-center`}
                            onClick={() => handleTableClick(element?._id, index)}
                        >
                            <span className="absolute text-white z-10">{element?.tableNo}</span>

                            <img src={
                                isSelected && dialogOpen && element?.numberOfSeats === 2 ? HoldTableDiagramSelected2Seater :
                                    isSelected && dialogOpen && element?.numberOfSeats === 4 ? HoldTableDiagramSelected4Seater :
                                        isSelected && dialogOpen && element?.numberOfSeats === 6 ? HoldTableDiagramSelected6Seater :
                                            isSelected && dialogOpen && element?.numberOfSeats === 8 ? HoldTableDiagramSelected8Seater :
                                                element?.numberOfSeats === 2 ? HoldTableDiagram2Seater :
                                                    element?.numberOfSeats === 4 ? HoldTableDiagram4Seater :
                                                        element?.numberOfSeats === 6 ? HoldTableDiagram6Seater :
                                                            element?.numberOfSeats === 8 ? HoldTableDiagram8Seater : ""
                            } className={`object-cover cursor-pointer ${!isSelected && dialogOpen ? 'opacity-[0.5]' : ''} ${dialogOpen ? 'pointer-events-none' : ''}`} alt="" />

                            {/* Conditionally render the new div */}
                            {isSelected && dialogOpen && (
                                <div className={`absolute w-[508px] bg-[#1F303C]
                                    ${holdedTableData[0]?.numberOfSeats === 2 && [0, 1, 2, 3, 8, 9, 10, 11].includes(indexGrid) ? "left-[100px] top-[5px]" :
                                        holdedTableData[0]?.numberOfSeats !== 2 && [0, 1, 2, 5, 6, 7].includes(indexGrid) ? "left-[163px] top-[5px]" :
                                            holdedTableData[0]?.numberOfSeats === 2 ? "left-[-538px] top-[5px]" :
                                                holdedTableData[0]?.numberOfSeats !== 2 ? "left-[-538px] top-[5px]" : ""
                                    } 
                                    h-[341px] bottom-1 rounded-[9px] text-white z-20`}>
                                    <img src={dialogBoxArrow} className={`absolute 
                                        ${holdedTableData[0]?.numberOfSeats === 2 && [0, 1, 2, 3, 8, 9, 10, 11].includes(indexGrid) ? "left-[-30px] top-[35px]" :
                                            holdedTableData[0]?.numberOfSeats !== 2 && [0, 1, 2, 5, 6, 7].includes(indexGrid) ? "left-[-30px] top-[35px]" :
                                                holdedTableData[0]?.numberOfSeats === 2 ? "right-[-30px] top-[35px] transform rotate-180" :
                                                    holdedTableData[0]?.numberOfSeats !== 2 ? "right-[-30px] top-[35px] transform rotate-180" : ""
                                        }`} alt="" />
                                    <div className={`relative flex border-b-[1px] border-color-50758F h-[45px]`}>
                                        <p className="m-0 p-0 left-0 flex justify-center items-center h-[100%] w-full border-0 font-roboto text-[16px] font-semibold">Table Details</p>
                                        <img src={DialogCrossBtn} className={`cursor-pointer absolute right-2 w-[5%] h-full`} onClick={handleCloseDialog} id="crossBtn" alt="" />
                                    </div>
                                    <div className={`flex px-[15px] py-[20px] gap-2 w-full justify-between items-center border-b-[1px] border-color-50758F`}>
                                        <div className={`flex flex-col justify-start w-[224px] h-[70px] gap-1`}>
                                            <p className="text-white m-0 p-0 font-roboto text-[14px] font-normal">Table Number</p>
                                            <input type="number" readOnly value={element.tableNo} className="font-roboto px-[24px] font-medium text-[14px] w-full h-[44px] py-[14px] border-[1px] border-color-50758F rounded text-white bg-transparent" />
                                        </div>
                                        <div className={`flex flex-col justify-start w-[224px]  h-[70px] gap-1`}>
                                            <p className="text-white m-0 p-0 font-roboto text-[14px] font-normal">Table Seating</p>
                                            <input type="text" readOnly value={`${element.numberOfSeats} People`} className="px-[24px] font-medium font-roboto text-[14px] py-[14px] w-full h-[44px] border-[1px] border-color-50758F rounded text-white bg-transparent" />
                                        </div>
                                    </div>
                                    <div className={`flex px-[15px] py-[20px] gap-2 w-full justify-between items-center border-b-[0px] border-color-50758F`}>
                                        <div className={`flex flex-col justify-start w-[224px] h-[70px] gap-1`}>
                                            <p className="text-white m-0 p-0 font-roboto text-[14px] font-normal">Customer Name</p>
                                            <input type="text" readOnly value={element.customerName} className="font-roboto font-medium px-[24px] text-[14px] w-full h-[44px] py-[14px] border-[1px] border-color-50758F rounded text-white bg-transparent" />
                                        </div>
                                        <div className={`flex flex-col justify-start w-[224px]  h-[70px] gap-1`}>
                                            <p className="text-white m-0 p-0 font-roboto text-[14px] font-normal">Order Type</p>
                                            <input type="text" readOnly value={element.mode} className="px-[24px] font-medium font-roboto text-[14px] py-[14px] w-full h-[44px] border-[1px] border-color-50758F rounded text-white bg-transparent" />
                                        </div>
                                    </div>
                                    <div className={`border-[0px] px-[14px] py-[1rem] border-color-50758F h-[75px] flex justify-center items-center`}>
                                        <Link to={`/dashboard/billing-management/update-order?id=${element._id}`} className="w-[478px] h-[43px] rounded-[5px] px-[172px] py-[12px] text-color-1F303C bg-color-D6EEFF hover:bg-color-D6EEFF text-[16px] font-roboto font-semibold">Continue to Billing</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TableGridForTableOnHold;