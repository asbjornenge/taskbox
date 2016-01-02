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
            right : interpolatedStyles.shader.right+'px'
        }
        let contentStyle = {
            left : interpolatedStyles.content.left+'px'
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
        let right = 300
        let left  = this.fullwidth - 300
        return {
            shader : {
                right : spring(right)
            },
            content : {
                left : spring(left)
            }
        }
    }
    getWillEnter(key) {
        if (key == 'shader') return {
            right : spring(this.fullwidth)
        }
        if (key == 'content') return {
            left : spring(this.fullwidth)
        }
    }
    getWillLeave(key, style) {
        if (key == 'shader') return {
            right : spring(this.fullwidth)
        }
        if (key == 'content') return {
            left : spring(this.fullwidth)
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
