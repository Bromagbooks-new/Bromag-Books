import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, HandPlatterIcon, PlusIcon, StoreIcon, XIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toastError } from "@/helpers/helpers";

const AddAggregatorForMenu = () => {
  const form = useFormContext();
  const aggregators = form.watch("aggregators");

  const [subCusine, setSubCusine] = useState("");

  const [showAggregatorSelectMenu, setShowAggregatorSelectMenu] = useState(false);
  const handleAddAggregator = ()=> setShowAggregatorSelectMenu(true); 


  const [inputAggregator, setInputAggregator] = useState("");
  const handleConfirmAggregator = ()=> {
    if(inputAggregator === "") return;
    if(aggregators.includes(inputAggregator)) {
      toastError("Aggregator already present");
    }

    const newAggregaors = [...aggregators, {aggregator: inputAggregator, portions: []}];

    form.setValue('aggregators', newAggregaors);
    setInputAggregator("");
    setShowAggregatorSelectMenu(false);
    
    
  }

  const handleRemove = (subCusineItem) => {
    const currentSubCusines = form.watch("subCusines");
    const filteredSubCusines = currentSubCusines.filter(
      (subCusine) => subCusine !== subCusineItem
    );
    form.setValue("subCusines", filteredSubCusines);
  };


  return (
    <div>
      {aggregators.length > 0 && (
        <ul className="flex flex-col gap-1 p-2 pb-4">
          {aggregators.map((aggregator, index) => (
            <div key={aggregator} className="flex flex-col gap-1">
              <p className="text-xl">{aggregator.aggregator}</p>
              {aggregator.portions.map((portion) => (
                <div key={portion}>
                  <Button className="bg-landing-secondary w-48 gap-2">
                    <div>
                      <HandPlatterIcon />
                    </div>
                    Add Portion
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </ul>
      )}
      {showAggregatorSelectMenu ? <div className="flex gap-1 items-center">
          <Select value={inputAggregator} onValueChange={setInputAggregator}>
            <SelectTrigger>
              <SelectValue  placeholder="Select one aggregator"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="swiggy">Swiggy</SelectItem>
              <SelectItem value="zomato">Zomato</SelectItem>
              <SelectItem value="bromag">Bromag</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleConfirmAggregator} className="bg-landing-secondary">Add</Button>
        </div> : <Button onClick={handleAddAggregator} className="bg-landing-secondary w-64 gap-2">
        <div>
          <StoreIcon />
        </div>
        Add Aggregator
      </Button>}
    </div>
  );
};

export default AddAggregatorForMenu;
