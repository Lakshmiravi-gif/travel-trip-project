import {Component} from 'react'
import {MdErrorOutline} from 'react-icons/md'
import {v4 as uuidv4} from 'uuid'

import Header from '../Header'

import TripContext from '../../context/TripContext'

import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

class BookANewTrip extends Component {
  state = {
    activeStep: stepsList[0].stepId,
    stepOneStatus: 'PENDING',
    stepTwoStatus: 'PENDING',
    stepThreeStatus: 'PENDING',
    stepFourStatus: 'PENDING',
    stepFiveStatus: 'PENDING',
    name: '',
    isNameEmpty: false,
    startLocation: '',
    isStartLocationEmpty: false,
    endLocation: '',
    isEndLocationEmpty: false,
    startDate: '',
    isStartDateEmpty: false,
    endDate: '',
    isEndDateEmpty: false,
    isDateGap: false,
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    travelAssistance: '',
    isTravelAssistanceChecked: false,
    isTripConfirmed: false,
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeStartLocation = event => {
    this.setState({startLocation: event.target.value})
  }

  onChangeEndLocation = event => {
    this.setState({endLocation: event.target.value})
  }

  onSubmitTripForm = event => {
    event.preventDefault()

    const {name, startLocation, endLocation} = this.state

    if (name !== '' && startLocation !== '' && endLocation !== '') {
      this.setState({
        stepOneStatus: 'COMPLETED',
        activeStep: stepsList[1].stepId,
        isNameEmpty: false,
        isStartLocationEmpty: false,
        isEndLocationEmpty: false,
      })
    } else {
      this.setState({stepOneStatus: 'PENDING'})

      if (name === '') {
        this.setState({isNameEmpty: true})
      } else {
        this.setState({isNameEmpty: false})
      }
      if (startLocation === '') {
        this.setState({isStartLocationEmpty: true})
      } else {
        this.setState({isStartLocationEmpty: false})
      }
      if (endLocation === '') {
        this.setState({isEndLocationEmpty: true})
      } else {
        this.setState({isEndLocationEmpty: false})
      }
    }
  }

  renderDetailsView = () => {
    const {
      name,
      startLocation,
      endLocation,
      isNameEmpty,
      isStartLocationEmpty,
      isEndLocationEmpty,
    } = this.state

    const nameCard = isNameEmpty ? 'user-input empty-card' : 'user-input'

    const startLocationCard = isStartLocationEmpty
      ? 'user-input empty-card'
      : 'user-input'

    const endLocationCard = isEndLocationEmpty
      ? 'user-input empty-card'
      : 'user-input'

    return (
      <div className="details-container">
        <h1 className="details-heading">Your Details</h1>
        <p className="details-description">
          Enter your name and location details
        </p>
        <form className="form-details" onSubmit={this.onSubmitTripForm}>
          <div className="details-card">
            <label htmlFor="name" className="label">
              Name
            </label>
            <div className="user-card">
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                className={`${nameCard}`}
                onChange={this.onChangeName}
              />
              {isNameEmpty && <MdErrorOutline size="20" color="red" />}
            </div>
            {isNameEmpty && <p className="error-message">Enter your name</p>}
          </div>

          <div className="details-card">
            <label htmlFor="startLocation" className="label">
              Start location
            </label>
            <div className="user-card">
              <input
                type="text"
                id="startLocation"
                placeholder="Enter start location"
                value={startLocation}
                className={`${startLocationCard}`}
                onChange={this.onChangeStartLocation}
              />
              {isStartLocationEmpty && <MdErrorOutline size="20" color="red" />}
            </div>
            {isEndLocationEmpty && (
              <p className="error-message">Enter your start location</p>
            )}
          </div>

          <div className="details-card">
            <label htmlFor="endLocation" className="label">
              End location
            </label>
            <div className="user-card">
              <input
                type="text"
                id="endLocation"
                placeholder="Enter end location"
                value={endLocation}
                className={`${endLocationCard}`}
                onChange={this.onChangeEndLocation}
              />
              {isEndLocationEmpty && <MdErrorOutline size="20" color="red" />}
            </div>
            {isEndLocationEmpty && (
              <p className="error-message">Enter your end location</p>
            )}
          </div>

          <div className="button-container">
            <button type="submit" className="next-btn">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  onChangeStartDate = event => {
    this.setState({startDate: event.target.value})
  }

  onChangeEndDate = event => {
    this.setState({endDate: event.target.value})
  }

  onSubmitDateForm = event => {
    event.preventDefault()

    const {startDate, endDate} = this.state

    if (startDate !== '' && endDate !== '') {
      if (endDate < startDate) {
        this.setState({
          isDateGap: true,
          isEndDateEmpty: false,
          isStartDateEmpty: false,
          stepTwoStatus: 'PENDING',
        })
      } else {
        this.setState({
          activeStep: stepsList[2].stepId,
          isDateGap: false,
          isEndDateEmpty: false,
          isStartDateEmpty: false,
          stepTwoStatus: 'COMPLETED',
        })
      }
    } else {
      this.setState({stepTwoStatus: 'PENDING'})

      if (startDate === '') {
        this.setState({isStartDateEmpty: true})
      } else {
        this.setState({isStartDateEmpty: false})
      }
      if (endDate === '') {
        this.setState({isEndDateEmpty: true})
      } else {
        this.setState({isEndDateEmpty: false})
      }
    }
  }

  onGoDetailsForm = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneStatus: 'PENDING',
    })
  }

