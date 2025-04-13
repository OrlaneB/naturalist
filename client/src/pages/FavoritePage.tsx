import { useEffect, useState } from "react"
import axios from "axios"
import ObservationItem from "../components/ObservationItem"
import styles from "../styles/favoritePage.module.css"


type Props = {}

export default function FavoritePage({}: Props) {

    const [observations,setObservations] = useState<any[]>([])
    // const [names,setNames] =useState<string[]>([])

    const getObservations = async()=>{
        const response = await axios("http://localhost:3000/favorites")
        
        const {data} = response;
        const newObs:any[] = [];
        // const newNames:string[] = []

        data.forEach((o:{id:number,details:string,name:string})=>{
            newObs.push(JSON.parse(o.details));
            // newNames.push(o.name)
        })

        setObservations(newObs)
        // setNames(newNames)
    }

    useEffect(()=>{
        getObservations()
    },[])


  return (
    <>
        <div className={styles.gridFav}>
        {observations.map((o,index)=>(
            <ObservationItem key={index} obs={o}/>
        ))}
        </div>
    </>
  )
}