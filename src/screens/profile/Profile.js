import { auth, db } from '../../firebase/config';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Profile(props) {
  const [username, setUsername] = useState('');
  // creo el estado de username

  const email = auth.currentUser.email;
  // guardo el mail del usuario wue esta logueado en  firebase

  useEffect(() => {
    db.collection('users')
// entro a los users de firestor
      .where('email', '==', email)
// busco donde el mail sea igual al mail del usaurio logueado
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
// recorro cada documento de
          setUsername(doc.data().username);
        });
      });
  }, []);
    


    
export default Profile