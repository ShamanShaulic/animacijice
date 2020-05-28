import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

class Counter extends React.Component {
    static propTypes = {
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        speed: PropTypes.number,
    };

    static countInterval;

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            counter: 0,
        };
    }

    componentDidMount() {
            this.countUp();
    }

    countUp = () => {
        const { number, speed } = this.props;
        const increment = Number(number) / speed;
        const self = this;

        self.countInterval = setInterval(() => {
            const { value, counter } = self.state;
            if (Number(value) < Number(number)) {
                self.setState({
                    counter: counter + increment,
                });
                self.setState({
                    value: counter,
                });
            } else {
                self.setState({
                    value: number,
                });
                clearInterval(self.countInterval);
            }
        }, 50);
    };

    render() {
        const { value } = this.state;

            return (
                  <Text>{value}</Text>
            );
    }
}

export default Counter;
