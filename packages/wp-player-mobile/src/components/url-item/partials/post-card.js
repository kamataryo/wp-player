import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'
// import Sound from 'react-native-sound'

const URL_BASE = 'http://localhost:3000'

export default class PostCard extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    // ownProps
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = { isStartPlaying: false }
    this.onPressPlay = this::this.onPressPlay
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  onPressPlay = async () => {
    const { content: { text } } = this.props
    this.setState({ isStartPlaying: true })
    // const track = new Sound(`${URL_BASE}/mp3?text=${text}`, null, error => {
    //   if (error) {
    //     console.log('error loading track:', e)
    //   } else {
    //     track.play()
    //   }
    // })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { isStartPlaying } = this.state
    const { title, content: { text } } = this.props
    const excerpt = text.slice(0, 100) + '...'

    return (
      <View>
        <Text style={ { fontWeight: 'bold', marginTop: 3, marginBottom: 5 } }>
          {title}
        </Text>
        <Text>{excerpt}</Text>
        <View style={ { marginTop: 10 } }>
          {isStartPlaying ? (
            <Text>{'playing'}</Text>
          ) : (
            <Button
              key={ 'mp3-play-button' }
              onPress={ this.onPressPlay }
              color={ 'red' }
              title={ 'MP3再生' }
            />
          )}
        </View>
      </View>
    )
  }
}
