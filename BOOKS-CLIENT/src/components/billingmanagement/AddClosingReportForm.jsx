import { useState } from "react";
import { Button } from "../ui/button";
import { AddClosingReport, AddOpeningReport } from "@/config/routeApi/owner";
import { toastError, toastSuccess } from "@/helpers/helpers";
import { useNavigate } from "react-router-dom";

const initialDenominations = {
  2000: 0,
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
  2: 0,
  1: 0,
};

const AddClosingReportForm = ({netAmount}) => {
  const [denominations, setDenominations] = useState(initialDenominations);

  const roundOffAmount = Math.round(netAmount);

  const handleAdd = (denomination) => {
    setDenominations((prev) => ({
      ...prev,
      [denomination]: prev[denomination] + 1,
    }));
  };

  const handleSubtract = (denomination) => {
    setDenominations((prev) => ({
      ...prev,
      [denomination]: Math.max(0, prev[denomination] - 1),
    }));
  };

  const total = Object.keys(denominations).reduce(
    (acc, denomination) => acc + denominations[denomination] * denomination,
    0
  );

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {

      console.log(total, roundOffAmount);
      if(total !== roundOffAmount) {
        toastError("Total Closing Balance should match with Available Balance");
        return;
      }

      const response = await AddClosingReport({
        denominations,
        totalAmount: total,
      });

      if (response.status === 201) {
        toastSuccess("Closing Report Created Successfully");
        navigate("/dashboard/billing-management/passbook");
      }
    } catch (error) {
      console.error(error);
      toastError("Internal Server Error");
    }
  };

  const handleCancel = () =>
    navigate("/dashboard/billing-management/passbook");

  return (
    <div className="rounded-xl bg-white px-6 py-4 flex flex-col gap-4">
      <div className="text-xl font-bold">Cash Received</div>
      <div>
        {Object.keys(denominations).map((denomination) => (
          <div
            key={denomination}
            className="border-b flex justify-between p-1 px-8"
          >
            <div className="font-bold px-32 w-1/3">₹{denomination}</div>
            <div className="flex gap-20 w-1/2">
              <div className="flex justify-between rounded-full border-3 px-3 w-32">
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => handleSubtract(denomination)}
                >
                  -
                </span>
                {denominations[denomination]}
                <span
                  className="text-xl cursor-pointer"
                  onClick={() => handleAdd(denomination)}
                >
                  +
                </span>
              </div>
              <p className="font-bold">
                ₹{denomination * denominations[denomination]}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-20 justify-center bg-[#A4C5DD] text-white rounded-xl p-2">
        <div className="flex gap-2">
          
        <p className="text-xl font-semibold">Available Balance</p>
        <span className="text-xl font-bold">₹{roundOffAmount}</span>
        </div>
        <div className="flex gap-2">
          
        <p className="text-xl font-semibold">Total Cash</p>
        <span className="text-xl font-bold">₹{total}</span>
        </div>
      </div>
      <div className="flex gap-1 justify-center ">
        <Button className="bg-secondary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          variant="secondary"
          onClick={handleCancel}
          className="bg-white border"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddClosingReportForm;
