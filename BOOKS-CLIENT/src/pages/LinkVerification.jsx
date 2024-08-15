import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { restaurantDetails } from "../store/slices/restaurantAdmin";
import { toastError } from "../helpers/helpers";
import axios from "axios";
import { RestaurantAdminApi } from "@/config/global";
import LinkExpired from "./LinkExpired";

const LinkVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(`${RestaurantAdminApi}verifyToken`, { token });
        console.log(response.data);

        
        if (response.data.success) {
          const actualToken = response.data.actualToken;

          localStorage.setItem("restaurant", JSON.stringify(actualToken));
          
          let impData = {
            role: "restaurant",
            token: actualToken,
          };

          dispatch(restaurantDetails(impData));
          navigate("/restaurant-home");
        } else {
          toastError(response.data.message || "Token verification failed");
          setShowPage(true);
        }
      } catch (error) {
        toastError("An error occurred while verifying the token");
        setShowPage(true);

      }
    };

    if (token) {
      verifyToken();
    } else {
      toastError("Token is unavailable");
    }
  }, [dispatch, navigate, token]);

  return showPage && <LinkExpired />;
};

export default LinkVerification;
