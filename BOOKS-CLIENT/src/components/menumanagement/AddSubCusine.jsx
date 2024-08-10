import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, PlusIcon, XIcon } from "lucide-react";

const AddSubCusine = () => {
  const form = useFormContext();

  const [subCusine, setSubCusine] = useState("");

  const handleInputChange = (e) => setSubCusine(e.target.value);

  const handleAccept = () => {
    const currentSubCusines = form.watch("subCusines");
    if (subCusine === "") return;
    if (currentSubCusines.includes(subCusine)) return;

    currentSubCusines.push(subCusine);

    form.setValue("subCusines", currentSubCusines);
    setSubCusine("");
  };

  const handleRemove = (subCusineItem) => {
    const currentSubCusines = form.watch("subCusines");
    const filteredSubCusines = currentSubCusines.filter(
      (subCusine) => subCusine !== subCusineItem
    );
    form.setValue("subCusines", filteredSubCusines);
  };

  const subCusines = form.watch("subCusines");

  return (
    <div>
      {subCusines.length > 0 && <ul className="flex flex-col gap-1 p-2 pb-4">
        {subCusines.map((subCusine, index) => (
          <li key={subCusine} className="flex gap-1 items-center group">
            <p className="">{index + 1}.</p>
            <p className="">{subCusine}</p>
            <div
              onClick={() => handleRemove(subCusine)}
              className="hidden group-hover:block cursor-pointer"
            >
              <XIcon className="h-4 w-4 " />
            </div>
          </li>
        ))}
      </ul>}
      <div className="flex gap-1 w-1/2">
        <Input className="h-8 bg-[#F4FAFF] border-[#758D9F] border-1" value={subCusine} onChange={handleInputChange} />
        <Button className="h-8 w-8 rounded-full p-2 bg-landing-secondary" onClick={handleAccept}>
          <div>
            <PlusIcon />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AddSubCusine;
