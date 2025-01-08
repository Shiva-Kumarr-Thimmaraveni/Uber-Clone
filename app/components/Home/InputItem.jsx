"use client"
import { DestinationContext } from '@/app/context/DestinationContext'
import { SourceContext } from '@/app/context/SourceContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

export default function InputItem({type}) {
     const [value, setValue] = useState(null)
     const [placeholder, setPlaceHolder] = useState('')
     const {source, setSource} =  useContext(SourceContext)
     const {destination, setDestination} = useContext(DestinationContext)

     useEffect(() => {
       type == 'fromAddress' 
       ? setPlaceHolder("Pickup Location")
       : setPlaceHolder("Dropoff Location")
     }, [])

     const getLatAndLng = (place, type) => {
       const placeId = place.value.place_id
       const service = new google.maps.places.PlacesService(
         document.createElement('div')
       )
       service.getDetails({ placeId }, (place, status) => {
         if (status === 'OK' && place.geometry && place.geometry.location) {
           if (type == 'fromAddress') {
             setSource({
               lat: place.geometry.location.lat(),
               lng: place.geometry.location.lng(),
               name: place.formatted_address,
               label: place.name,
             })
           } else {
             
             setDestination({
               lat: place.geometry.location.lat(),
               lng: place.geometry.location.lng(),
               name: place.formatted_address,
               label: place.name,
             })
           }
         }
       })
     }

    
   
  return (
    <>
      <div className="bg-gray-100 pr-3 pl-1 pt-3 pb-3 rounded-2xl flex justify-center items-center gap-2 w-[380px]">
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            onChange: (place) => {
              getLatAndLng(place, type)
              setValue(place)
            },
            placeholder: placeholder,
            isClearable: true,
            className: 'w-full',
            components: {
              DropdownIndicator: false,
            },
            styles: {
              control: (provided) => ({
                ...provided,
                backgroundColor: '#00ffff00',
                border: 'none',
              }),
            },
          }}
        />
      </div>
    </>
  )
}
