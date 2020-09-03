import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native'
import Loading from './Loading'
import * as Location from 'expo-location';
import axios from 'axios'

const API_KEY = '47a5302cc822714c512a05ee466b47da'

export default class extends React.Component  {
  state = {
    isLoading: true
  }
  getWeather = async (latitude,longitude) => {
    const {data} = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)

    console.log('data',data)
  }

 getLocation = async () => {
   try {
    await Location.requestPermissionsAsync()
    const { coords: {latitude, longitude} } = await Location.getCurrentPositionAsync()
    //send to API and get weather
    this.getWeather(latitude,longitude)
    this.setState({isLoading: false})
   } catch (error) {
    Alert.alert("Can't find you.")
  }
}

componentDidMount() {
  this.getLocation()
}

render() {
  const {isLoading} = this.state
    return isLoading ? <Loading/> : null
  }
}

