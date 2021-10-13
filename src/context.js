import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { clientID, mainUrl, searchUrl } from './constants';

const AppContext = React.createContext();

const initialState = {
    isLoading: false,
    photos: [],
    page: 1,
    query: ''
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { page, query } = state;

    const fetchImages = async () => {
        dispatch({ type: 'GET_PHOTOS_BEGINS' })

        let url;
        const urlPage = `&page=${page}`
        const urlQuery = `&query=${query}`
        if (query) {
            url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
        } else {
            url = `${mainUrl}${clientID}${urlPage}`
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: 'GET_PHOTOS_SUCCESS', payload: data })

        } catch (error) {
            dispatch({ type: 'GET_PHOTOS_ERROR', payload: error })
            //   setLoading(false)
            //   console.log(error)
        }
    }

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line
    }, [page])


    return (
        <AppContext.Provider
            value={{
                ...state
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }