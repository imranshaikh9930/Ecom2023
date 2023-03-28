import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export default function AdminProduct() {

  const Navigate  = useNavigate();
  // context
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState();
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadingCategories();
  }, []);

  const loadingCategories = async () => {
    try {
      const { data } = await axios.get("/category");
      setCategories(data);
      console.log(data);
    } catch (err) {}
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const productData = new FormData();
      productData.append  ("photo",photo);
      productData.append  ("name",name);
      productData.append  ("description",description);
      productData.append  ("price",price);
      productData.append  ("category",category);
      productData.append ("shipping",shipping);
      productData.append  ("quantity",quantity);

     const {data} =  await axios.post("/product",productData);
     
     if(data?.error){
      toast.error(data.error);
     }
     else{
      toast.success(`"${data.name}" is created`);
      Navigate("/dashboard/admin/products");


     }

    }catch(e){
      console.log(e);
      toast.error("Product create failed. Try again.");
    }

  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {photo && <div className="text-center">
              <img
              src={URL.createObjectURL(photo)}
              alt="product photo"
              className="img img-responsive"
              height="200px"
              />

              
              </div>}

            <div className="pt-2">
              <label className="btn btn-outline-secondary  col-12 mb-3">
                {photo ? photo.name :"Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
                 
                  hidden
                />
              </label>

              <input  className="form-control p-2 mb-3"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              
            />
              <textarea  className="form-control p-2 mb-3"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              
            />
            <input  className="form-control p-2 mb-3"
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              
            />
            </div>
            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose Category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c.id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input  className="form-control p-2 mb-3"
            min="1"
              type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              
            />
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
