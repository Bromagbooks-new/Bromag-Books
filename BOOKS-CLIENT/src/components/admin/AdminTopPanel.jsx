import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch } from "react-redux";
import { ownerLogout } from "@/store/slices/owner";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { BellIcon, CircleChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const logoutHandler = () => {
    console.log("Logout");
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Do you really want to logout?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={logoutHandler}>Logout</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

const AdminTopPanel = () => {
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = ()=> {

    localStorage.removeItem('atoken');
    dispatch(ownerLogout());
    navigate('/restaurant-home');
    
  }
  return (
    <div className="h-20 w-full  rounded-tl-[4rem] flex justify-end items-center gap-6 p-4 border-b border-[#E8E8E8]">
      <BellIcon className="w-6 h-6" />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="">Aria Valencia</p>
        <p className="text-green-500 text-sm">Admin</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleChevronDownIcon className="text-black/60 w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialog>
              <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
            <AlertDialogTrigger>
            </AlertDialogTrigger>
            <Menu />
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminTopPanel;
