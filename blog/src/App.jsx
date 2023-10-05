import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ArtikelList from './ArtikelList'

function App() {

  return (
    <div>
      <Navbar/>
      <div className='artikel-list main-container flex'>
        <main>
          <ArtikelList/>
        </main>
        <aside>
          <Sidebar/>
        </aside>
      </div>
    </div>
  )
}

export default App
