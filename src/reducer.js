const reducer = (state, action) => {
    if (action.type === 'GET_PHOTOS_BEGINS') {
        return { ...state, isLoading: true }
    }

    if (action.type === 'GET_PHOTOS_SUCCESS') {
        const { query, page } = state;
        let data;

        if (query) {
            // Иногда получаем дубликаты от API. Чтобы избежать их - фильтруем поступивший массив, избавлясь от элементов с таким же id, как у элементов в photos
            data = action.payload.results.filter(item => !state.photos.some(photo => photo.id === item.id))
        }

        if (query && page === 1) {
            console.log(data)
            return { ...state, photos: data, isLoading: false }
        } else if (query) {
            console.log(data)
            return { ...state, photos: [...state.photos, ...data], isLoading: false }
        } else {
            data = action.payload.filter(item => !state.photos.some(photo => photo.id === item.id))
            console.log(data)
            return { ...state, photos: [...state.photos, ...data], isLoading: false }
        }

    }

    if (action.type === 'GET_PHOTOS_ERROR') {
        console.log(action.payload)
        // идея: добавить в стейт photos_error, чтобы рендерить компонент с ошибкой
        return { ...state, isLoading: false }
    }

    if (action.type === 'UPDATE_PAGE') {
        if (!state.isLoading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
            return { ...state, page: state.page + 1 }
        }
        else {
            return { ...state }
        }
    }

    if (action.type === 'UPDATE_QUERY') {
        return { ...state, query: action.payload }
    }

    if (action.type === 'SET_PAGE') {
        return { ...state, page: 1 }
    }

    throw new Error('no matching action type')
}

export default reducer;