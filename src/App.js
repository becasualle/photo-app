import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo';
import { useGlobalContext } from './context'

function App() {
  const { photos, isLoading } = useGlobalContext();

  return <main>
    <section className="search">

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
