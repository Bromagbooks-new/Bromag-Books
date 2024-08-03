import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { FetchCompletedBills } from "@/config/routeApi/owner";

const PreviousBill = ({ bill }) => {
  return (
    <div className="border-b p-4">
      <div className="border-b flex gap-20 pb-2 mb-2 text-muted">
        <div className="">
          <p className="font-bold text-black">Invoice No.</p>
          <p className="">
            {bill.mode === "online" ? "Agrregator" : "Customer Name"}
          </p>
          <p>Order Mode</p>
        </div>
        <div className="">
          <p className="text-black font-bold">: {bill.billNo}</p>
          <p>
            {bill.mode === "online"
              ? ": " + bill.aggregator
              : ": " + bill.customerName}
          </p>
          <p>: {bill.mode}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {bill.items.map((item) => (
          <div key={item.id} className="flex justify-between text-xs">
            <p>{item.name}</p>
            {item.quantity}
          </div>
        ))}
      </div>
      <div className="flex gap-1 py-2">
        <p className="text-muted text-xs">
          {new Date(bill.date).toLocaleDateString()}
        </p>
        <p className="text-muted text-xs">
          {new Date(bill.date).toLocaleTimeString()}
        </p>
      </div>
      <div className="flex justify-center">
        <Button className="rounded-3xl px-6 py-2 bg-[#758D9F]">
          View Bill
        </Button>
      </div>
    </div>
  );
};

const PreviousBills = ({ type }) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      console.log("Here");
      try {
        const response = await FetchCompletedBills();
        console.log(response.data);

        if (response.status === 200) {
          const bills = response.data.bill;
          const filteredBills = bills.filter((bill) => bill.mode === type);
          console.log(filteredBills);
          setBills(filteredBills);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="rounded-xl w-[23%] right-8 top-[14%] fixed h-[85%] bg-white shadow-md">
      <div className="rounded-t-lg bg-gray-900 text-lg px-4 h-10 flex items-center text-white">
        Previous Bills
      </div>
      <ScrollArea className="h-[93%]">
        {bills.map((bill) => (
          <PreviousBill bill={bill} key={bill._id} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default PreviousBills;

const orders = [
  {
    invoiceNo: 1234,
    mode: "online",
    aggregator: "swiggy",
    customerName: "Ram",
    time: "July 2nd, 10:30 AM",
    items: [
      {
        id: 123,
        name: "Chicken Biriyani",
        quantity: 10,
      },
      {
        id: 124,
        name: "Chicken Tikka",
        quantity: 10,
      },
      {
        id: 125,
        name: "Chicken Changezi",
        quantity: 10,
      },
      {
        id: 126,
        name: "Butter Chicken",
        quantity: 10,
      },
      {
        id: 127,
        name: "Afghani Chicken",
        quantity: 10,
      },
    ],
  },
  {
    invoiceNo: 1234,
    mode: "online",
    aggregator: "swiggy",
    customerName: "Ram",
    time: "July 2nd, 10:30 AM",
    items: [
      {
        id: 123,
        name: "Chicken Biriyani",
        quantity: 10,
      },
      {
        id: 124,
        name: "Chicken Tikka",
        quantity: 10,
      },
      {
        id: 125,
        name: "Chicken Changezi",
        quantity: 10,
      },
      {
        id: 126,
        name: "Butter Chicken",
        quantity: 10,
      },
      {
        id: 127,
        name: "Afghani Chicken",
        quantity: 10,
      },
    ],
  },
  {
    invoiceNo: 1235,
    mode: "online",
    aggregator: "zomato",
    customerName: "Ram",
    time: "July 2nd, 10:30 AM",
    items: [
      {
        id: 123,
        name: "Chicken Biriyani",
        quantity: 10,
      },
      {
        id: 124,
        name: "Chicken Tikka",
        quantity: 10,
      },
      {
        id: 125,
        name: "Chicken Changezi",
        quantity: 10,
      },
      {
        id: 126,
        name: "Butter Chicken",
        quantity: 10,
      },
      {
        id: 127,
        name: "Afghani Chicken",
        quantity: 10,
      },
    ],
  },
  {
    invoiceNo: 1236,
    mode: "online",
    aggregator: "magicpin",
    customerName: "Ram",
    time: "July 2nd, 10:30 AM",
    items: [
      {
        id: 123,
        name: "Chicken Biriyani",
        quantity: 10,
      },
      {
        id: 124,
        name: "Chicken Tikka",
        quantity: 10,
      },
      {
        id: 125,
        name: "Chicken Changezi",
        quantity: 10,
      },
      {
        id: 126,
        name: "Butter Chicken",
        quantity: 10,
      },
      {
        id: 127,
        name: "Afghani Chicken",
        quantity: 10,
      },
    ],
  },
];
