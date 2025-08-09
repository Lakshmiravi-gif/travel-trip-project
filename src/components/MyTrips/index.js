import {Link} from 'react-router-dom'

import Header from '../Header'
import TripCard from '../TripCard'

import TripContext from '../../context/TripContext'

import './index.css'

const MyTrips = () => (
  <TripContext.Consumer>
    {value => {
      const {tripsList} = value

      return (
        <>
          <Header />
          {tripsList.length === 0 ? (
            <div className="my-trips-container">
              <img
                src="https://res.cloudinary.com/demtdcewz/image/upload/v1754757688/Vector_uhckky.png"
                alt="no trips"
                className="no-trips-img"
              />
              <h1 className="no-trips-heading">No upcoming trips.</h1>
              <p className="no-trips-description">
                When you book a trip, you will see your trip details here.
              </p>
              <Link to="/book-a-new-trip">
                <button type="button" className="book-trip-button">
                  Book a new trip
                </button>
              </Link>
            </div>
          ) : (
            <div className="trips-container">
              <h1 className="trips-heading">My trips</h1>
              <ul className="trips-list">
                {tripsList.map(eachTrip => (
                  <TripCard key={eachTrip.id} tripDetails={eachTrip} />
                ))}
              </ul>
            </div>
          )}
        </>
      )
    }}
  </TripContext.Consumer>
)

export default MyTrips
