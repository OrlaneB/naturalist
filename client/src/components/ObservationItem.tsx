import { useNavigate } from "react-router-dom"
import FavoriteButton from "./favoriteButton"

type Props = {
    obs:any
}

export default function ObservationItem({obs}: Props) {

    const navigate = useNavigate()
    const {name} = obs.taxon
    // const imgSrc:string|null = obs.observation_photos[0].photo.url || null;

    const imgSrc =
        obs.observation_photos[0] ?
        obs.observation_photos[0].photo.url ?
        obs.observation_photos[0].photo.url : "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <div style={{backgroundImage : `url(${imgSrc})`}}
        onClick={()=>navigate(`/observation/${obs.id}`)}
        >
        <p>{obs.species_guess || name}</p>
        <FavoriteButton obs={obs}/>
    </div>
  )
}