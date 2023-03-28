import { useAuth } from "../../context/auth";
import { useState,useEffect} from "react";
import toast from "react-hot-toast";
import UserMenu from "../../components/nav/UserMenu";
import axios from "axios";

export default function UserProfile() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [address,setAddress] = useState("");

  useEffect(()=>{

    const {name,email,address } = auth.user;
    setName(name);
    setEmail(email);
    setAddress(address);

  },[auth?.user])

  const handleSubmit  = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.put("/profile",{
        name,email,address
      })
  // console.log("profile update Data",data);
      if(data?.error){
        toast.error(data.error)
      }else{
        setAuth({...auth,use:data});
        //local storage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        // console.log("ls user",ls.user);
        ls.user = data;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile update");
      }

    
    

    }catch(e){
      console.log(e);
    }
  }

  return (
    <>


      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-5 mb-5 h4 bg-light">Profile</div>

                <form onSubmit={handleSubmit} >
                  <input
                  type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}

                  />
                  <input
                  type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}

                  />
                  <input
                   type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}

                  />
                  <textarea
                  className="form-control m-2 p-2"
                  placeholder="Enter Your Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
              

                  />

                  <button className="btn btn-primary">Submit</button>

                </form>
          </div>
        </div>
      </div>
    </>
  );
}
