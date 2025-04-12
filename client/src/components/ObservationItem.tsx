

type Props = {
    obs:any
}

export default function ObservationItem({obs}: Props) {

    const {name} = obs.taxon
    // const imgSrc:string|null = obs.observation_photos[0].photo.url || null;

    const imgSrc =
        obs.observation_photos[0].photo.url ?
        obs.observation_photos[0].photo.url : "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <div style={{backgroundImage : `url(${imgSrc})`}}>
        <p>{name}</p>
    </div>
  )
}