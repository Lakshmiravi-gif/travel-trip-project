import {Component} from 'react'
import {BiShow, BiHide} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    isError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onTogglePassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isError: true, errorMsg: fetchedData.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, isShowPassword, isError, errorMsg} = this.state

    return (
      <div className="login-container">
        <div className="login-form">
          <h1 className="travel-trip-text">Travel Trip</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="login-card">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="user-input"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="login-card">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="user-input">
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  id="password"
                  className="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
                <button
                  type="button"
                  data-testid="show-password"
                  className="password-button"
                  onClick={this.onTogglePassword}
                >
                  {isShowPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                </button>
              </div>
            </div>
            {isError && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
