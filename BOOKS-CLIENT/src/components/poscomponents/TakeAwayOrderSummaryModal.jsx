import Wrapper from "../../assets/wrappers/poswrappers/PosFormModal";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { calculateGST, formatDate, toastError, toastSuccess } from "../../helpers/helpers";
import { PrintBill, posDashboard } from "../../config/routeApi/pos";
import { useEffect, useState } from "react";

const TakeAwayOrderSummaryModal = (props) => {
  const { selectedOrder,setIndicator,indicator } = props;
  const navigate = useNavigate();
const {Amount,KotItems} = selectedOrder
  console.log(selectedOrder, "selectedOrder");
 
  
  const [manager, setManager] = useState({});
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const handleManagerData = async () => {
      try {
        const response = await posDashboard();
        if (response.data.success) {
          setManager(response.data.ManagerData);
          setRestaurant(response.data.RestaurantData);
        } else {
          toastError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleManagerData();
  }, []);

  const handleOrderSubmit = async () => {
    try {
      navigate("/pos-dashboard/pos-menu", {
        state: { HoldMenu: selectedOrder },
      });

      props.onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintSubmit = async () => {
    try {
      const data = {
         userId : selectedOrder._id,
         amount :Amount

      }

      console.log(data," i am data");

      const response = await PrintBill(data);

      if (response.data.success) { 
        toastSuccess("Order saved");
        setIndicator(!  indicator)
        navigate("/pos-dashboard");
        props.onCancel()
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { gstAmount, grandTotal } = calculateGST(Amount);

  return (

    <Wrapper centered {...props}>
      <div>
        <h4 className="title">Order Summary</h4>
        <div className="form-div">
          <div className="bill-header">
            <div className="restaurant-header">
              <h5>{restaurant.username || "Restaurant"}</h5>
              {restaurant.address && restaurant.address.length > 0 && (
                <div>
                  {restaurant.address.map((addressItem, index) => (
                    <div key={index}>
                      <p>
                        {addressItem.building}, {addressItem.city},{" "}
                        {addressItem.pin},{addressItem.district},{" "}
                        {addressItem.state}
                      </p>

                      <p>Phone: {addressItem.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header-div">
              <div className="header-info">
                {/* <p>BILL NO: {selectedOrder.billId}</p> */}
                <p>DATE: {formatDate(selectedOrder.date)}</p>
              </div>

              <div className="header-info">
                <p>POS ID: {manager && manager.employeeId}</p>
              
              </div>
            </div>
          </div>
          <div className="summary-items">
            <div className="summary-heading">
              <p className="menu-item-name">Menu Item</p>
              <p style={{ width: "15%", textAlign: "center" }}>Quantity</p>
              <p style={{ width: "15%", textAlign: "center" }}>Price</p>
              <p style={{ width: "15%", textAlign: "center" }}>Value</p>
            </div>
            {KotItems&&KotItems.map((item, index) => {
              const subtotal = item.quantity * item.price;
              return (
                <div key={index} className="single-item">
                  <p className="menu-item-name">{item.item}</p>
                  <p className="quantity">x{item.quantity}</p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {item.price}
                  </p>
                  <p className="price">
                    <MdCurrencyRupee />
                    {item.totalItemPrice ? item.totalItemPrice : subtotal}

                  </p>
                </div>
              );
            })}
          </div>
          <div className="total">
            <p>SubTotal Amount</p>
            <p>
              <MdCurrencyRupee />
              {Amount && Amount}
            </p>
          </div>
          <div className="total gst">
            <p>Gst Amount</p>
            <p>
              <MdCurrencyRupee />
              {gstAmount}
            </p>
          </div>

          <div className="total">
            <p>Total Amount</p>
            <p>
              <MdCurrencyRupee />
              {grandTotal}
            </p>
          </div>

          <div className="restaurant-header" style={{ marginTop: "20px" }}>
            <h6>thank you for your visit!</h6>
            <p>have a nice day!</p>
          </div>

          <div className="form-btn">
          <button onClick={handleOrderSubmit}>Continue</button>

            <button onClick={handlePrintSubmit}>
              <IoMdPrint style={{ marginRight: "10px", fontSize: "20px" }} />
              Print Bill
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
//     <Wrapper centered {...props}>
//       <h4 className="title">Order Summary</h4>
//       <div className="form-div">
//         <div id="printContent">
//         <div className="summary-items ">
//   <div className="heading d-flex justify-content-between">
//     <p>Item</p>
//     <p className="quantity">Quantity</p>
//     <p className="price">Price</p>
//     <p className="price">Total </p>
//   </div>
//   {KotItems &&
//     KotItems.map((item, index) => {
//       const subtotal = item.quantity * item.price;

//       return (
//         <div key={index} className="single-item">
//           <p>{item.item}</p>
//           <p className="quantity">x{item.quantity}</p>
//           <p className="price">
//             <MdCurrencyRupee />
//             {item.price}
//           </p>
//           <p className="price">
//             <MdCurrencyRupee />
//             {item.totalItemPrice ? item.totalItemPrice : subtotal}
//           </p>
//         </div>
//       );
//     })}
// </div>

//           <div className="total">
//             <p>SubTotal Amount</p>
//             <p>
//               <MdCurrencyRupee />
//               {Amount && Amount}
//             </p>
//           </div>
//         </div>
//         <div className="form-btn">
//           <button onClick={handleOrderSubmit}>Continue</button>
//           <button onClick={handlePrintSubmit}>
//             <IoMdPrint style={{ marginRight: "10px" }} />
//             Print Bill
//           </button>
//         </div>
//       </div>
//     </Wrapper>
  );
};
export default TakeAwayOrderSummaryModal;
