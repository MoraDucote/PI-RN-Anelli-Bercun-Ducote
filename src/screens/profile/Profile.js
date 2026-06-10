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
            .where('email', '==', email).onSnapshot((docs) => {
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
            <Text style={styles.info}>Usuario: {username}</Text>
            <Text style={styles.info}>Email: {email}</Text>

            <Text style={styles.subtitle}>Mis posts</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                //uso el id de cada post y x cada item (post) muestro: 
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text>{item.data.descripcionPost}</Text>
                        <Text>Likes: {item.data.likes.length}</Text>
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
    post: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginTop: 10,
        borderRadius: 8
    },



    container: {
        flex: 1,
        backgroundColor: '#26394b',
        paddingHorizontal: 22,
        paddingTop: 55
    },

    logo: {
        color: '#f2f0ec',
        fontSize: 32,
        letterSpacing: 5,
        fontStyle: 'italic',
        fontWeight: '600'
    },

    subtitle: {
        color: '#aab5bf',
        fontSize: 20,
        letterSpacing: 3,
        marginTop: 20,
        marginBottom: 30
    },

    card: {
        backgroundColor: '#32475b',
        borderWidth: 1,
        borderColor: '#496074',
        borderRadius: 18,
        padding: 24,
        alignItems: 'center'
    },

    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: '#6f98a8',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#8fb3c1',
        marginBottom: 16
    },

    avatarText: {
        color: '#f2f0ec',
        fontSize: 34,
        fontWeight: '600'
    },

    title: {
        color: '#f2f0ec',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4
    },

    text: {
        color: '#aab5bf',
        fontSize: 15,
        marginBottom: 24
    },

    infoBox: {
        width: '100%',
        backgroundColor: '#40586d',
        borderRadius: 12,
        padding: 15,
        marginBottom: 24
    },

    label: {
        color: '#aab5bf',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 3,
        marginBottom: 6
    },

    info: {
        color: '#f2f0ec',
        fontSize: 16,
        marginBottom: 8,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#5e788d',
        borderRadius: 10,
        padding: 7,
        alignSelf: 'flex-start',



    },

    button: {
        width: '100%',
        backgroundColor: '#40586d',
        borderWidth: 1,
        borderColor: '#5e788d',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center'
    },

    buttonText: {
        color: '#f2f0ec',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 3
    }
});

export default Profile;