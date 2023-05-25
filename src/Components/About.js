import React, { useContext, useEffect } from 'react'
import NoteContext from './Context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext)
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
      <h1>this is about {a.state.name} and he is in {a.state.class}</h1>
  )
}

export default About
