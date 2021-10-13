const reducer = (state, action) => {
    if (action.type === 'GET_PHOTOS_BEGINS') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'GET_PHOTOS_SUCCESS') {
        const { query, page } = state;
        if (query && page === 1) {
            return { ...state, photos: action.payload.results, isLoading: false }
        } else if (query) {
            return { ...state, photos: [...state.photos, ...action.payload.results], isLoading: false }
        } else {
            console.log(action.payload)
            return { ...state, photos: [...state.photos, ...action.payload], isLoading: false }
        }

    }

    if (action.type === 'GET_PHOTOS_ERROR') {
        console.log(action.payload)
        // идея: добавить в стейт photos_error, чтобы рендерить компонент с ошибкой
        return { ...state, isLoading: false }
    }
    throw new Error('no matching action type')
}

export default reducer;