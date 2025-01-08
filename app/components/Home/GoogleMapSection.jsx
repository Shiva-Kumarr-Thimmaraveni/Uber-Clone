import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api'
import { SourceContext } from '@/app/context/SourceContext'
import { DestinationContext } from '@/app/context/DestinationContext'

export default function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.45,
  }
  const { source, setSource } = useContext(SourceContext)
    const { destination, setDestination } = useContext(DestinationContext)

   const [center, setCenter] = useState({
     lat: -3.745,
     lng: -38.523,
   })


  const [map, setMap] = React.useState(null)
  const [directionRoutePoints, setDirectionRoutePoints] = useState([])

  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      })
      
      setCenter({
        lat: source.lat,
        lng: source.lng,
      })
    }
    if (source.length != [] && destination.length != []) {
      directionRoute()
    }
  }, [source])

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      })
    }

    if (source.length != [] && destination.length != []) {
      directionRoute()
    }
  }, [destination])

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService()
    console.log('DIE')
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result)
        } else {
          console.error('Error')
        }
      }
    )
  }

  

 return (
   <GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     zoom={11}
     onLoad={(map) => setMap(map)}
     options={{ mapId: '1c0850347fe6dc35' }}
   >
     <>
       {source.length != [] ? (
         <MarkerF
           position={{ lat: source.lat, lng: source.lng }}
           icon={{
             url: '/uberStartPoint.jpeg',
             scaledSize: {
               width: 20,
               height: 20,
             },
           }}
         >
           <OverlayViewF
             position={{ lat: source.lat, lng: source.lng }}
             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
           >
             <div className="p-2 bg-white font-bold inline-block">
               <p className="text-black text-[18px]">{source.label}</p>
             </div>
           </OverlayViewF>
         </MarkerF>
       ) : null}

       {destination.lenght != [] ? (
         <MarkerF
           position={{ lat: destination.lat, lng: destination.lng }}
           icon={{
             url: '/uberEndPoint.jpeg',
             scaledSize: {
               width: 18,
               height: 18,
             },
           }}
         >
           <OverlayViewF
             position={{ lat: destination.lat, lng: destination.lng }}
             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
           >
             <div className="p-2 bg-white font-bold inline-block">
               <p className="text-black text-[18px]">{destination.label}</p>
             </div>
           </OverlayViewF>
         </MarkerF>
       ) : null}

       <DirectionsRenderer
         directions={directionRoutePoints}
         options={{
           polylineOptions: {
             strokeColor: '#000',
             strokeWeight: 3,
           },
           suppressMarkers: true,
         }}
       />

     </>
   </GoogleMap>
 ) 

}
