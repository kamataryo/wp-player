import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator, ScrollView } from 'react-native'
import { url2api } from '../../lib/convert'
import PostCard from './partials/post-card'

export default class URLItem extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    url: PropTypes.string.isRequired,
  }

  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    const { url } = this.props
    this.state = { jsonEndpoint: url2api(url), data: false, error: false }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  async componentWillMount() {
    const { jsonEndpoint } = this.state
    const responseJson = await fetch(jsonEndpoint)
      .then(response => response.json())
      .catch(error => this.setState({ ...this.state, error }))

    const data = {
      ...responseJson[0],
      content: {
        ...responseJson[0].content,
        text: responseJson[0].content.rendered
          .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
          .replace(/\n/g, ''),
      },
    }

    this.setState({ ...this.state, data })
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

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { url } = this.props
    const { data, error } = this.state
    const isTrying = !data && !error

    return (
      <ScrollView
        style={ {
          color: 'black',
          padding: 10,
          borderWidth: 0.5,
          borderColor: '#d6d7da',
          borderRadius: 4,
          marginVertical: 5,
        } }
      >
        {isTrying ? (
          <View>
            <Text style={ { color: 'gray' } }>{url}</Text>
            <ActivityIndicator animating />
          </View>
        ) : (
          <View>
            <PostCard
              title={ data.title.rendered }
              content={ data.content }
              url={ url }
            />
          </View>
        )}
      </ScrollView>
    )
  }
}