  renderDateDetailsView = () => {
    const {startDate, endDate, isStartDateEmpty, isEndDateEmpty, isDateGap} =
      this.state

    const startDateCard = isStartDateEmpty
      ? 'user-input empty-card'
      : 'user-input'

    const endDateCard = isEndDateEmpty ? 'user-input empty-card' : 'user-input'

    return (
      <div className="details-container">
        <h1 className="details-heading">Date Selection</h1>
        <p className="details-description">Select your Start and End Date.</p>
        <form className="form-details" onSubmit={this.onSubmitDateForm}>
          <div className="details-card">
            <label htmlFor="startDate" className="label">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              className={`${startDateCard}`}
              onChange={this.onChangeStartDate}
            />
            {isStartDateEmpty && (
              <p className="error-message">Select start date</p>
            )}
          </div>

          <div className="details-card">
            <label htmlFor="endDate" className="label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              className={`${endDateCard}`}
              onChange={this.onChangeEndDate}
            />
            {isEndDateEmpty && <p className="error-message">Select end date</p>}
            {isDateGap && (
              <p className="error-message">
                The end date cannot be less than the start date
              </p>
            )}
          </div>
          <div className="button=container">
            <button
              type="button"
              className="previous-btn"
              onClick={this.onGoDetailsForm}
            >
              Previous
            </button>
            <button type="submit" className="next-btn">
              Next
            </button>
          </div>
        </form>
      </div>
    )
  }

  onDecrementAdultCount = () => {
    const {adultCount} = this.state
    if (adultCount > 1) {
      this.setState(prevState => ({adultCount: prevState.adultCount - 1}))
    }
  }

  onIncrementAdultCount = () => {
    this.setState(prevState => ({adultCount: prevState.adultCount + 1}))
  }

  onDecrementChildCount = () => {
    const {childCount} = this.state
    if (childCount > 0) {
      this.setState(prevState => ({childCount: prevState.childCount - 1}))
    }
  }

  onIncrementChildCount = () => {
    this.setState(prevState => ({childCount: prevState.childCount + 1}))
  }

  onDecrementInfantsCount = () => {
    const {infantCount} = this.state
    if (infantCount > 0) {
      this.setState(prevState => ({infantCount: prevState.infantCount - 1}))
    }
  }

  onIncrementInfantsCount = () => {
    this.setState(prevState => ({infantCount: prevState.infantCount + 1}))
  }

  onGoDateForm = () => {
    this.setState({
      activeStep: stepsList[1].stepId,
      stepTwoStatus: 'PENDING',
    })
  }

  onGoTravelAssistanceForm = () => {
    this.setState({
      activeStep: stepsList[3].stepId,
      stepThreeStatus: 'COMPLETED',
    })
  }

  renderGuestView = () => {
    const {adultCount, childCount, infantCount} = this.state
    return (
      <div className="details-container">
        <h1 className="details-heading">Guests</h1>
        <p className="details-description">Select your Guests</p>
        <div className="card-details">
          <ul className="details-list">
            <li>
              <p className="label">Adults</p>
              <div className="guest-details">
                <p className="guest-age">Age 13 or Above</p>
                <div className="guests-button-container">
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onDecrementAdultCount}
                  >
                    -
                  </button>
                  <p className="guests-count">{adultCount}</p>
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onIncrementAdultCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <hr className="line" />
            </li>
            <li>
              <p className="label">Children</p>
              <div className="guest-details">
                <p className="guest-age">Age 2-12</p>
                <div className="guests-button-container">
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onDecrementChildCount}
                  >
                    -
                  </button>
                  <p className="guests-count">{childCount}</p>
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onIncrementChildCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <hr className="line" />
            </li>
            <li>
              <p className="label">Infants</p>
              <div className="guest-details">
                <p className="guest-age">Under 2</p>

