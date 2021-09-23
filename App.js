import React, { useState, useEffect } from 'react';
import { Button, View, Text, } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default App = () => {

 const [initializing, setInitializing] = useState(true);
 const [user, setUser] = useState();


  GoogleSignin.configure({
    webClientId: '397580930889-kh9r1m3tfijmu492buh9eumbtjf0jbku.apps.googleusercontent.com',
  });

  async function SignInGoogle() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function SignOutGoogle() {
    return auth().signOut();
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Button
        title="Google Sign-in"
        onPress={() => SignInGoogle().then(() => console.log(auth().currentUser.displayName))}
        />
         </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button
        title="Google Sign-out"
        onPress={() => SignOutGoogle()}
        />
    </View>
  );
};