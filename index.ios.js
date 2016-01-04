'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  PixelRatio,
  Dimensions,
} = React;

var SimpleCounter = React.createClass({
  componentDidMount: function() {
    AsyncStorage.getItem("count").then((value) => {
      if(value === null) {
        value = 0;
      }
      console.log(Number.parseInt(value));
      this.setState({
        count: parseInt(value),
        areYouSure: false,
      });
    }).done();
  },
  getInitialState: function() {
    return {
      count: 0,
      areYouSure: false,
    };
  },
  _onAdd: function(){
    this.setState({
      count: this.state.count + 1,
      areYouSure: false,
    });
    this.saveData();
  },
  _onSubtract: function(){
    if(this.state.count > 0){
      this.saveData();
      this.setState({
        count: this.state.count - 1,
        areYouSure: false,
      });
      this.saveData();
    } else {
      this.setState({
        areYouSure: false,
      });
    }
  },
  _onReset: function() {
    this.setState({
      areYouSure: true,
    });
    this.saveData();
  },
  _onNoReset: function() {
      this.setState({
        areYouSure: false,
      });
  },
  _onYesReset: function() {
      this.setState({
        count: 0,
        areYouSure: false,
      });
      this.saveData();
  },
  saveData: function() {
    console.log("saving: " + this.state.count);
    AsyncStorage.setItem("count", "" + this.state.count);
  },
  _areYouSure: function() {
      return(
        <View style={styles.youSureContainer}>
          <Text style={styles.youSureText}>
            Are you sure?
          </Text>
          <View style={styles.youSureButtons}>
            <TouchableHighlight onPress={this._onNoReset} style={styles.noButton}>
              <Text style={styles.resetText}>
                No
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._onYesReset} style={styles.yesButton}>
              <Text style={styles.resetText}>
                Yes
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
  },
  _reset: function() {
      return(
        <View style={styles.youSureContainer}>
          <TouchableHighlight onPress={this._onReset} style={styles.roundbuttonreset}>
            <Text style={styles.resetText}>
              Reset
            </Text>
          </TouchableHighlight>
        </View>
      );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>
          {this.state.count}
        </Text>
        <View style={styles.buttons}>
          <TouchableHighlight onPress={this._onSubtract} style={styles.circleButton}>
            <Text style={styles.buttonText}>
              -
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onAdd} style={styles.circleButton}>
            <Text style={styles.buttonText}>
              +
            </Text>
          </TouchableHighlight>
        </View>
        {this.state.areYouSure ? this._areYouSure() : this._reset()}
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
  youSureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    bottom: 0,
    flex: 0,
    position: 'absolute',
    padding: 0,
  },
  count: {
    fontSize: 100,
    marginBottom: 30,
  },
  circleButton: {
    width: 120,
    height: 120,
    borderRadius: 150 / 2,
    backgroundColor: '#4679BD',
    justifyContent: 'center',
    borderColor: '#cfdcec',
    borderWidth: 10,
    alignSelf: 'auto',
    marginHorizontal: 15,
  },
  yesButton: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: '#4679BD',
    justifyContent: 'center',
    borderColor: '#000000',
    alignSelf: 'auto',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    borderLeftWidth: 2,
  },
  noButton: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    backgroundColor: '#4679BD',
    justifyContent: 'center',
    borderColor: '#000000',
    alignSelf: 'auto',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    borderRightWidth: 2,
  },
  roundbuttonreset: {
    height: 100,
    width: Dimensions.get('window').width,
    backgroundColor: '#4679BD',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttons: {
    height: 200,
    flexDirection: 'row',
  },
  youSureButtons: {
    overflow: 'visible',
    flexDirection: 'row',
  },
    buttonText: {
    fontSize: 50,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: -7,
  },
  resetText: {
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  youSureText: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 20,
  },
});

AppRegistry.registerComponent('Simple Counter', () => SimpleCounter);
