import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigation = useNavigation();

  // Effect to refresh WebView when refreshKey changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey((prevKey) => prevKey + 1); // Increment refresh key to trigger refresh
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <WebView
        key={refreshKey} // Use refresh key as key for WebView
        source={{ uri: 'https://temankos.store/?page_id=13' }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
