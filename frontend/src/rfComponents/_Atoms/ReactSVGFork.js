import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'

// See: https://github.com/webpack/react-starter/issues/37
const isBrowser = typeof window !== 'undefined'
const SVGInjector = isBrowser ? require('svg-injector-2') : undefined

export default class ReactSVG extends Component {

  static defaultProps = {
    callback: () => {},
    className: '',
    evalScripts: 'once',
    style: {}
  }

  static propTypes = {
    callback: PropTypes.func,
    className: PropTypes.string,
    evalScripts: PropTypes.oneOf([ 'always', 'once', 'never' ]),
    path: PropTypes.string.isRequired,
    style: PropTypes.object
  }

  refCallback = (container) => {
    if (!container) {
      this.removeSVG()
      return
    }

    this.container = container
    this.renderSVG()
  }

  onClick = () => {
    console.log('on click')
  }

  onClick1 = () => {
    console.log('on click 1')
  }

  onClick2 = () => {
    console.log('on click 2')
  }  

  renderSVG(props = this.props) {
    console.log('rendering svg')
    const {
      callback: each,
      className,
      evalScripts,
      path,
      style
    } = props


    const div = document.createElement('div')
    div.innerHTML = ReactDOMServer.renderToStaticMarkup(
      <div onClick={this.onClick1}>
        <div
          className={className}
          data-src={path}
          style={style}
          onClick={this.onClick2}
        />
      </div>
    )

    const wrapper = this.container.appendChild(div.firstChild)

    SVGInjector(wrapper.firstChild, {
      evalScripts,
      each
    })

    console.log(wrapper)
  }

  removeSVG() {
    this.container.removeChild(this.container.firstChild)
  }

  componentWillReceiveProps(nextProps) {
    this.removeSVG()
    this.renderSVG(nextProps)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div className="TEST" onClick={this.onClick} ref={this.refCallback} />
  }

}