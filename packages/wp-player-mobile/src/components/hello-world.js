import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

export default class HelloWorld extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    name: PropTypes.string,
  }

  /**
   * defaultProps
   * @type {object}
   */
  static defaultProps = {
    name: '',
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name
  }

  style = {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 20,
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { name } = this.props
    const message = name === '' ? 'Hello, World!' : `Hello, ${name}!`
    return (
      <View style={ this.style }>
        <Text>{message}</Text>
      </View>
    )
  }
}
