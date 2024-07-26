import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const PreviousBill = ({ order }) => {
  return (
    <div className="border-b p-4">
      <div className="border-b flex gap-20 pb-2 mb-2 text-muted">
        <div className="">
          <p className="font-bold text-black">Invoice No.</p>
          <p className="">{order.mode === "online" ? "Agrregator" : "Customer Name"}</p>
          <p>Order Mode</p>
        </div>
        <div className="">
          <p className="text-black font-bold">: {order.invoiceNo}</p>
          <p>
            {order.mode === "online" ? ": "+order.aggregator : ": "+order.customerName}
          </p>
          <p>: {order.mode}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">

      {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-xs">
          <p>{item.name}</p>
          {item.quantity}
        </div>
      ))}
      </div>
      <div className="text-muted text-xs pt-3">{order.time}</div>
      <div className="flex justify-center">
        <Button className="rounded-3xl px-6 py-2 bg-[#758D9F]">View Bill</Button>
      </div>
    </div>
  );
};

const PreviousBills = ({ type }) => {
  return (
    <div className="rounded-xl w-[23%] right-8 top-[14%] fixed h-[85%] bg-white shadow-md">
      <div className="rounded-t-lg bg-gray-900 text-lg px-4 h-10 flex items-center text-white">
        Previous Bills
      </div>
      <ScrollArea className="h-[93%]">
        {orders.map((bill) => (
          <PreviousBill order={bill} key={bill.invoiceNo} />
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
