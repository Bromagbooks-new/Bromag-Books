import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  CheckIcon,
  HandPlatterIcon,
  PlusIcon,
  StoreIcon,
  XIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toastError } from "@/helpers/helpers";
import { FormLabel } from "../ui/form";

const AddAggregatorForMenu = ({ availableAggregators }) => {
  // console.log(availableAggregators);
  const form = useFormContext();
  const aggregators = form.watch("aggregators");

  const [subCusine, setSubCusine] = useState("");

  const [showAggregatorSelectMenu, setShowAggregatorSelectMenu] =
    useState(false);
  const handleAddAggregator = () => setShowAggregatorSelectMenu(true);

  const [inputAggregator, setInputAggregator] = useState("");
  const handleConfirmAggregator = () => {
    if (inputAggregator === "") return;

    const foundAggregator = aggregators.filter(
      (agg) => agg.aggregator === inputAggregator
    )[0];

    if (foundAggregator) {
      toastError("Aggregator already present");
      return;
    }

    const newAggregaors = [
      ...aggregators,
      { aggregator: inputAggregator, portions: [] },
    ];

    form.setValue("aggregators", newAggregaors);
    setInputAggregator("");
    setShowAggregatorSelectMenu(false);
  };

  const [showPortionInput, setShowPortionInput] = useState(false);
  const [portionInput, setPortionInput] = useState();
  const [portionInputPrice, setPortionInputPrice] = useState();
  const [portionDiscountPrice, setPortionDiscountPrice] = useState();

  const handleAddPortion = (aggregator) => {
    // console.log(aggregator);
    setShowPortionInput(aggregator.aggregator);
    setPortionInput("");
    setPortionInputPrice(0);
    setPortionDiscountPrice(0);
  };

  const handlePortionInput = (value) => {
    setPortionInput(value);
  };

  const handlePortionInputPrice = (value) => {
    setPortionInputPrice(value);
  };
  const handlePortionDiscountPrice = (value) => {
    setPortionDiscountPrice(value);
  };

  const handleConfirmPortion = (aggregator) => {
    // console.log(aggregators);
    const currentAggregator = aggregators.filter(
      (agg) => agg.aggregator === aggregator.aggregator
    )[0];

    // console.log(currentAggregator);

    if (!currentAggregator) return;

    currentAggregator.portions.push({
      type: portionInput,
      actualPrice: portionInputPrice,
      discountPrice: portionDiscountPrice,
    });

    const newAggregators = aggregators.map((agg) => {
      if (agg.aggregator === currentAggregator.aggregator) {
        return currentAggregator;
      }
      return agg;
    });

    form.setValue("aggregators", newAggregators);
    setShowPortionInput(false);
  };

  return (
    <div>
      {aggregators.length > 0 && (
        <ul className="flex flex-col gap-1 p-2 pb-4">
          {aggregators.map((aggregator, index) => (
            <div
              key={aggregator.aggregator}
              className="flex flex-col gap-1 w-1/2"
            >
              <p className="text-xl font-semibold text-teal-600">
                {aggregator.aggregator}
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex  justify-between uppercase font-semibold">
                  <p className="">Portion</p>
                  <p className="">Actual Price</p>
                  <p className="">Discount Price</p>
                </div>
              </div>
              {aggregator.portions.map((portion) => (
                <div key={portion.type} className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <p className="">{portion.type}</p>
                    <p className="">₹{portion.actualPrice}</p>
                    <p className="">₹{portion.discountPrice}</p>
                  </div>
                </div>
              ))}
              {showPortionInput === aggregator.aggregator && (
                <div className="flex flex-col gap-3 py-6">
                  <div className="flex flex-col gap-2">
                    <FormLabel>Portion Size Name</FormLabel>
                    <Input
                      value={portionInput}
                      onChange={(e) => handlePortionInput(e.target.value)}
                      className="bg-[#F4FAFF] border-[#758D9F] border-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                      <FormLabel>Actual Price</FormLabel>
                      <Input
                        onChange={(e) =>
                          handlePortionInputPrice(e.target.value)
                        }
                        value={portionInputPrice}
                        className="bg-[#F4FAFF] border-[#758D9F] border-1"
                        type="number"
                        placeholder="Actual Price"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormLabel>Discount Price</FormLabel>

                      <Input
                        onChange={(e) =>
                          handlePortionDiscountPrice(e.target.value)
                        }
                        value={portionDiscountPrice}
                        className="bg-[#F4FAFF] border-[#758D9F] border-1"
                        type="number"
                        placeholder="DiscountPrice"
                      />
                    </div>
                  </div>
                  <Button
                    className="bg-landing-secondary"
                    onClick={() => handleConfirmPortion(aggregator)}
                    type="button"
                  >
                    Confirm
                  </Button>
                </div>
              )}
              <Button
                onClick={() => handleAddPortion(aggregator)}
                type="button"
                className="bg-landing-secondary w-48 gap-2"
              >
                <div>
                  <HandPlatterIcon />
                </div>
                Add Portion
              </Button>
            </div>
          ))}
        </ul>
      )}
      {showAggregatorSelectMenu ? (
        <div className="flex gap-1 items-center">
          <Select value={inputAggregator} onValueChange={setInputAggregator}>
            <SelectTrigger>
              <SelectValue placeholder="Select one aggregator" />
            </SelectTrigger>
            <SelectContent>
              {availableAggregators.map((aggregator) => (
                <SelectItem key={aggregator._id} value={aggregator.name}>
                  {aggregator.name}
                </SelectItem>
              ))}
              {/* <SelectItem value="swiggy">Swiggy</SelectItem> */}
              {/* <SelectItem value="zomato">Zomato</SelectItem> */}
              {/* <SelectItem value="bromag">Bromag</SelectItem> */}
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={handleConfirmAggregator}
            className="bg-landing-secondary"
          >
            Add
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={handleAddAggregator}
          className="bg-landing-secondary w-64 gap-2"
        >
          <div>
            <StoreIcon />
          </div>
          Add Aggregator
        </Button>
      )}
    </div>
  );
};

export default AddAggregatorForMenu;
