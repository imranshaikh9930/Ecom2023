import { useEffect,useState  } from "react";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../context/auth";
import {useNavigate }from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

export default function AdminRoute(){
    const [auth,setAuth] = useAuth();
    const Navigate = useNavigate();

    const [ok,setOk] = useState(false);

    useEffect( ()=>{
        const adminCheck = async ()=>{

            const {data}  = await axios.get("/admin-check")

            if(data.ok){
                setOk(true);
    
            }else{
                setOk(false);
                // Navigate("/login")
            }
    
            

        }
        if(auth.token) adminCheck();

      

    },[auth?.token]);

    return ok ? <Outlet/> : <Loading path=""/>
}