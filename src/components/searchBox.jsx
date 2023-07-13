import { useContext } from "react";
import { AppContext } from "./context";

function SearchBox() {

    const  {query, searchPost} = useContext(AppContext);

    return (
        <div className='search-box-container'>
            <input type='text' value={query} placeholder='search here' name='searchINP' onChange={ (e) => searchPost(e.target.value)}/>
        </div>
    )
}

export default SearchBox ;