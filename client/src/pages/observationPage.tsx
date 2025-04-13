import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import styles from "../styles/observationPage.module.css"
import { useNavigate } from "react-router-dom"
import FavoriteButton from "../components/favoriteButton"

type Props = {}

export default function ObservationPage({}: Props) {

  const [observation,setObservation] = useState<any>(null)

  const observationID = useParams().id;
  const navigate = useNavigate()

  const getObservation = async ()=>{
    const response = await axios(`https://api.inaturalist.org/v1/observations/${observationID}`)

    if(response.statusText ==="OK"){
      const obs = response.data.results[0];
      setObservation(obs)
      // console.log(obs)
    } else {
      console.log("Couldn't get the observation")
    }


  }


  useEffect(()=>{
    if(observationID) getObservation()
  },[])

  return (
    <>
      <button onClick={()=>navigate(-1)}>Go back</button>
      <button onClick={()=>navigate("/search")}>Search for another place</button>

      {observation &&
        <>
          <h2>{observation.species_guess}</h2>
          <h3>{observation.taxon.name}</h3>

          <p dangerouslySetInnerHTML={{__html:observation.taxon.wikipedia_summary}} ></p>
          <a href={observation.taxon.wikipedia_url} target="blank"><button>Learn more</button></a>

          <div className={styles.columns}>
            
            <figure>
              <img src={observation.photos[0].url} 
              className={styles.mainImage} 
              style={{maxWidth:observation.photos[0].original_dimensions.width, maxHeight:observation.photos[0].original_dimensions.height}}
              />
              <FavoriteButton obs={observation}/>

              <figcaption>{observation.photos[0].attribution}</figcaption>
            </figure>

            <ul>
              <li>Created : {observation.created_at_details.date}</li>
              <li>Observations count : {observation.taxon.observations_count}</li>
              <li>Threatened : {observation.taxon.threatened?"true":"false"}</li>
            </ul>

          </div>

          <div className={styles.createdBy}>
            <img src={observation.user.icon_url} 
              className={styles.profilePicture}
            />
            <p>Observed by {observation.user.name}</p>
          </div>
        </>
      }

      {!observation &&
        <p>Loading...</p>
      }
    </>
  )
}