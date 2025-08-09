import TripContext from '../../context/TripContext'
import './index.css'

const TripCard = props => {
  const {tripDetails} = props
  const {id, endLocation, startDate, endDate} = tripDetails

  return (
    <TripContext.Consumer>
      {value => {
        const {removeTrip} = value

        const onRemoveTrip = () => {
          removeTrip(id)
        }

        return (
          <>
            <li className="trip-card-item">
              <h1 className="trip-location">{endLocation}</h1>
              <div className="trip-date-card">
                <p className="trip-date">Date</p>
                <p className="trip-duartion">
                  {startDate} to {endDate}
                </p>
              </div>
              <button
                type="button"
                className="cancel-button"
                onClick={onRemoveTrip}
              >
                Cancel
              </button>
            </li>
          </>
        )
      }}
    </TripContext.Consumer>
  )
}

export default TripCard
