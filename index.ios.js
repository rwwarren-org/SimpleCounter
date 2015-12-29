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
      //count: 0,
      areYouSure: true,
    });
    this.saveData();
  },
  _areYouSure: function() {
      return(
            <View style={styles.youSureContainer}>
              <Text style={styles.areYouSureText}>
                Are you sure?
              </Text>
              <View style={styles.buttons}>
                <TouchableHighlight onPress={this._onYesReset} style={styles.areyousure}>
                  <Text style={styles.youSureText}>
                    Yes
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onNoReset} style={styles.areyousure}>
                  <Text style={styles.youSureText}>
                    No
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
      );
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
        <View style={styles.buttons}>
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
    //alignSelf: 'flex-end'
    //justifyContent: 'flex-end',
    //alignItems: 'flex-end',
    bottom: 0,
    //flex: .1,
    position: 'absolute',
  },
  count: {
    fontSize: 100,
  },
  roundbuttoncircle: {
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
        backgroundColor: '#4679BD',
        justifyContent: 'center',
        borderColor: '#cfdcec',
        borderWidth: 10,
        alignSelf: 'auto',
        marginHorizontal: 5,
  },
  areyousure: {
        width: 120,
        height: 120,
        //borderRadius: 150 / 2,
        backgroundColor: '#4679BD',
        justifyContent: 'center',
        borderColor: '#cfdcec',
        alignSelf: 'auto',
        marginHorizontal: 5,
        bottom: 0,
        //flexDirection: 'column',
        //flex: 1,
        //alignItems: 'center',
        //flexDirection: 'row',
  },
  roundbuttonreset: {
        height: 100,
        width: Dimensions.get('window').width,
        //height: PixelRatio.get(),
        //height: 80,
        //borderRadius: 150 / 2,
        backgroundColor: '#4679BD',
        justifyContent: 'center',
        //borderColor: '#cfdcec',
        //borderWidth: 10,
        //flexDirection: 'column',
        //flex: 1,
        //alignItems: 'center',
        //flexDirection: 'row',
        alignItems: 'stretch',
  },
  buttons: {
        height: 200,
        flexDirection: 'column',
        //flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
  },
  middleText: {
    fontSize: 50,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  resetText: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  youSureText: {
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

AppRegistry.registerComponent('Simple Counter', () => SimpleCounter);
