import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Platform } from 'react-native';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';

const App = () => {
  const [vpnState, setVpnState] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const observeVpn = async () => {
      if (Platform.OS === 'ios') {
        await RNSimpleOpenvpn.observeState();
      }
      addVpnStateListener((e) => {
        setVpnState(e);
      });
    };

    observeVpn();

    return async () => {
      if (Platform.OS === 'ios') {
        await RNSimpleOpenvpn.stopObserveState();
      }
      removeVpnStateListener();
    };
  }, []);

  const startOvpn = async () => {
    try {
      await RNSimpleOpenvpn.connect({
        remoteAddress: '85.192.48.251 1194',
        ovpnFileName: 'zie2000@mail.ru%D', // Correct the filename as needed
        assetsPath: 'server/openVPN/',
        providerBundleIdentifier: 'com.example.RNSimpleOvpnTest.NEOpenVPN',
        localizedDescription: 'RNSimpleOvpn',
      });
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to VPN:', error);
    }
  };

  const stopOvpn = async () => {
    try {
      await RNSimpleOpenvpn.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting from VPN:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>VPN State: {vpnState ? JSON.stringify(vpnState) : 'Not Connected'}</Text>
      <Button title={isConnected ? 'Disconnect' : 'Connect'} onPress={isConnected ? stopOvpn : startOvpn} />
    </View>
  );
};

export default App;