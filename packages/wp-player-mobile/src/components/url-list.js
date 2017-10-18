import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import URLItem from './url-item'
import { FlatList } from 'react-native'

const mapStateToProps = state => {
  return {
    bookMarks: state.bookMarks.data,
  }
}

@connect(mapStateToProps)
export default class URLList extends React.Component {
  /**
   * propTypes
   * @type {object}
   */
  static propTypes = {
    bookMarks: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  /**
   * shouldComponentUpdate
   * @param  {object} nextProps next props
   * @param  {object} nextState next state
   * @return {boolean}          should component update
   */
  shouldComponentUpdate(nextProps) {
    return true
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { bookMarks } = this.props

    return (
      <FlatList
        style={ { padding: 20 } }
        data={ bookMarks.map((url, index) => ({
          key: `url-item-${index + 1}`,
          url,
        })) }
        renderItem={ ({ item }) => <URLItem url={ item.url } /> }
      />
    )
  }
}
