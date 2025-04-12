import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ObservationItem from "./ObservationItem"
import styles from "../styles/observationGrid.module.css"

type Props = {
    placeId:number|null
}

function ObservationGrid({placeId}: Props) {

    const [observations,setObservations] = useState<string[]|null>(null)

    const navigate = useNavigate();

    useEffect(()=>{
        getObservationsFromAPI()
    },[])

    const getObservationsFromAPI = async()=>{

        if(placeId){

            console.log(placeId)

            const response = await axios(`https://api.inaturalist.org/v1/observations?place_id=${placeId}&order=desc&order_by=created_at`)

            console.log(response)

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
        <div className={styles.gridObs}>
            {observations &&
                observations.map((o,index:number)=>(
                    // <p key={index}>{o}</p>
                    <ObservationItem key={index} obs={o}/>
                ))
            }
        </div>
        {!placeId &&

            <p>No observations!</p>
        }

        <button onClick={()=>{navigate("/search")}}>Search for {placeId?"another":"a"} place</button>
    </div>
  )
}

export default ObservationGrid