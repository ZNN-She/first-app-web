import { useState } from 'react'
import { HashRouter } from "react-router-dom";
import reactLogo from './assets/react.svg'
import Navigation from './components/layout/navigation'
import Menu from './components/layout/menu'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-header-logo">logo</div>
        <Navigation />
      </div>
      <div className="app-body">
        <div className="app-body-sider">
          <Menu />
        </div>
        <div className="app-body-content">
          <div style={{ height: 1000 }}>
            内容
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
