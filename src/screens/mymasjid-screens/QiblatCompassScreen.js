import React, {useState, useEffect} from 'react'
import {Image, View, Text, Dimensions} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window');

const KaabaLocation = {
  long: 39.825989 ,
  lat: 21.422199
}

const QiblatCompassScreen = ({ navigation }) => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [userLocation, setUserLocation] = useState(null);


  useEffect(() => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log('Permission Was Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      console.log(location.coords.longitude + " " + location.coords.latitude);
      setUserLocation(location);

    })()

    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(bearing() - _angle(data) * -1);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  const toRadian = (degree) => degree * (Math.PI / 180);

  const toDegree = (rad) => (rad * 180) / Math.PI;

  const bearing = () => {
    const longitude1 = userLocation?.coords.longitude || 0;
    const longitude2 = KaabaLocation.long;
    const latitude1 = toRadian(userLocation?.coords.latitude || 0);
    const latitude2 = toRadian(KaabaLocation.lat);
    const longDiff = toRadian(longitude2 - longitude1);
    const y = Math.sin(longDiff) * Math.cos(latitude2);
    const x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longDiff);
    
    return toDegree(Math.atan2(y, x)) + 360 % 360;
  }


  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    // return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer - 271;
    return magnetometer - 90;
  };

  return (

    <Grid style={{ backgroundColor: 'black' }}>
      <Row style={{ alignItems: 'center' }} size={.9}>
        <Col style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontSize: height / 26,
              fontWeight: 'bold'
            }}>
            {_direction(_degree(magnetometer))}
          </Text>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={.1}>
        <Col style={{ alignItems: 'center' }}>
          <View style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
            <Image source={require('../../assets/compass_pointer.png')} style={{
              height: height / 26,
              resizeMode: 'contain'
            }} />
          </View>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={2}>
        <Text style={{
          color: '#fff',
          fontSize: height / 27,
          width: width,
          position: 'absolute',
          textAlign: 'center'
        }}>
          {_degree(magnetometer).toFixed(2)}°
          </Text>

        <Col style={{ alignItems: 'center' }}>

          <View style={{transform: [{rotate: 360 - magnetometer + 'deg'}], position: 'relative'}}>
            <Image source={require("../../assets/compass_bg.png")} style={{
            height: width - 80,
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'contain',
            transform: [{ rotate: '50deg' }]
            }} />
            <Image source={require("../../assets/macca.png")} width={40} height={40} style={{
              width: 40, height: 40, position: 'absolute', bottom: 150, right: 70, transform:[{rotate: '240deg'}]
            }} />
          </View>

        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={1}>
        <Col style={{ alignItems: 'center' }}>
          
        </Col>
      </Row>

    </Grid>

  );
 
 const styles = StyleSheet.create({
   image: {
     width: '90%',
     flex: 1,
     alignSelf: 'center',
   },
 });
}

//  return (
//    <Background>
//    <Logo />
//    <Paragraph>d
//       Qiblat Compass
//    </Paragraph>
// </Background>
// )
   // const getQiblaHeading(lat, long) => {
   //    let myPoint = new.google.maps.LatLng(lat, long)
   //    let qiblaPoint = new google.maps.LatLng(21.4225, 39.8262);

   //    let heading = google.maps.geometry.spherical.computeHeading(myPoint, qiblaPoint)  
   //    console.log(heading)
   //    return heading
   // }

   //    let arrow = document.querySelector("#compass")
   //    arrow.setAttribute("style", `transform: rotate(${getQiblaHeading(35.6762, 130.6503) - 90}deg);`);

   
   


export default QiblatCompassScreen
