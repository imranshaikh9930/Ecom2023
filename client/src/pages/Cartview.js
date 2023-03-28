import React from "react";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../context/auth";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCartHorizontal from "../components/cards/ProductCartHorizontal";

function Cartview() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const Navigate = useNavigate();

 

  return (
    <>
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
          {cart?.length ? (
            "My Cart"
          ) : (
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={() => Navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>


  {cart?.length && (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {cart?.map((p, index) => (
              <div
                key={index}
                className="card mb-3"
                
              >
                {/* product view in cart  */}
                <ProductCartHorizontal p={p} index={index} />
               
              </div>
            ))}
          </div>
        </div>

        {/* Seprate component */}
        {/* address/payment */}
        <UserCartSidebar/>

      
      </div>
    </div>
  )}
</>
     
  );
}

export default Cartview;
