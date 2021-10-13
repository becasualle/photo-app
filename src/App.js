import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo';
import { useGlobalContext } from './context'

function App() {
  const { names } = useGlobalContext();
  console.log(names)

  return <main>
    <section className="search">
      <form className="search-form">
        <input type="text" placeholder="поиск" className="form-input" value={{/*query*/ }} onChange={{/*e => setQuery(e.target.value)*/ }} />
        <button type="submit" className="submit-btn" onClick={{/*handleSubmit*/ }}>
          <FaSearch />
        </button>
      </form>
      <button onClick={{/*handleLiked*/ }}>liked</button>
    </section>
    <section className="photos">
      <div className="photos-center">
        {/* photos.map((photo, idx) => <Photo key={photo.id} item={photo} setLikedPhotos={setLikedPhotos} photos={photos} likedPhotos={likedPhotos} />)} */}

      </div>
      {/* {loading && <h2 className='loading'>Loading...</h2>} */}
    </section>
  </main>
}

export default App
