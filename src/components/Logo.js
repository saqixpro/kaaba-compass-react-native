import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => (
  <Image source={require('../assets/logo.png')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 8,
    tintColor: '#ffffff',
  },
})

export default Logo
