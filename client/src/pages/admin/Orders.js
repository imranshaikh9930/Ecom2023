import { useAuth } from "../../context/auth";
import { useState,useEffect } from "react";
import AdminMenu from "../../components/nav/UserMenu";
import moment from "moment";
import axios from "axios";
import ProductCartHorizontal from "../../components/cards/ProductCartHorizontal";
import { Select } from "antd";

const {Option} = Select;

export default function AdminOrders() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [order,setOrder] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");


  useEffect(()=>{

    if(auth?.token){
      getOrder();
    }
  },[auth?.token])
  
  
  const getOrder = async()=>{

    try{
      const {data} = (await axios.get("/all-orders"));
      console.log("Orders",data);
      setOrder(data);

    }catch(err){
      console.log(err);
    }
  }
  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrder();
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>


      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-5 mb-5 h4 bg-light">Orders</div>

            {
              order?.map((o,i)=>{
                return (
                  <div key={o._id} className="border shadow bg-light rounded-3 mb-5">
          
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Ordered</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i+1}</td>
                          <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                          <td>{o?.status}</td>
                          <td>{moment(0?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" :"Failed"}</td>
                          <td>{o?.products?.length} products</td>
                        </tr>
                      </tbody>

                    </table>
                    <div className="container"> 
                    <div className="row m-2">
                      {
                        o?.products?.map((p,i)=>(
                          <ProductCartHorizontal key={i} p={p} remove={false}/>

                        ))
                      }
                    </div>


                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </>
  );
}
