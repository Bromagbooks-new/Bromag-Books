import Wrapper from "../../assets/wrappers/poswrappers/PosHeader";
import { BsJustify } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GetRestaurantDetail } from "../../config/routeApi/owner";

function Header({ openSidebar }) {
    const [restaurantData, setRestaurantData] = useState();

    useEffect(() => {
        (async function getDetails() {
            const response = await GetRestaurantDetail();
            if (response.data.success) {
                setRestaurantData(response.data.restaurantData);
            }
        })();
    }, []);

    return (
        <Wrapper className="pos-header px-4 py-2 flex justify-between items-center bg-[#1F303C] text-white relative">
            {/* Hamburger Menu Icon (fixed in top-left for mobile) */}
            <div className="fixed top-2 left-2 md:hidden">
                <BsJustify className="text-xl cursor-pointer" onClick={openSidebar} />
            </div>

            {/* Restaurant Name */}
            {/* <div className="flex-1 text-center md:text-left">
        {restaurantData && <h3 className="text-lg font-semibold">{restaurantData.username}</h3>}
      </div> */}

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
                {/* Profile Image or other items */}
                {/* <img src={ProfileImg} alt="Profile" className="w-8 h-8 rounded-full" /> */}
            </div>
        </Wrapper>
    );
}

export default Header;
