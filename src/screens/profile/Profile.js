import { auth, db } from '../../firebase/config';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Profile(props) {

    const [username, setUsername] = useState('');
    // creo el estado de username

    const email = auth.currentUser.email;
    // guardo el mail del usuario que está logueado en Firebase

    useEffect(() => {
        db.collection('users')
            // entro a la colección users de Firestore
            .where('email', '==', email)
            // busco donde el mail sea igual al mail del usuario logueado
            .onSnapshot((docs) => {
                docs.forEach((doc) => {
                    // recorro cada documento encontrado
                    setUsername(doc.data().username);
                });
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text>Usuario: {username}</Text>
            <Text>Email: {email}</Text>

            <Pressable style={styles.button} onPress={() => logout()}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </Pressable>



        </View>



    );
}

const styles = StyleSheet.create({
    container: {

    },

    title: {

    },

    button: {

    },

    buttonText: {

    }
});

export default Profile;