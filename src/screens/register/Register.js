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
    flex: 1,
    backgroundColor: '#26394b',
    paddingHorizontal: 22,
    paddingTop: 55
  },

  logo: {
    color: '#f2f0ec',
    fontSize: 36,
    letterSpacing: 5,
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'center'
  },

  subtitle: {
    color: '#aab5bf',
    fontSize: 12,
    letterSpacing: 7,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 34
  },

  card: {
    backgroundColor: '#32475b',
    borderWidth: 1,
    borderColor: '#496074',
    borderRadius: 18,
    padding: 24
  },

  title: {
    color: '#f2f0ec',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8
  },

  text: {
    color: '#aab5bf',
    fontSize: 15,
    marginBottom: 22
  },

  input: {
    backgroundColor: '#f2f0ec',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
    color: '#26394b',
    fontSize: 15,
    marginBottom: 14
  },

  button: {
    backgroundColor: '#40586d',
    borderWidth: 1,
    borderColor: '#5e788d',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    width: '60%',
    alignSelf: 'center'
  },

  buttonText: {
    color: '#f2f0ec',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 4
  },

  link: {
    color: '#8fb3c1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '500'
  },

  error: {
    color: '#ffb3b3',
    fontSize: 14,
    marginBottom: 10
  }

});

export default Register;