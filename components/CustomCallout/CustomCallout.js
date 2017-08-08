import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const {width, height} = Dimensions.get("window")

export default class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
        {/*<View style={styles.arrowBorder} />
        <View style={styles.arrow} />*/}
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ecf0f1'
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#e74c3c',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#e74c3c',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});
