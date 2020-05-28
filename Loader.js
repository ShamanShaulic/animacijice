import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";

class Loader extends Component {
    static propTypes = {
        color: PropTypes.string,
        width: PropTypes.number,
        height:PropTypes.number,
        progress: PropTypes.number.isRequired,
    };

    static defaultProps = {
        height: 10,
        width: 50,
        color: "green",
    };

    constructor(props) {
        super(props);

        this.state = {
            animation: new Animated.Value(0)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.progress !== this.props.progress) {
            Animated.timing(this.state.animation, {
                toValue: this.props.progress,
            }).start();
        }
    }

    render() {
        const {
            height,
            color,
            width,
        } = this.props;

        const progress = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
        });

        console.log("trt")

        return (
            <View
                style={{
                    width: `${width}%`,
                    height,
                }}
            >
                <Animated.View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: progress,
                        backgroundColor: color,
                    }}
                />
            </View>
        );
    }
}

export default Loader;
