import Sidebar from './Sidebar'
import ArtikelList from './ArtikelList'
import './App.css'

function App() {

  return (
    <div className='main-section flex'>
      <main>

      <ArtikelList/>

      </main>


      <aside>

      <Sidebar/>

      </aside>
    </div>
  )
}

export default App
