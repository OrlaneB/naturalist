import './App.css'
import SearchPlace from './components/searchPlace'
import ObservationGrid from './components/ObservationGrid'
import ObservationPage from './pages/observationPage'
import FavoritePage from './pages/FavoritePage'
import { useState } from 'react'
import {Routes,Route,Link} from "react-router-dom"


type Place = {
  name:string,
  id:number
}

function App() {
  const [place,setPlace]=useState<Place|null>(null)



  return (
    <>
      <h1><Link to="/">Naturalist</Link></h1>
      <p><Link to="/favorites">See favorites</Link></p>

      <Routes>
        <Route path='/search' element={<SearchPlace setPlace={setPlace} />}/>
        <Route path='/' element={<ObservationGrid place={place || null}/>}/>
        <Route path='/observation/:id' element={<ObservationPage/>}/>
        <Route path='/favorites' element={<FavoritePage />} />
      </Routes>
      
    </>
  )
}

export default App
