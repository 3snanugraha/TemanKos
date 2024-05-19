import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Tabs, useNavigation } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [url, setUrl] = useState('https://temankos.store/?v=d62a8d1683e6');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Refresh WebView when screen focus is gained
      setUrl((prevUrl) => prevUrl + '&refresh=' + new Date().getTime());
    });
    return unsubscribe;
  }, [navigation]);

  const handleTabPress = (newUrl: string) => {
    setUrl(newUrl);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#252530" />
      <WebView source={{ uri: url }} style={styles.webview} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#252530',
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            paddingBottom: 5,
            paddingTop: 5,
            height: 55,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Temankos',
            headerTitleAlign: 'center',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('https://temankos.store/?page_id=13'),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Cari Kost',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('https://temankos.store/explore'),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorit',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('https://temankos.store/favorites'),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Akun',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => handleTabPress('https://temankos.store/account'),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1, // Adjust the margin value as needed
  },
  webview: {
    flex: 1,
  },
});
