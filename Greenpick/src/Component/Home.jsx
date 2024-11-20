import React from 'react'
import Hero from './Hero'
import About from './About'
import Ourpatners from './Ourpatners'
import Ourprocess from './Ourprocess'
import Chatbot from './Chatbot'

const Home = () => {
  return (
    <>
        <Hero />
        <About  />
        {/* <Ourpatners /> */}
        <Chatbot />
        <Ourprocess />
    </>
  )
}

export default Home
