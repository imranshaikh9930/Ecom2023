import axios from "axios";
import { useState,useEffect} from "react"
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const [values,setValue] = useSearch();
    const Navigate = useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{    
            const {data} = await axios.get(`/products/search/${values.keyword}`)
            console.log(data);
            setValue({...values,results:data});
            Navigate("/search")
    
          
         

        }catch(e){
            console.log(e);
        }
        
    }
    return (
        <>
          <form className="d-flex" onSubmit={handleSubmit}>
          <input 
          type="search"
          style={{borderRadius:"1px",height:"3rem"}}
          className="form-control p-1"
          placeholder="Search...."
          onChange={e=>setValue({...values,keyword:e.target.value})}
          value={values.keyword}
           
          />
          <button className="btn btn-outline-primary p-1" style={{height:'3rem',width:"6rem"}} type="submit">Search</button>
        </form>
      
        </>
    )
}