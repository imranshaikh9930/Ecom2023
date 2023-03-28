import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";


function UserCartSidebar() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  //state
  const [clientToken, setClientToken] = useState("");
  const [instance,setInstance] = useState('');
  const [loading,setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  const getToken = async () => {
    try {
        setLoading(true)
      const { data } = await axios.get("/braintree/token");

      setLoading(false);
      console.log(data);
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("INR", {
      style: "currency",
      currency: "INR",
    });
  };
  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      //   console.log("nonce => ", nonce);
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      //   console.log("handle buy response => ", data);
      localStorage.removeItem("cart");
      setCart([]);
      Navigate("/dashboard/user/orders");
      toast.success("Payment successful");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="col-md-4">
      <h4>Your cart summary</h4>
      Total / Address / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4> Delivery Address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => Navigate("/dashboard/user/profile")}
          >
            Update address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => Navigate("/dashboard/user/profile")}
            >
              Add delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() =>
                Navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Login to checkout
            </button>
          )}
        </div>
      )}
      <div>
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{ 
                authorization:clientToken,
        
         }}
              onInstance={(instance) =>  setInstance(instance)}
            />
              <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing....":"Buy"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserCartSidebar;
