// import React from 'react'
import { useState } from "react"
import axios from "axios"
import styles from "../styles/searchPlace.module.css"
import { useNavigate } from "react-router-dom"



type Place = {
    name:string,
    id:number
}

type Props = {
    setPlace:React.Dispatch<React.SetStateAction<Place|null>>;
}

export default function SearchPlace({setPlace}: Props) {

    const [inputValue,setInputValue] = useState<string>("")
    const [automplete,setAutocomplete] = useState<Place[] | null>(null)
    
    const navigate = useNavigate()

    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>){
        setInputValue(event.target.value)
        getAutocomplete()
    }

    function choosePlace(place:Place){
        setPlace(place);
        navigate("/");
    }

    const getAutocomplete = async() => {
        const response = await axios(`https://api.inaturalist.org/v1/places/autocomplete?q=${inputValue}`)

        if(response.data.results.length>0){

            let newAutocompletes = [];

            const itemsNumber :number = response.data.results.length>=5? 4 : response.data.results.length

            for(let i=0;i<=itemsNumber;i++){

                const {id,display_name} = response.data.results[i];

                const newAutocomplete:Place = {
                    name:display_name,
                    id
                }

                newAutocompletes.push(newAutocomplete)
            }
            
            setAutocomplete(newAutocompletes)
        }

        
    }

  return (
    <>
        <input type="text" value={inputValue} onChange={handleInputChange}/>
        {(automplete) &&
            automplete.map((a:Place,index:number)=>(
                <p key={index} 
                    onClick={()=>choosePlace(a)}
                    className={styles.suggestion}>
                    {a.name}
                </p>
            ))
        }
    </>
  )
}