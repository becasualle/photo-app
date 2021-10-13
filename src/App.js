import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalContext } from './context'

function App() {
  const { names } = useGlobalContext();
  console.log(names)

  return <main>

  </main>
}

export default App
