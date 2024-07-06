import toast from "react-hot-toast";
import { RestaurantAdminApi } from "../config/global";

export function formatCurrency(amount, currencyCode = 'INR') {
    const formatter = new Intl.NumberFormat('en-IN', {
    
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
  
    return formatter.format(amount);
}
  
export function calculateGST(subtotalAmount) {
  // GST rate is 5%
  const gstRate = 0.05;

  // Calculate GST amount
  const gstAmount = subtotalAmount * gstRate;

  // Calculate grand total including GST
  const grandTotal = subtotalAmount + gstAmount;

  const roundedGSTAmount = gstAmount.toFixed(1);
  const roundedGrandTotal = grandTotal.toFixed(1);
  // Return an object containing GST amount and grand total
  return {
      gstAmount: roundedGSTAmount,
      grandTotal: roundedGrandTotal
  };
}


export function generateRandomBillIdWithPrefix(prefix = 'BIPL', length = 7) {

  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;

  for (let i = prefix.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
 
   
    hour12: true, // Use 24-hour format
  };

  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleDateString(undefined, options);
  return formattedDateTime;
}

export function floorNumber(number) {
  return Math.floor(number);
}

let isToastVisible = false
export function toastError(message) {
  if (!isToastVisible) {
  
    isToastVisible=true
    const toastId = toast.error(message,{duration:3000});
    const toastDuration =3000
    setTimeout(() => {
   
      isToastVisible=false
    }, toastDuration);
  }
  }
export function toastSuccess(message) {
  if (!isToastVisible) {
 
    isToastVisible=true
    const toastId = toast.success(message,{duration:3000});
    const toastDuration =3000
    setTimeout(() => {
   
      isToastVisible=false
    }, toastDuration);
  }
  }


export const formatImageUrl = (url)=> RestaurantAdminApi.slice(0, RestaurantAdminApi.length-1) + url;


export const printPOSBill = (restaurant, manager, printBillData, TotalPrice, gstAmount, grandTotal) => {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Summary</title>

    <style>
    body {
      display: flex;
      justify-content: center;
      padding: 30px;
    }
    .body-print{
      width:300px;
    }
    .title {
      text-align: center;
      font-weight: 700;
      color: #393939;
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      text-transform: uppercase;
      margin:0px
    }
    
    .bill-header {
      width: 100%;
    
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .restaurant-header {
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 15px;
      p {
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 0px;
      }
    }
    .header-div {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .header-info > p {
      font-size: 12px;
      margin: 0px;
    }

   
    .summary-heading {
      width: 100%;
      display: flex;
      flex-direction:row;
      justify-content: space-between;
      gap:10
      align-items: center;
      p {
        font-weight: 700;
      }
    }
    .menu-item-name{
      width:60%;
    }
    .menu-item-name2{
      width:50%;
    }
    .food-check{
      width: 100%;
      display: flex;
      flex-direction:row;
      justify-content:end; 
      gap:10px
    }
   
    .single-item {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #c1c1c1;
      margin-bottom: 5px;
      p {
        font-size: 16px;
        margin-bottom: 5px;
      }
    }
  
    .quantity {
      text-align: center;
     
      color: #b6b6b6;
    }
    .price {
      text-align: center;
    
      font-weight: 600;
      font-size: 14px;
    }
    .total {
      text-align: center;
      
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-weight: 700;
        font-size: 16px;
        margin:5px 0;
      }
    }
    .gst {
      p {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 0px;
      }
    }

  </style>

 

  </head>
  <body>
  <div class=body-print>
    <h4 class="title">Order Summary</h4>
    <div class="form-div">
      <div class="bill-header">
        <div class="restaurant-header">
          <h5>${restaurant.username || "Restaurant"}</h5>
          ${
            restaurant.address && restaurant.address.length > 0
              ? restaurant.address
                  .map(
                    (addressItem, index) =>
                      `<div key=${index}>
                  <p>${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}</p>
                  <p>Phone: ${addressItem.phone}</p>
                </div>`
                  )
                  .join("")
              : "<p>No address found</p>"
          }
        </div>

         <div class="header-div">
            <div class="header-info">
              <div class="header-info">
              
              </div>
              <p>POS ID: ${manager && manager.employeeId}</p>
            </div>
        </div>
      </div>

      <div class="summary-items">
        <div class="summary-heading">
          <p class="menu-item-name">Menu Item</p>

          <div class="food-check">
            <p>Qty</p>
            <p>Price</p>
            <p>Value</p>
          </div>
         
          
        </div>
        ${printBillData?.map((val, index) => {
          const subtotal = val.orderedQuantity * val.discountPrice;
          return `<div key=${index} class="single-item">
              <p class="menu-item-name">${val.item}</p>
              <div class="food-check">
                <p class="quantity">x${val.orderedQuantity}</p>
                <p class="price">
                
                &#x20B9; ${val.discountPrice}
                </p>
                <p class="price">
                &#x20B9;${subtotal}
                </p>
              </div>
            </div>`;
        })}
      
      </div>
      <div class="total">
      <p>SubTotal Amount</p>
      <p>
      &#x20B9;
        ${TotalPrice}
      </p>
    </div>

      <div class="total gst">
      <p>Gst Amount</p>
      <p>
      &#x20B9;
        ${gstAmount}
      </p>
    </div>

    <div class="total">
      <p>Total Amount</p>
      <p>
      &#x20B9;
        ${grandTotal}
      </p>
    </div>


      <div class="restaurant-header" style={{ marginTop: "20px" }}>
        <h6>thank you for your visit!</h6>
        <p>have a nice day!</p>
      </div>


    </div>
  </div>

  </body>
  </html>
  `;

  // Open a new window and write the HTML content
  const popupWin = window.open('', '_blank', 'width=1000,height=600');
  popupWin.document.open();
  popupWin.document.write(htmlContent);
  popupWin.print();
  popupWin.close();
};
export const printKOT = (restaurant, manager, kotData, orderData) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kitchen Order Ticket (KOT)</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .body-print {
          width: 300px;
          /* Adjust width and other styles as needed */
        }
        .title {
          text-align: center;
          font-weight: 700;
          color: #393939;
          font-family: "Montserrat", sans-serif;
          font-size: 16px;
          text-transform: uppercase;
          margin: 0;
        }
        .restaurant-header {
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 15px;
        }
        .header-div {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .header-info > p {
          font-size: 12px;
          margin: 0;
        }
        .summary-heading {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .summary-heading p {
          font-weight: 700;
        }
        .single-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #c1c1c1;
          margin-bottom: 5px;
        }
        .menu-item-name {
          width: 60%;
        }
        .quantity {
          width: 15%;
          text-align: center;
        }
      </style>
    </head>
    <body onload="window.print();">
      <div class="body-print">
        <h4 class="title">Kitchen Order Ticket (KOT)</h4>
        <div class="form-div">
          <div class="bill-header">
            <div class="restaurant-header">
              <h5>${restaurant.username || "Restaurant"}</h5>
              ${restaurant.address && restaurant.address.length > 0 ? (
                `<div>
                  ${restaurant.address.map((addressItem, index) => (
                    `<div key=${index}>
                       <p>${addressItem.building}, ${addressItem.city}, ${addressItem.pin}, ${addressItem.district}, ${addressItem.state}</p>
                       <p>Phone: ${addressItem.phone}</p>
                     </div>`
                  )).join("")}
                </div>`
              ) : "<p>No address found</p>"}
            </div>
            <div class="header-div">
              <div class="header-info">
                <p>DATE: ${formatDate(Date.now())}</p>
              </div>
              <div class="header-info">
                <p>TABLE NO: ${orderData.tableName}</p>
                <p>CAPTAIN ID: ${manager && manager.employeeId}</p>
              </div>
            </div>
          </div>
          <div class="summary-items">
            <div class="summary-heading">
              <p class="menu-item-name">Menu Item</p>
              <p class="quantity">Quantity</p>
            </div>
            ${kotData && kotData.map((val, index) => {
              return `
                <div key=${index} class="single-item">
                  <p class="menu-item-name">${val.item}</p>
                  <p class="quantity">x${val.orderedQuantity}</p>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Open a new window and write the HTML content
  const popupWin = window.open('', '_blank', 'width=1000,height=600');
  popupWin.document.open();
  popupWin.document.write(htmlContent);
  popupWin.print();
  popupWin.close();
};
