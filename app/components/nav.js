import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
import { FaLightbulb } from 'react-icons/fa'

export default function Nav () {
  
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
       <nav className='row space-between'>
         <button
          style={{fontSize: 30}}
          className='btn-clear'
          onClick={toggleTheme}
        >
          {theme === 'light' ? 
          <FaLightbulb className='button-clear' color='rgb(255, 191, 116)' size={40} />
          : <FaLightbulb className='button-clear' color='#727272' size={40} />}
        </button>
       </nav>
      )}
    </ThemeConsumer>
  )
}