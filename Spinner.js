import React from "react";
import { Animated } from "react-native";
import PropTypes from "prop-types";


class Spinner extends React.Component {
    static propTypes = {
        size: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {
            spinValue: new Animated.Value(0),
        };
        this.animation = null;
    }

    componentDidMount = () => {
        this.animate();
    };

    componentWillUnmount = () => {
        this.animation.stop();
    };

    repeat = () => {
        this.setState({ spinValue: new Animated.Value(0) }, this.animate);
    };

    animate = () => {
        const { spinValue } = this.state;
        this.animation = Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        });
        this.animation.start(this.repeat);
    };

    render() {
        const { size, children } = this.props;
        const { spinValue } = this.state;

        // Second interpolate beginning and end values (in this case 0 and 1)
        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });

        const style = [
            { transform: [{ rotate: spin }], width: size, height: size },
        ];
        return (
            <Animated.View style={style}>
                {children}
            </Animated.View>
        );
    }
}

export default Spinner;
