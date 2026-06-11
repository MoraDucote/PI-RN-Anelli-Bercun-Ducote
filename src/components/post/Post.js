import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { auth, db } from '../../firebase/config';

function Post(props) {
  // guardamos el email del usuario logueado
  const userEmail = auth.currentUser.email;

  // si el posteo no tiene likes todavía, usamos un array vacío
  const likes = props.data.likes ? props.data.likes : [];

  // revisamos si el usuario actual ya le dio like al posteo
  const userLiked = likes.includes(userEmail);

  function likePost() {
    let newLikes = [];

    if (userLiked) {
      // si el usuario ya había likeado, lo sacamos del array
      newLikes = likes.filter((email) => email !== userEmail);
    } else {
      // si el usuario no había likeado, lo agregamos al array
      newLikes = likes.concat(userEmail);
    }

    // actualizamos el documento del posteo en Firebase
    db.collection('posts')
      .doc(props.id)
      .update({
        likes: newLikes
      })
      .then(() => {
        console.log('Likes actualizados');
      })
      .catch((error) => {
        console.log('Error al actualizar likes');
        console.log(error);
      });
  }

  function goToComments() {
    // navegamos a la pantalla de comentarios y enviamos el id del posteo
    props.navigation.navigate('Comments', {
      postId: props.id
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{props.data.email}</Text>

      <Text style={styles.description}>{props.data.descripcionPost}</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => likePost()}>
          <Text style={styles.likeButton}>
            {userLiked ? '♥' : '♡'} {likes.length}
          </Text>
        </Pressable>

        <Pressable onPress={() => goToComments()}>
          <Text style={styles.commentButton}>Comentar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  backgroundColor: '#32475b',
  borderWidth: 1,
  borderColor: '#496074',
  borderRadius: 14,
  padding: 14,
  marginBottom: 12,
  width: '100%',
},

  email: {
    color: '#f2f0ec',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8
  },

  description: {
    color: '#f2f0ec',
    fontSize: 15,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#5e788d',
    borderRadius: 10,
    padding: 10,
    minHeight: 80
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  likeButton: {
    color: '#8fb3c1',
    fontSize: 16,
    fontWeight: '600'
  },

  commentButton: {
    color: '#8fb3c1',
    fontSize: 13,
    fontWeight: '500'
  }
});

export default Post;