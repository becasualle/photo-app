import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo';
import { useGlobalContext } from './context'
import styles from './App.module.css'

function App() {
  const { photos, isLoading, query, handleChange, handleSubmit, handleLikedFilter, isLikedFilterOn } = useGlobalContext();

  return <main>

    <section className={styles.search}>
      <form className={styles.searchForm}>
        <input type="text" placeholder="поиск" className={styles.formInput} value={query} onChange={handleChange} />
        <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
          <FaSearch />
        </button>
      </form>
      <button onClick={handleLikedFilter} className={styles.btnFilter} id={isLikedFilterOn ? styles.active : undefined}>Моя коллекция</button>
    </section>
    <section className={styles.photos}>
      <div className={styles.photosCenter}>
        {photos.map(photo => <Photo key={photo.id} {...photo} />)}
      </div>
      {isLoading && <h2 className={styles.loading}>Loading...</h2>}
    </section>
  </main>
}

export default App