                <div className="guests-button-container">
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onDecrementInfantsCount}
                  >
                    -
                  </button>
                  <p className="guests-count">{infantCount}</p>
                  <button
                    type="button"
                    className="guests-btn"
                    onClick={this.onIncrementInfantsCount}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <div className="button-container">
            <button
              type="button"
              className="previous-btn"
              onClick={this.onGoDateForm}
            >
              Previous
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={this.onGoTravelAssistanceForm}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  onToggleTravelAssistance = () => {
    const {isTravelAssistanceChecked} = this.state
    if (isTravelAssistanceChecked) {
      this.setState({travelAssistanceList: ''})
    } else {
      this.setState({travelAssistance: travelAssistanceList[0].value})
    }

    this.setState(prevState => ({
      isTravelAssistanceChecked: !prevState.isTravelAssistanceChecked,
    }))
  }

  onChangeTravelAssistance = event => {
    this.setState({travelAssistance: event.target.value})
  }

  onGoGuestsForm = () => {
    this.setState({
      activeStep: stepsList[2].stepId,
      stepThreeStatus: 'PENDING',
    })
  }

  onGoConfirmationForm = () => {
    this.setState({
      activeStep: stepsList[4].stepId,
      stepFourStatus: 'COMPLETED',
    })
  }

  renderTravelAssistanceView = () => {
    const {isTravelAssistanceChecked, travelAssistance} = this.state
    return (
      <div className="details-container">
        <h1 className="details-heading">Travel Assistance</h1>
        <p className="details-description">Select your travel assistance.</p>
        <div className="card-details">
          <div className="travel-assistance-card">
            <input
              type="checkbox"
              id="travelAssistanceCheckbox"
              className="travel-checkbox"
              onChange={this.onToggleTravelAssistance}
            />
            <label htmlFor="travelAssistanceCheckbox" className="label-card">
              Travel Assistance Needed
            </label>
          </div>
          {isTravelAssistanceChecked && (
            <div className="travel-selection-card">
              <label
                htmlFor="travelAssistanceSelect"
                className="travel-selection-label"
              >
                Travel Assistance
              </label>
              <select
                id="travelAssistanceSelect"
                value={travelAssistance}
                className="travel-assistance-select"
                onChange={this.onChangeTravelAssistance}
              >
                {travelAssistanceList.map(eachTravelAssistance => (
                  <option
                    key={eachTravelAssistance.value}
                    value={eachTravelAssistance.value}
                  >
                    {eachTravelAssistance.displayText}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="button-container">
            <button
              type="button"
              className="previous-btn"
              onClick={this.onGoGuestsForm}
            >
              Previous
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={this.onGoConfirmationForm}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  onCancelTrip = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneStatus: 'PENDING',
      stepTwoStatus: 'PENDING',
      stepThreeStatus: 'PENDING',
      stepFourStatus: 'PENDING',
      stepFiveStatus: 'PENDING',
      name: '',
      isNameEmpty: false,
      startLocation: '',
      isStartLocationEmpty: false,
      endLocation: '',
      isEndLocationEmpty: false,
      startDate: '',
      isStartDateEmpty: false,
      endDate: '',
      isEndDateEmpty: false,
      isDateGap: false,
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      travelAssistance: '',
      isTravelAssistanceChecked: false,
    })
  }

  renderConfirmationView = () => {
    const {
      name,
      startLocation,
      endLocation,
      startDate,
      endDate,
      adultCount,
      childCount,
      infantCount,
      travelAssistance,
    } = this.state

    const guests = adultCount + childCount + infantCount

    const travelAssistanceItem = travelAssistanceList.find(
      eachTravelAssistance => eachTravelAssistance.value === travelAssistance,
    )

    let travelAssistanceDisplayText = '-'
    if (travelAssistanceItem !== undefined) {
      travelAssistanceDisplayText = travelAssistanceItem.displayText
    }

    return (
      <TripContext.Consumer>
        {value => {
          const {addTrip} = value

          const onConfirmTrip = () => {
            addTrip({id: uuidv4(), endLocation, startDate, endDate})

            this.setState({
              isTripConfirmed: true,
              activeStep: null,
              stepFiveStatus: 'COMPLETED',
            })
          }

          return (
            <div className="details-container">
              <h1 className="details-heading">Confirmation</h1>
              <p className="details-description">Confirm Your details</p>
              <div className="card-details">
                <ul className="details-list">
                  <li className="confirmation-item">
                    <p className="label-card">Name:</p>
                    <p className="confirmation-value">{name}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">Start Location:</p>
                    <p className="confirmation-value">{startLocation}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">End Location:</p>
                    <p className="confirmation-value">{endLocation}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">Start Date:</p>
                    <p className="confirmation-value">{startDate}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">End Date:</p>
                    <p className="confirmation-value">{endDate}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">Guests:</p>
                    <p className="confirmation-value">{guests}</p>
                  </li>
                  <li className="confirmation-item">
                    <p className="label-card">Travel Assistance:</p>
                    <p className="confirmation-value">
                      {travelAssistanceDisplayText}
                    </p>
                  </li>
                </ul>
                <div className="button-container">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={this.onCancelTrip}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="confirm-button"
                    onClick={onConfirmTrip}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        }}
      </TripContext.Consumer>
    )
  }

  renderSteps = () => {
    const {activeStep} = this.state

    switch (activeStep) {
      case stepsList[0].stepId:
        return this.renderDetailsView()
      case stepsList[1].stepId:
        return this.renderDateDetailsView()
      case stepsList[2].stepId:
        return this.renderGuestView()
      case stepsList[3].stepId:
        return this.renderTravelAssistanceView()
      case stepsList[4].stepId:
        return this.renderConfirmationView()
      default:
        return null
    }
  }

  onBookNewTrip = () => {
    this.setState({
      activeStep: stepsList[0].stepId,
      stepOneStatus: 'PENDING',
      stepTwoStatus: 'PENDING',
      stepThreeStatus: 'PENDING',
      stepFourStatus: 'PENDING',
      stepFiveStatus: 'PENDING',
      name: '',
      isNameEmpty: false,
      startLocation: '',
      isStartLocationEmpty: false,
      endLocation: '',
      isEndLocationEmpty: false,
      startDate: '',
      isStartDateEmpty: false,
      endDate: '',
      isEndDateEmpty: false,
      isDateGap: false,
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      travelAssistance: '',
      isTravelAssistanceChecked: false,
      isTripConfirmed: false,
    })
  }

  renderConfirmationCard = () => (
    <div className="details-container">
      <div className="confirm-msg-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
          alt="success"
          className="confirm-img"
        />
        <h1 className="confirm-heading">Awesome</h1>
        <p className="confirm-description">Your booking has been confirmed.</p>
        <button
          type="button"
          className="confirm-button"
          onClick={this.onBookNewTrip}
        >
          Book a New Trip
        </button>
      </div>
    </div>
  )

  render() {
    const {
      activeStep,
      stepOneStatus,
      stepTwoStatus,
      stepThreeStatus,
      stepFourStatus,
      stepFiveStatus,
      isTripConfirmed,
    } = this.state

    let stepNumber = 0

    const stepsListCompletionStatus = [
      {
        stepId: 'YOUR_DETAILS',
        displayText: 'Your Details',
        completionStatus: stepOneStatus,
      },
      {
        stepId: 'DATE_SELECTION',
        displayText: 'Date Selection',
        completionStatus: stepTwoStatus,
      },
      {
        stepId: 'GUESTS',
        displayText: 'Guests',
        completionStatus: stepThreeStatus,
      },
      {
        stepId: 'TRAVEL_ASSISTANCE',
        displayText: 'Travel Assistance',
        completionStatus: stepFourStatus,
      },
      {
        stepId: 'CONFIRMATION',
        displayText: 'Confirmation',
        completionStatus: stepFiveStatus,
      },
    ]

    return (
      <>
        <Header />
        <div className="travel-Trip-container">
          <div className="new-trip-container">
            <div className="left-container">
              <ul className="details-list">
                {stepsListCompletionStatus.map(eachStep => {
                  stepNumber += 1
                  const stepNumberActive =
                    eachStep.stepId === activeStep
                      ? 'step-number step-number-active'
                      : 'step-number'
                  const stepNameActive =
                    eachStep.stepId === activeStep
                      ? 'step-name active'
                      : 'step-name'

                  return (
                    <li key={eachStep.stepId} className="step-item">
                      {eachStep.completionStatus === 'COMPLETED' ? (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                          alt={eachStep.displayText}
                          className="step-img"
                        />
                      ) : (
                        <p className={`${stepNumberActive}`}>{stepNumber}</p>
                      )}
                      <p className={`${stepNameActive}`}>
                        {eachStep.displayText}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="right-container">
              {isTripConfirmed
                ? this.renderConfirmationCard()
                : this.renderSteps()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookANewTrip
