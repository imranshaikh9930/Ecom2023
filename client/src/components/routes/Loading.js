import React,{useEffect,useState} from 'react';
import {useNavigate,useLocation } from "react-router-dom";
import LoadingGif from "../../images/loading.gif";


function Loading({}) {
  const [count,setCount] = useState(3);

  const Navigate = useNavigate();
  const location  = useLocation();
  console.log(location);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    // if user on other tab then state value consider to redirect page
    count === 0 && Navigate(`/login`,{
      state:location.pathname
    });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
  
      <img src={LoadingGif} alt='Loading' style={{width:"400px"}}/>
    </div>
  )
}

export default Loading