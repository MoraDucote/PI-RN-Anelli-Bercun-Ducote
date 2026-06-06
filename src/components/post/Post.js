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
    // Navegamos a la pantalla de comentarios y enviamos el id del posteo
    props.navigation.navigate('Comments', {
      postId: props.id
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{props.data.email}</Text>

      <Text style={styles.description}>{props.data.descripcionPost}</Text>

      <Text style={styles.likes}>
        Likes: {likes.length}
      </Text>

      <Pressable onPress={() => likePost()}>
        <Text style={styles.likeButton}>
          {userLiked ? 'Quitar me gusta' : 'Me gusta'}
        </Text>
      </Pressable>

      <Pressable onPress={() => goToComments()}>
        <Text style={styles.commentButton}>Comentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  email: {

  },
  description: {

  },
  likes: {

  },
  likeButton: {

  },
  commentButton: {

  }
});

export default Post;