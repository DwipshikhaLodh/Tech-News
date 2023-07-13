import React, { useReducer, useState, useEffect } from "react";

let API = "http://hn.algolia.com/api/v1/search?"; //query=html


const initialState = {
    query : "",
    nbPages : 0,
    page : 0,
    hits : []
}


const reducer = (state, action) => {

    switch(action.type){
        case "ADD_DATA":
            return { ...state, hits : action.payload._hits, nbPages : action.payload.nbPages}
        case "REMOVE_POST":
            return {
                ...state,
                hits : state.hits.filter(post => post.objectID !== action.payload.id)
            }
        case "SEARCH_POST":
            return {
                ...state,
                query : action.payload.value
            }
        case "PREV_PAGE":
            if(state.page <= 0){
                return { ...state, page : state.page }
            }
            return { ...state, page : state.page - 1}
        case "NEXT_PAGE":
            if(state.page + 1 >= state.nbPages){
                return { ...state, page : 0}
            }
            return { ...state, page : state.page + 1}
    }        
    
}

const AppContext = React.createContext();

const GlobalContextComponent = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ isLoading, setIsLoading ] = useState('true');

    const fetchData = async (API) => {
        try{
            await fetch(API).then(response => response.json().then(data => {
                //const actualData = data.hits;
                console.log(data)
                data.hits.map(item => {
                    console.log(item)
                })
                //data.map(obj => {
                //    console.log(obj.created_at)
                //})
                //setNews(actualData)
                dispatch({type : "ADD_DATA", payload : {
                    _hits : data.hits,
                    nbPages : data.nbPages
                }})
                setIsLoading(false)
            }))
        }catch(e){
            console.log(e)
        }
    }


    const removePost = (post_id) => {
        console.log(post_id)
        dispatch({type : "REMOVE_POST" , payload : {
            id : post_id
        }})
    }

    const searchPost = (value) => {
        dispatch({ type : "SEARCH_POST", payload : {
            value : value
        }})
    }

    const getPrevPage = () => {
        dispatch({ type : "PREV_PAGE"})
    }

    const getNextPage = () => {
        dispatch({ type : "NEXT_PAGE"})
    }

    useEffect(() => {
        fetchData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page])


    return (
        <AppContext.Provider value={{...state, removePost, searchPost, isLoading, getNextPage, getPrevPage}}>{children}</AppContext.Provider>
    )
}

export { GlobalContextComponent, AppContext };