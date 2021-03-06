import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser, FaWpbeginner} from  'react-icons/fa'
import Card from './card'
import Loading from './loading'
import Tooltip from './tooltip'
import { ThemeConsumer } from '../contexts/theme'

function ProfileList ({profile}) {
  return (
    <ul className='card-list'> 
      <li>
      <Tooltip text="Username">
          <FaUser color='rgb(239, 115, 115)' size={22}/>
          {profile.name}
      </Tooltip>
      </li>
      {profile.location && (
        <li>
          <Tooltip text="Location">
            <FaCompass color='rgb(144, 115, 255)' size={22}/>
            {profile.location}
          </Tooltip>
        </li>
        )}
        {profile.company && (
          <li>
          <Tooltip text="Employer">
            <FaBriefcase color='#795548' size={22}/>
            {profile.company}
          </Tooltip>
        </li>
        )}
        <li>
        <Tooltip text="Follower Count">
          <FaUsers color='rgb(129, 195, 245)' size={22}/>
          {profile.followers.toLocaleString()} followers
        </Tooltip>
      </li>
      <li>
        <Tooltip text="Friend Count">
          <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
          {profile.following.toLocaleString()} following
        </Tooltip>
      </li>
    </ul>
  )
}

 export default class Results extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null, 
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const { playerOne, playerTwo, onReset } = this.props
    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({message}) => {
        this.setState({
          error: message,
          loading: false
        })
      })
   }

  render() {
    const { winner, loser, error, loading} = this.state
    
    if (loading === true) {
      return <Loading text='Fetching' speed={300} />
    }

    if (error) {
      return (
        <p className='center-text error'>{error}</p>
      )
    }
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className='grid space-around container-sm'>
              <Card
                header={ winner.score === loser.score ? 'Tie' : 'Winner'}
                subheader={`Score: ${winner.score.toLocaleString()}`}
                avatar={winner.profile.avatar_url}
                href={winner.profile.html_url}
                name={winner.profile.login}
              >
              <ProfileList profile={winner.profile} />
              </Card>

              <Card
                header={ winner.score === loser.score ? 'Tie' : 'Loser'}
                subheader={`Score: ${loser.score.toLocaleString()}`}
                avatar={loser.profile.avatar_url}
                href={loser.profile.html_url}
                name={loser.profile.name}
              >
                <ProfileList profile={loser.profile} />
              </Card>     
            </div>
            <button
              className={`btn btn-space ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
              onClick={this.props.onReset}
            >
                Reset
            </button>
          </React.Fragment>
        )}
      </ThemeConsumer>
    )
  }
} 

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}
