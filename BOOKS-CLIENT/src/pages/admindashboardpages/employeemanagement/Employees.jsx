import { Link, redirect, useLoaderData } from "react-router-dom";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import {
  GetAllAggregators,
} from "@/config/routeApi/owner";
import { Button } from "@/components/ui/button";
import AggregatorsTable from "@/components/menumanagement/AggregatorsTable";
import EmployeeTable from "@/components/employeemanagement/EmployeeTable";

const Employees = () => {
  // const { aggregators } = useLoaderData();
  const employees = dummyEmployees;
  // console.log(reports);
  // console.log(isCreatedToday);

  return (
    <div className="py-4 w-full h-full flex flex-col gap-4 font-roboto">
      <div className="flex justify-between items-center">
        <div className="text-3xl flex gap-4 items-center font-semibold">
          <Link to="/dashboard/employee-management">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <p>Employees</p>
        </div>
        <Link
          to={"add-employee"}
          className="bg-[#01A0A0] rounded-xl text-[14px] p-0 px-4 font-bold flex gap-2 text-white"
        >
          <Button className="p-0 bg-transparent flex gap-2">
            <CalendarPlus className="h-5 w-5" />
            Add Employee
          </Button>
        </Link>
      </div>
      <EmployeeTable employees={employees} />
      {/* <ExpenseTable reports={reports} /> */}
    </div>
  );
};

export default Employees;

export const aggregatorsLoader = async () => {
  try {
    const response = await GetAllAggregators();
    // const openingReportCreatedResponse = await IsOpeningReportCreatedToday();
    if (response.status === 200) {

      console.log(response.data);
      const aggregators = response.data.aggregators;
      // console.log(openingReportCreatedResponse.data);
      // const isCreatedToday = openingReportCreatedResponse.data.isCreatedToday;
      return { aggregators };
    }
  } catch (error) {
    console.error(error);
    return redirect("/dashboard/menu-management");
  }
};


const dummyEmployees = [
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Captain",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Vendor Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Sales Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Vendor Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Sales Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Vendor Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Sales Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Captain",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Captain",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Sales Manager",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Captain",
    "access": 9999
  },
  {
    "name": "Charles Mag",
    "phone": "9087654321",
    "email": "qwerty@gmail.com",
    "empId": "00000BROMAGIND",
    "role": "Vendor Manager",
    "access": 9999
  }
]
