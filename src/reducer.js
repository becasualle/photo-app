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
        // нужно задать разное поведение в зависимости от двух условий - применен ли сейчас фильтр коллекции и лайкали ли мы фото ранее (содержится ли оно в коллекции)
        let toggledPhoto;
        const id = action.payload;
        const isInLikedPhotos = state.liked_photos.some(photo => photo.id === id);
        const updateLikedByUser = () => {
            const tempAll = state.all_photos.map(photo => {
                if (photo.id === id) {
                    photo.liked_by_user = !photo.liked_by_user;
                    toggledPhoto = photo;
                }
                return photo
            })
            return tempAll
        }
        // если фото уже в коллекции (лайкнуто) - сними лайк и убери из коллекции. Если еще не в коллекции - поставь лайк и добавь в нее.
        if (isInLikedPhotos) {
            const tempLiked = state.liked_photos.filter(photo => photo.id !== id)
            const tempAll = updateLikedByUser();
            // если снимаем лайк, когда применен фильтр - сразу отобрази удаление фото из страницы (обнови photos на основе которого строится рендер)
            if (state.isLikedFilterOn) {
                return { ...state, all_photos: tempAll, liked_photos: tempLiked, photos: tempLiked }
            } else {
                return { ...state, all_photos: tempAll, liked_photos: tempLiked, photos: tempAll }
            }
        } else {
            // если фото еще не в коллекции - поставь лайк и добавь в нее. Это также означает, что фильтр точно не активен, ведь там показываются только фото в коллекции.
            const tempAll = updateLikedByUser();
            return { ...state, all_photos: tempAll, liked_photos: [...state.liked_photos, toggledPhoto], photos: tempAll }
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