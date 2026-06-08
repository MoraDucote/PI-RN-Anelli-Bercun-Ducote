import { auth, db } from '../../firebase/config';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';

function Profile(props) {

    const [username, setUsername] = useState('');
    // creo el estado de username

    const [posts, setPosts] = useState([]);
    // empiezo un array vacio para actualizar con los posteos del usuario

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

    useEffect(() => {
        db.collection('posts')
            // entro a la colceccion posts
            .where('email', '==', email)
            .onSnapshot((docs) => {
                // busco los posts del usaurio y armo un array
                let postsDelUsuario = [];

                docs.forEach((doc) => {
                    postsDelUsuario.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                // recorro cada post y agrego al array los q son del usuario

                setPosts(postsDelUsuario);
                // acutalizo el estado de posts
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

            <Text>Mis posts</Text>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                //uso el id de cada post y x cada item (post) muestro: 
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.data.descripcionPost}</Text>
                        <Text>Likes: {item.data.likes.length}</Text>
                        <Text>Fecha: {item.data.createdAt}</Text>
                    </View>
                )}
            />

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