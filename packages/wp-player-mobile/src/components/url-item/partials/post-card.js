import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'

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
    this.state = { isTransformed: false }
    this.onPressTransform = this::this.onPressTransform
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

  onPressTransform = async () => {
    this.setState({ isTransformed: true })
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { isTransformed } = this.state
    const { title, content: { text } } = this.props
    const excerpt = text.slice(0, 100) + '...'
    return (
      <View>
        <Text style={ { fontWeight: 'bold', marginTop: 3, marginBottom: 5 } }>
          {title}
        </Text>
        <Text>{excerpt}</Text>
        <View style={ { marginTop: 10 } }>
          {isTransformed ? (
            <Button
              key={ 'mp3-play-button' }
              onPress={ this.onPressPlay }
              color={ 'red' }
              title={ 'MP3再生' }
            />
          ) : (
            <Button onPress={ this.onPressTransform } title={ '変換' } />
          )}
        </View>
      </View>
    )
  }
}
