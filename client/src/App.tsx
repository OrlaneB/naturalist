import './App.css'
import SearchPlace from './components/searchPlace'
import ObservationGrid from './components/ObservationGrid'
import { useState } from 'react'


type Place = {
  name:string,
  id:number
}

function App() {
  const [place,setPlace]=useState<Place|null>(null)



  return (
    <>
      <h1>Naturalist</h1>
      {place &&
        <>
        <h2>{place.name}</h2>
        <ObservationGrid placeId={place.id}/>
        </>
      }
      {!place &&
        <SearchPlace setPlace={setPlace}/>
      }
      
    </>
  )
}

export default App
