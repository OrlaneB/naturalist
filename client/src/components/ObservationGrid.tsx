import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ObservationItem from "./ObservationItem"
import styles from "../styles/observationGrid.module.css"

type Place = {
    name:string,
    id:number
}

type Props = {
    place : Place|null
}

function ObservationGrid({place}: Props) {

    const [observations,setObservations] = useState<string[]|null>(null)

    const navigate = useNavigate();

    useEffect(()=>{
        getObservationsFromAPI()
    },[])

    const getObservationsFromAPI = async()=>{

        if(place){

            // console.log(place.id)

            const response = await axios(`https://api.inaturalist.org/v1/observations?place_id=${place.id}&order=desc&order_by=created_at`)

            if(response.data.results.length>0){

                let itemsNumber :number = response.data.results.length>=16? 16 : response.data.results.length

                let newObservations:string[] = [];

                for(let i=0;i<itemsNumber;i++){
                    if(!response.data.results[i].taxon){
                        itemsNumber++;
                    }else {
                        // const name = response.data.results[i].taxon.name;
                        newObservations.push(response.data.results[i])
                    }
                    
                }

                setObservations(newObservations)
            }

        }
        
        
    }

  return (
    <div>
        <h2>{place?.name}</h2>
        <div className={styles.gridObs}>
            {observations &&
                observations.map((o,index:number)=>(
                    // <p key={index}>{o}</p>
                    <ObservationItem key={index} obs={o}/>
                ))
            }
        </div>
        {!place &&

            <p>No observations!</p>
        }

        <button onClick={()=>{navigate("/search")}}>Search for {place?"another":"a"} place</button>
    </div>
  )
}

export default ObservationGrid