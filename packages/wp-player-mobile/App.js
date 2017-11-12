import React from 'react'
import { Provider } from 'react-redux'
import rootStore from './src/store'
import { StyleSheet, View } from 'react-native'
import URLList from './src/components/url-list'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class App extends React.Component {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void
   */
  constructor(props) {
    super(props)
    this.state = { name: '' }
  }
  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProp, nextState) {
    return this.state.name !== nextState.name
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { name } = this.state

    return (
      <Provider store={ rootStore }>
        <View style={ styles.container }>
          <URLList />
        </View>
      </Provider>
    )
  }
}
