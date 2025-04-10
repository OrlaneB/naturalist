import { useEffect, useState } from "react"
import axios from "axios"

type Props = {
    placeId:number
}

function ObservationGrid({placeId}: Props) {

    const [observations,setObservations] = useState<string[]|null>(null)

    useEffect(()=>{
        getObservationsFromAPI()
    },[])

    const getObservationsFromAPI = async()=>{
        const response = await axios(`https://api.inaturalist.org/v1/observations?place_id=${placeId}&order=desc&order_by=created_at`)

        if(response.data.results.length>0){

            const itemsNumber :number = response.data.results.length>=10? 9 : response.data.results.length

            let newObservations:string[] = [];

            for(let i=0;i<itemsNumber;i++){
                const name = response.data.results[i].taxon.name;
                newObservations.push(name)
            }

            setObservations(newObservations)
        }

        
    }

  return (
    <div>
        {observations &&
            observations.map((o:string,index:number)=>(
                <p key={index}>{o}</p>
            ))
        }
    </div>
  )
}

export default ObservationGrid