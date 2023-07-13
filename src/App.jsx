import './App.css'
import Header from './components/header'
import SearchBox from './components/searchBox'
import News from './components/news-container'
import Pagination from './components/pagination'

function App() {

  return (
    <div className='app'>
    <Header />
    <SearchBox />
    <Pagination />
    <News />
    </div>
  )
}

export default App