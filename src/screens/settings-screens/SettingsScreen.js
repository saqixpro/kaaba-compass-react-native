import React from 'react'
import Background from '../../components/Background'
import Button from '../../components/Button'

const SettingsScreen = ({ navigation }) => {
   return (
      <Background>
      <Button
         mode="outlined"
         onPress={() => navigation.navigate('MyAccount')}
      >
         My Account
      </Button>

      <Button
         mode="outlined"
         onPress={() => navigation.navigate("Notifications")}
      >
         Notifications
      </Button>

      <Button
         mode="outlined"
         onPress={() => navigation.navigate("FavoriteMasjid")}
      >
         Favorite Masjid
      </Button>
      <Button
         mode="outlined"
         onPress={() => navigation.navigate('MasjidFinder')}
      >
         Location
      </Button>
      <Button
         mode="outlined"
         onPress={() => navigation.navigate('PrayerTimes')}
      >
         Prayer Times
      </Button>
      <Button
         mode="outlined"
         onPress={() => navigation.navigate('IslamicCalendar')}
      >
         Islamic Calendar
      </Button>

      <Button
         mode="outlined"
         onPress={() => navigation.navigate('Feedback')}
      >
         Feedback
      </Button>
      <Button
         mode="outlined"
         onPress={() => alert('Go to Facebook')}
      >
         facebook.com/mymasjid
      </Button>
      <Button
         mode="outlined"
         onPress={() => alert('Go to Twitter')}
      >
         twitter.com/MyMasjid
      </Button>
      <Button
         mode="outlined"
         onPress={() => alert('Go to MyMasjid website')}
      >
         www.mymasjid.gov.my
      </Button>
   </Background>
   )
};

export default SettingsScreen
