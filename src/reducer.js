const reducer = (state, action) => {
    if (action.type === 'GET_PHOTOS_BEGINS') {
        return { ...state, isLoading: true }
    }


    // 2. если введен запрос - сними фильтр и покажи все фото по запросу
    // после ввода поискового запроса и отправки формы - не удаляй лайкнутые изображения

    if (action.type === 'GET_PHOTOS_SUCCESS') {
        const { query, page } = state;
        let data;

        if (query) {
            // Иногда получаем дубликаты от API. Чтобы избежать их - фильтруем поступивший массив, избавлясь от элементов с таким же id, как у элементов в photos
            data = action.payload.results.filter(item => !state.photos.some(photo => photo.id === item.id))
        }

        if (query && page === 1) {
            console.log(data)
            return { ...state, all_photos: data, photos: data, isLoading: false }
        } else if (query) {
            console.log(data)
            return { ...state, all_photos: [...state.photos, ...data], photos: [...state.photos, ...data], isLoading: false }
        } else {
            data = action.payload.filter(item => !state.photos.some(photo => photo.id === item.id))
            console.log(data)
            return { ...state, all_photos: [...state.photos, ...data], photos: [...state.photos, ...data], isLoading: false }
        }

    }

    if (action.type === 'GET_PHOTOS_ERROR') {
        console.log(action.payload)
        // идея: добавить в стейт photos_error, чтобы рендерить компонент с ошибкой
        return { ...state, isLoading: false }
    }

    if (action.type === 'UPDATE_PAGE') {
        // если пользователь доскроллил до конца страницы - подгрузи данные для следующей страницы
        // подгружай только в том случае, если пользователь не находится на странице фильтров и в данный момент не идет загрузка других фотографий
        if (!state.isLikedFilterOn && !state.isLoading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
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
        return { ...state, page: 1, isLikedFilterOn: false }
    }

    if (action.type === 'TOGGLE_LIKE') {
        // TODO: если мы находимся на странице лайкнутых фото - обнови photos: liked_photos чтобы сразу убрать фото из рендера этой страница
        // TODO: если находимся на общей странице (фильтр не применен) - просто почисти статус
        // TODO: вне зависимости от того, какой у нас массив на входе - с этим элементом или нет (когда в случае поиска изменился массив) - пройдись по элементам и замени статус islikedbyuser на актуальный
        let newLikedPhoto;
        const id = action.payload;
        // если фото уже лайкнуто - удали его из коллекции
        const isInLikedPhotos = state.liked_photos.some(photo => photo.id === id);
        if (isInLikedPhotos) {
            const tempLiked = state.liked_photos.filter(photo => photo.id !== id)
            return { ...state, liked_photos: tempLiked }
        } else {
            // если оно не лайкнуто - добавь в коллекцию
            const tempAll = state.all_photos.map(photo => {
                if (photo.id === id) {
                    photo.liked_by_user = true;
                    newLikedPhoto = photo;
                }
                return photo
            })
            return { ...state, all_photos: tempAll, liked_photos: [...state.liked_photos, newLikedPhoto] }
        }
    }

    if (action.type === 'TOGGLE_LIKED_FILTER') {
        if (state.isLikedFilterOn) {
            // если фильтр сейчас активен - значит убери фильтр и покажи все фотографии
            return { ...state, isLikedFilterOn: !state.isLikedFilterOn, photos: state.all_photos }
        } else {
            // если фильтр выключен - включи его и покажи только лайкнутые фотографии
            return { ...state, isLikedFilterOn: !state.isLikedFilterOn, photos: state.liked_photos }
        }

    }

    throw new Error('no matching action type')
}

export default reducer;