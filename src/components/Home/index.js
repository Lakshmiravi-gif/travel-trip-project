import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <div className="home-card">
        <h1 className="heading">Travel. Relax. Memories.</h1>
        <p className="description">
          With travel trip you can experience new travel and the best tourist
          destinations.
        </p>
        <div className="book-trip-card">
          <Link to="/book-a-new-trip">
            <button type="button" className="book-trip-button">
              Book a new trip
            </button>
          </Link>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/demtdcewz/image/upload/v1754756373/image_5_gam9sg.svg"
        alt="home"
        className="home-img"
      />
    </div>
  </div>
)

export default Home
