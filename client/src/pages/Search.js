import { useSearch } from "../context/Search";
import ProductCard from "../components/cards/ProductCard";

export default function Search(){
    const [values,setValues]  = useSearch();


    return (
        <>
        <h3 className="text-center mt-4">Search Results.....</h3>
        <div className="container mt-3">

            <div className="row"> 
                {
                    values.results.map((p)=>(
                        <div key={p._id} className="col-md-4">
                            <ProductCard p={p}/>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}
