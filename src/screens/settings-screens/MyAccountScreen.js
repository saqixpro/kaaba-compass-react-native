import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Paragraph from '../../components/Paragraph'

const MyAccountScreen = ({ navigation }) => {
   return (
      <Background>
      <Logo />
      <Paragraph>
         My Account
      </Paragraph>
   </Background>
   )
};

export default MyAccountScreen
