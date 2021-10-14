import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo';
import { useGlobalContext } from './context'

function App() {
  const { photos, isLoading, query, handleChange, handleSubmit, handleLikedFilter } = useGlobalContext();

  return <main>
    <section className="search">
      <form className="search-form">
        <input type="text" placeholder="поиск" className="form-input" value={query} onChange={handleChange} />
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          <FaSearch />
        </button>
      </form>
      <button onClick={handleLikedFilter}>моя коллекция</button>
    </section>
    <section className="photos">
      <div className="photos-center">
        {photos.map(photo => <Photo key={photo.id} {...photo} />)}

      </div>
      {isLoading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App
