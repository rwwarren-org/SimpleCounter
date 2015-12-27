'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} = React;

var SimpleCounter = React.createClass({
  componentDidMount: function() {
    AsyncStorage.getItem("count").then((value) => {
      if(value === null) {
        value = 0;
      }
      console.log(Number.parseInt(value));
      this.setState({count: parseInt(value)});
    }).done();
  },
  getInitialState: function() {
    return {
      count: 0,
    };
  },
  _onAdd: function(){
    this.setState({
      count: this.state.count + 1,
    });
    this.saveData();
  },
  _onSubtract: function(){
    if(this.state.count > 0){
      this.saveData();
      this.setState({
        count: this.state.count - 1,
      });
      this.saveData();
    }
  },
  _onReset: function(){
    this.setState({
      count: 0,
    });
    this.saveData();
  },
  saveData: function() {
    console.log("saving: " + this.state.count);
    AsyncStorage.setItem("count", "" + this.state.count);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>
          {this.state.count}
        </Text>
        <TouchableHighlight onPress={this._onSubtract} style={styles.roundbuttoncircle}>
          <Text style={styles.middleText}>
            -
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onAdd} style={styles.roundbuttoncircle}>
          <Text style={styles.middleText}>
            +
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onReset} style={styles.roundbuttoncircle}>
          <Text style={styles.middleText}>
            Reset
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  count: {
    fontSize: 100,
  },
  roundbuttoncircle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: '#4679BD',
        justifyContent: 'center',
        borderColor: '#cfdcec',
        borderWidth: 10,
  },
  middleText: {
    fontSize: 50,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

AppRegistry.registerComponent('Simple Counter', () => SimpleCounter);
