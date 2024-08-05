import { useState } from "react";

const initialDenominations = {
  2000: 0,
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
};

const AddOpeningReportForm = () => {
  const [denominations, setDenominations] = useState(initialDenominations);

  const handleAdd = (denomination) => {
    setDenominations((prev) => {
      prev[denomination] += 1;
      console.log(prev);
      return prev;
    });
  };
  const handleSubtarct = (denomination) => {
    setDenominations((prev) => {
      if (prev[denomination] <= 0) return;
      prev[denomination] -= 1;
      return prev;
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
      <div className="text-xl font-bold">Cash Denomination</div>
      <div>
        {Object.keys(denominations).map((denomination) => (
          <div className="border-b flex justify-between p-2 px-8">
            <div className="font-bold px-32 w-1/3">₹{denomination}</div>
            <div className="flex gap-20 w-1/2 justify-center">
              <div className="flex justify-between rounded-full border-3 px-3 w-32">
                <span
                  className="text-xl cursor-pointer"
                  onClick={()=> handleSubtarct(denomination)}
                >
                  -
                </span>
                {denominations[denomination]}
                <span className="text-xl cursor-pointer" onClick={()=> handleAdd(denomination)}>
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
    </div>
  );
};

export default AddOpeningReportForm;
