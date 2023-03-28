import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForms from "../../components/forms/CategoryForms";
import { Modal } from "antd";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  // Modal Visiblity
  const [visible, setVisible] = useState(false);
  // selected Category
  const [selected,setSelected] = useState(null);
  // Updating Category 
  const [updateName,setUpdateName] = useState("");


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadingCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };

  const handleUpdate = async (e)=>{
    e.preventDefault();

    try{
        const {data} = await axios.put(`/category/${selected._id}`,{name:updateName})

        if(data?.error){
          toast.error(data.error);
        }
        else{
          toast.success(`${data.name} is updated`);
          setSelected(null)
          setUpdateName("");
          loadingCategories();
          setVisible(false);
        }
      console.log("Update Category", updateName);

    }catch(e){
      console.log(e);
      toast.error("Category may already Exist. Try Again")
    }

  }
  const handleDelete = async (e)=>{
    e.preventDefault();

    try{
        const {data} = await axios.delete(`/category/${selected._id}`)

        if(data?.error){
          toast.error(data.error);
        }
        else{
          toast.success(`${data.name} is Deleted`);
          setSelected(null)
          loadingCategories();
          setVisible(false);
        }
      console.log("Update Category", updateName);

    }catch(e){
      console.log(e);
      toast.error("Category may already Exist. Try Again")
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

            {/* Category Form code reuse */}
            <CategoryForms
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />

            {categories.map((c) => (
              <button
                key={c._id}
                className="btn btn-outline-primary m-3"
                onClick={() => {
                  setVisible(true);
                  setSelected(c);
                  setUpdateName(c.name);
                }}
              >
                {c.name}
              </button>
            ))}
            <Modal
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForms
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
                handleDelete ={handleDelete}
                buttonText="Update"
              
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
