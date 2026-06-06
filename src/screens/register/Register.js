import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';

function Register(props) {
  // Estados para guardar lo que escribe el usuario en cada input
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Estado para mostrar errores en pantalla
  const [error, setError] = useState('');

  function onSubmit() {
    // Validamos que ningún campo esté vacío
    if (email === '' || username === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Creamos el usuario en Firebase 
    auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('Usuario registrado correctamente');
        console.log(response.user);

        // Guardamos los datos del usuario en la coleccion users de Firestore
        db.collection('users').add({
          email: email,
          username: username,
          createdAt: Date.now()
        })
        .then(() => {
          console.log('Usuario guardado en la colección users');

          // Limpiamos los campos y el error
          setEmail('')
          setUsername('')
          setPassword('')
          setError('')

          // Redirigimos al usuario a la pantalla de Login
          props.navigation.navigate('Login')
        })
        .catch((error) => {
          console.log('Error al guardar usuario en Firestore');
          console.log(error);

          setError(error.message);
        });
      })
      .catch((error) => {
        console.log('Error al registrar usuario');
        console.log(error);

        // Mostramos el error recibido desde Firebase
        setError(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {error !== '' ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Registrate</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
      </Pressable>
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
  link: {

  },
  error: {

  }
});

export default Register;