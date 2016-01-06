import React                from 'react'
import { TransitionMotion } from 'react-motion'
import { spring }           from 'react-motion'
import { presets }          from 'react-motion'
import Style                from '@asbjornenge/react-style'
import flyoutStyle          from './index.styl'

export default class FlyoutSidebar extends React.Component {
    render() {
        let sidebar = this.props.animate ? 
            <FlyoutSidebarAnimated {...this.props} /> :
            <FlyoutSidebarBasic {...this.props} />
        return (
            <div className="FlyoutSidebar">
                <Style style={flyoutStyle} />
                {sidebar} 
            </div>
        )
    }
}

class FlyoutSidebarBasic extends React.Component {
    render() {
        if (!this.props.show) return <div></div>
        return (
            <div className="innerBasic">
                <div className="shader"></div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class FlyoutSidebarAnimated extends React.Component {
    render() {
        return (
            <TransitionMotion 
                styles={this.getStyles()}
                willEnter={this.getWillEnter.bind(this)}
                willLeave={this.getWillLeave.bind(this)}>
                { interpolatedStyles => {
                    return (
                        <div>
                            {(interpolatedStyles.content && interpolatedStyles.shader) ? this.getSidebar(interpolatedStyles) : undefined }
                        </div>
                    )
                }}
            </TransitionMotion>
        )
    }
    getSidebar(interpolatedStyles) {
        let shaderStyle = {
            left : interpolatedStyles.shader.left+'px'
        }
        let contentStyle = {
            right : interpolatedStyles.content.right+'px'
        }
        return (
            <div className="innerAnimated">
                <div className="shader" style={shaderStyle}></div>
                <div className="content" style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
    getStyles() {
        if (!this.props.show) return {}
        let width = 250
        return {
            shader : {
                left : spring(width)
            },
            content : {
                right : spring(this.fullwidth - width)
            }
        }
    }
    getWillEnter(key) {
        if (key == 'shader') return {
            left : spring(this.fullwidth)
        }
        if (key == 'content') return {
            right : spring(this.fullwidth)
        }
    }
    getWillLeave(key, style) {
        if (key == 'shader') return {
            left : spring(this.fullwidth)
        }
        if (key == 'content') return {
            right : spring(this.fullwidth)
        }
    }
    handleResize() {
        this.fullwidth = document.documentElement.clientWidth
    }
    componentDidMount() {
        this.handleResize()
        if(window.addEventListener) {
            window.addEventListener('resize', this.handleResize.bind(this), true);
        }
    }
    componentWillUnmount() {
        if(window.removeEventListener) {
            window.removeEventListener('resize', this.handleResize);
        }
    }
}
