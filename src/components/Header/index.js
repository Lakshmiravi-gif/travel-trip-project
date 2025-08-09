import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const {activeNavbar} = props

  const activeNavbarHome =
    activeNavbar === 'HOME' ? 'nav-card active' : 'nav-card'

  const activeNavbarTrips =
    activeNavbar === 'MY_TRIPS' ? 'nav-card active' : 'nav-card'

  return (
    <nav className="nav-container">
      <Link className="link-item" to="/">
        <h1 className="nav-heading">Travel Trip</h1>
      </Link>
      <ul className="nav-item-list">
        <Link className="link-item" to="/">
          <li className={`${activeNavbarHome}`}>Home</li>
        </Link>
        <Link className="link-item" to="/my-trips">
          <li className={`${activeNavbarTrips}`}>My Trips</li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
