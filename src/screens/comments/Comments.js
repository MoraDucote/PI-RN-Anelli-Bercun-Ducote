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
    flex: 1,
    backgroundColor: '#26394b',
    paddingHorizontal: 22,
    paddingTop: 45
  },

  title: {
    color: '#f2f0ec',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 22
  },

  input: {
    backgroundColor: '#f2f0ec',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
    color: '#26394b',
    fontSize: 15,
    marginBottom: 12
  },

  button: {
    backgroundColor: '#40586d',
    borderWidth: 1,
    borderColor: '#5e788d',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: 170,
    alignSelf: 'center',
    marginBottom: 18
  },

  buttonText: {
    color: '#f2f0ec',
    fontSize: 15,
    fontWeight: '600'
  },

  error: {
    color: '#ffb4b4',
    textAlign: 'center',
    marginBottom: 12
  },

  commentContainer: {
    backgroundColor: '#32475b',
    borderWidth: 1,
    borderColor: '#496074',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    width: '90%',
    alignSelf: 'center'
  },

  email: {
    color: '#8fb3c1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6
  },

  comment: {
    color: '#f2f0ec',
    fontSize: 15,
    lineHeight: 21
  },
  backButton: {
  backgroundColor: '#40586d',
  borderWidth: 1,
  borderColor: '#5e788d',
  borderRadius: 10,
  paddingVertical: 10,
  width: 120,
  alignItems: 'center',
  marginBottom: 18
},

backButtonText: {
  color: '#f2f0ec',
  fontSize: 14,
  fontWeight: '600'
}

});

export default Comments;