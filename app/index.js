import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/popular'
import Battle from './components/battle'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/nav'

// Component: State + Lifecycle + UI
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme })=> ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
    }
  }

  render(){
    return(
      
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className='container'>
            <Nav />
            <Battle />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
