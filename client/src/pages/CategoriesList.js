import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function CategoriesList(){
    // Custom hook
    const categories = useCategory();
    return (
        <>
        <div className="container overflow-hiddeng">
            <div className="row gx-5 gy-5 mt-3 mb-5">
                
                 
            {
                categories.map((c)=>(
                    <div className="col-md-6" key={c._id}>
                        <button className="btn btn-light p-3 col-12 text-dark">
                            <Link to={`/category/${c.slug}`}>{c.name}</Link>
                        </button>
                    </div>
                ))
            }
            </div>
        </div>
        </>
    )
}