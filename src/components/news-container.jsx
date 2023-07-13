import {AppContext } from './context';
import '../App.css'
import { useContext } from 'react';


//initialstate of state

function News() {

    //const [ news , setNews ] = useState('')
    
    //const [ state, dispatch ] = useReducer(reducer, initialState);
    //const [ isLoading, setIsLoading ] = useState('true');

    //const of api 

    //useEffect

    //removePost function

    const { removePost, isLoading, hits } = useContext(AppContext)

    if(isLoading){
        return <h3 className="loader">Loading...</h3>
    }

    return(
        <div className='news-container'>
            {
                hits.map((item)=> {
                    const { url } = item;
                    return <>
                    <div className="news-card">
                        <h3>{item.title}</h3>
                        <span>By <i className="bold-char">{item.author}</i> <span>||</span> <span className="bold-char">{item.num_comments}</span> comments</span>
                        <h4>Created at : <span>{item.created_at}</span></h4>
                        <div className="extra_feature">
                            <a href={url} target="_blank">read me more</a>
                            <a onClick={() => removePost(item.objectID)}>Remove</a>
                        </div>
                    </div>
                    </>
                })
    
            }
        </div>
    )
}

export default News;