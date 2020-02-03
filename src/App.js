import React, {useEffect, useState} from "react"
import ReactMapGL, {Marker} from "react-map-gl"
import TopBox from "./components/topbox"

function App() {
  const [viewport, setViewport] = useState({
    latitude: 59.334591,
    longitude: 18.06324,
    width: "100vw",
    height: "100vh",
    zoom: 8
  })
  const [delay, setDelay] = useState("")
  function fetchData() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://labs.thetrainbrain.com/knockon/?minutes=30"
    )
      .then(response => response.json())
      .then(data => setDelay(data))
  }
  useEffect(() => {
    setInterval(() => {
      fetchData()
    }, 5000)
  }, [])
  return (
    <div>
      <ReactMapGL
        className="map"
        {...viewport}
        mapStyle="mapbox://styles/timolsson/ck5za7t0m0q7r1ipccguemt6i"
        mapboxApiAccessToken="pk.eyJ1IjoidGltb2xzc29uIiwiYSI6ImNrNXo4bmdvODBya3UzbG5qd3hsZXY2YWsifQ.Tl62NRb0hKYTZR8maLDVzA"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        {delay == ""
          ? console.log("loading...")
          : delay.disruptions.map(disruptions => (
              <Marker
                key={disruptions.station.station}
                latitude={Number(disruptions.station.lat)}
                longitude={Number(disruptions.station.lng)}
              >
                <div>DELAY</div>
              </Marker>
            ))}
        <TopBox />
      </ReactMapGL>
    </div>
  )
}
export default App
