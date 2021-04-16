import React, { useState, useEffect } from 'react'
import MainBackground from '../../components/MainBackground'
import Logo from '../../components/Logo'
import Paragraph from '../../components/Paragraph'
import MapView  from 'react-native-maps';
import { Surface, Searchbar } from 'react-native-paper'
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import filter from 'lodash/filter'

const MasjidFinderScreen = ({ navigation }) => {
   const masjidData = require('../../json/MasjidData.json');

   const [data, setData] = useState([]);
   const [query, setQuery] = useState('');
   const [fullData, setFullData] = useState([]);

   const [locationName, setLocationName] = useState('');
   const [locationLat, setLocationLat] = useState(0);
   const [locationLong, setLocationLong] = useState(0);

   useEffect(() => {
      setFullData(masjidData.location);
   }, []);

   // Searching part
   const handleSearch = text => {
      if (text == '') {
         setData('');
         setQuery(text);
      } else {
            const formattedQuery = text.toLowerCase();
            const filteredData = filter(fullData, masjid => {
               return contains(masjid, formattedQuery);
         });
         setData(filteredData);
         setQuery(text);
      }
  };

  const contains = ({ name }, query) => {

      if (name.toLowerCase().includes(query)) {
        return true;
      }
      return false;
  };
  //

   return (
      <MainBackground>

         <Logo />
         
         <Searchbar 
            placeholder = "Search"
            onChangeText = {queryText => handleSearch(queryText)}
            value = {query}
            style={styles.searchBar}
         />
         
         <Surface style={styles.surface1}>
            <MapView 
            style={styles.map}
            loadingEnabled={true}
            showsUserLocation={true}
            initialRegion={{
               latitude: 4.2105,
               longitude: 101.9758,
               latitudeDelta: 2,
               longitudeDelta: 2
            }}
            >
               <MapView.Marker 
                  coordinate={{ 
                     latitude: parseFloat(locationLat), 
                     longitude: parseFloat(locationLong) 
                  }}
                  title={locationName}
                  onPress={() =>{ navigation.navigate('MasjidDetail') }}
               />
            </MapView>
         </Surface>

         <Surface style={styles.surface2}>

            <Paragraph style={{ fontWeight: 'bold' }}>
               Your search has yielded {data.length} results
            </Paragraph>

            <FlatList
               data={data}
               keyExtractor={(item) => item.masjidID}
               renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { setLocationLat(item.lat), setLocationLong(item.long), setLocationName(item.name) }}>
                     <View style={styles.masjidList}>
                        <MaterialIcons name='place' size={18} color='red' />
                        <Paragraph style={{ marginLeft: 10 }}>{item.name}</Paragraph>
                     </View>
                  </TouchableOpacity>
               )}
            />

         </Surface>

      </MainBackground>
   )
};

const styles = StyleSheet.create ({
   searchBar: {
      width: 350,
      elevation: 8
   },

   surface1: {
      padding: 8,
      alignItems: 'center',
      elevation: 6,
      marginBottom: 12,
      borderRadius: 8
   },

   map: {
     width: 350,
     height: 300,
   },

   surface2: {
      maxHeight: 200,
      height: 200,
      width: 365,
      padding: 8,
      elevation: 6,
      marginBottom: 12,
      borderRadius: 8
   },

   masjidList: {
      padding: 2, 
      flexDirection: 'row', 
      padding: 8
   },
});

export default MasjidFinderScreen;
