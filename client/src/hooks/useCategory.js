import {useState,useEffect} from 'react';
import axios from "axios";

export default function useCategory(){

    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        loadCategory();
    },[])

    const loadCategory = async ()=>{
        try{
            
            const {data} = await axios.get("/category");
            setCategories(data);
        }catch(err){
            console.log(err);
        }
    }
    return categories;
}