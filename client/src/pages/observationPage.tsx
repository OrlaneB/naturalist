import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styles from "../styles/observationPage.module.css"

type Props = {}

export default function ObservationPage({}: Props) {

  const [observation,setObservation] = useState<any>(null)

  const observationID = useParams().id;

  const getObservation = async ()=>{
    const response = await axios(`https://api.inaturalist.org/v1/observations/${observationID}`)

    if(response.statusText ==="OK"){
      const obs = response.data.results[0];
      setObservation(obs)
      console.log(obs)
    } else {
      console.log("Couldn't get the observation")
    }


  }


  useEffect(()=>{
    if(observationID) getObservation()
  },[])

  return (
    <>
      {observation &&
        <>
          <h2>{observation.taxon.name}</h2>

          <p dangerouslySetInnerHTML={{__html:observation.taxon.wikipedia_summary}} ></p>
          <a href={observation.taxon.wikipedia_url} target="blank"><button>Learn more</button></a>

          <div className={styles.columns}>
            
            <figure>
              <img src={observation.photos[0].url} 
              className={styles.mainImage} 
              style={{maxWidth:observation.photos[0].original_dimensions.width, maxHeight:observation.photos[0].original_dimensions.height}}
              />
              <figcaption>{observation.photos[0].attribution}</figcaption>
            </figure>

            <ul>
              <li>Created : {observation.created_at_details.date}</li>
              <li>Observations count : {observation.taxon.observations_count}</li>
              <li>Threatened : {observation.taxon.threatened?"true":"false"}</li>
            </ul>

          </div>

          <img src={observation.user.icon_url} />
          <p>Observed by {observation.user.name}</p>
        </>
      }

      {!observation &&
        <p>Loading...</p>
      }
    </>
  )
}