import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './carousel.css'

class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slideIndicies: [...Array(Math.min(props.data.length, 3))].map((v, i) => v = i)
        }

        this.clickPrev = this.clickPrev.bind(this)
        this.clickNext = this.clickNext.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.slideIndicies.length < 3) {
            this.setState({ slideIndicies: [...Array(Math.min(props.data.length, 3))].map((v, i) => v = i) })
        }
    }

    clickPrev() {
        let indicies = this.state.slideIndicies.slice()
        indicies.pop()
        let prevIdx = indicies[0] - 1
        prevIdx = prevIdx < 0 ? this.props.data.length - 1 : prevIdx
        indicies.unshift(prevIdx)

        this.setState({ slideIndicies: indicies })
    }

    clickNext() {
        let indicies = this.state.slideIndicies.slice()
        indicies.shift()
        let nextIdx = indicies[indicies.length - 1] + 1
        nextIdx = nextIdx === this.props.data.length ? 0 : nextIdx
        indicies.push(nextIdx)

        this.setState({ slideIndicies: indicies })
    }

    render() {
        return (
            <div className={ styles.carousel }>
                <div className={ styles.carouselControl } onClick={ this.clickPrev }>
                    <i className="fa fa-2x fa-chevron-left"></i>
                </div>
                <div className={ styles.carouselContent }>
                    { this.state.slideIndicies.map(idx => this.props.renderSlide(this.props.data[idx])) }
                </div>
                <div className={ styles.carouselControl } onClick={ this.clickNext }>
                    <i className="fa fa-2x fa-chevron-right"></i>
                </div>
            </div>
        )
    }
}

Carousel.propTpes = {
    data: PropTypes.object.isRequired,
    renderSlide: PropTypes.func.isRequired
}

export default Carousel