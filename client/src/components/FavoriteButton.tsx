import { useEffect, useState } from "react"
import styles from "../styles/favoriteButton.module.css"
import axios from "axios"

type Props = {
    obs:any
}

function FavoriteButton({obs}: Props) {

    const [isFavorite,setIsFavorite] = useState<boolean>(false)

    useEffect(()=>{
        if(!obs) console.log("No!")
    })

    async function addToFavorite(){
        await axios.post("http://localhost:3000/favorites",
        {
            name:obs.species_guess || obs.taxon.name,
            details: JSON.stringify(obs)
        })
        .then(()=>{
            // console.log("It worked!")
            setIsFavorite(true);
        })
        .catch(()=>{
            console.log("Did not work !")
        })
    }

  return (
    <button 
        className={styles.favoriteButton}
        onClick={()=>addToFavorite()}>
        <img src={isFavorite?"heart-full.png":"heart.png"} />
    </button>
  )
}

export default FavoriteButton