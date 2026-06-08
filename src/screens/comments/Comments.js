import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';

import { auth, db } from '../../firebase/config';

function Comments(props) {
  const [comentario, setComentario] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  // recibo el id del posteo que viene desde post.js
  const { postId } = props.route.params;

  useEffect(() => {
    // traigo los comentarios guardados en Firebase
    db.collection('comments')
      .where('postId', '==', postId)
      .onSnapshot((docs) => {
        let commentsArray = [];

        docs.forEach((doc) => {
          commentsArray.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setComments(commentsArray);
      });
  }, []);

  function onSubmit() {
    if (comentario === '') {
      setError('El comentario no puede estar vacío');
      return;
    }

    // guardo el comentario en la colección comments
    db.collection('comments').add({
      postId: postId,
      comentario: comentario,
      email: auth.currentUser.email,
      createdAt: Date.now()
    })
    .then(() => {
      console.log('comentario creado correctamente');

      setComentario('');
      setError('');
    })
    .catch((error) => {
      console.log('error al crear comentario');
      console.log(error);

      setError(error.message);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí un comentario"
        keyboardType="default"
        value={comentario}
        onChangeText={(text) => setComentario(text)}
      />

      {error !== '' ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Comentar</Text>
      </Pressable>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.email}>{item.data.email}</Text>
            <Text style={styles.comment}>{item.data.comentario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  title: {

  },
  input: {

  },
  button: {

  },
  buttonText: {

  },
  error: {

  },
  commentContainer: {

  },
  email: {

  },
  comment: {

  }
});

export default Comments;