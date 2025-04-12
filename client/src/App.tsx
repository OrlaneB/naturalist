import './App.css'
import SearchPlace from './components/searchPlace'
import ObservationGrid from './components/ObservationGrid'
import { useState } from 'react'
import {Routes,Route} from "react-router-dom"


type Place = {
  name:string,
  id:number
}

function App() {
  const [place,setPlace]=useState<Place|null>(null)



  return (
    <>
      <h1>Naturalist</h1>

      <Routes>
        <Route path='/search' element={<SearchPlace setPlace={setPlace} />}/>
        <Route path='/' element={<ObservationGrid placeId={place?.id || null}/>}/>
      </Routes>
      
    </>
  )
}

export default App
