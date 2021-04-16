import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { theme } from '../core/theme'

const MainBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/background.jpg')}
    resizeMode="stretch"
    style={styles.background}
  >
    <View style={styles.container} behavior="padding">
      {children}
    </View>
  </ImageBackground>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MainBackground
