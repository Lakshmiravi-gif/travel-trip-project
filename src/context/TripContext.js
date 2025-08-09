import React from 'react'

const TripContext = React.createContext({
  tripsList: [],
  addTrip: () => {},
  removeTrip: () => {},
})

export default TripContext
