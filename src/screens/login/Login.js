
import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from '../../firebase/config';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // guardo el mail y la contra que escribe el usuario  

  useEffect(() => {
  // firebase revisa si hay un usuario logueado
  auth.onAuthStateChanged((user) => {
    // si hay usuario, entra directo a la app
    if (user) {
      props.navigation.navigate('NavegacionTab');
    }
  });
}, []);

  function onSubmit() {
    if (email === '' || password === '') {
      setError('Todos los campos son obligatorios');
      return;
    }
// chequeo que los campos no esten vacios

    auth.signInWithEmailAndPassword(email, password)
// uso firebase authntication para loguear al usuario y si el login funciona ejecuto el then
      .then((response) => {
        console.log('Usuario logueado correctamente');
// muestro en consola que el login funcino para no tener que entrar a firebase
        console.log(response.user);
// muestro los datos del usuario que evolvio firebase

        setEmail('');
        setPassword('');
        setError('');
// limpio los inputs del mail y contrase;a y el msj de error 

        props.navigation.navigate('NavegacionTab');
      })
//ejecuto este bloque solo si ocurrio un error
      .catch((error) => {
        console.log('Error al loguear usuario');
        console.log(error);

        // error.code muestra el tipo de error de Firebase
        if (error.code === 'auth/wrong-password') {
          setError('La contraseña es incorrecta');
        } else if (error.code === 'auth/user-not-found') {
          setError('No existe un usuario registrado con ese email');
        } else if (error.code === 'auth/invalid-email') {
          setError('El email ingresado no es válido');
        } else {
          setError('No se pudo iniciar sesión');
        }
});
  }

 return (
  <View style={styles.container}>
    <Text style={styles.title}>Iniciar sesión</Text>

    <TextInput
      style={styles.input}
      placeholder="Email"
      keyboardType="email-address"
      value={email}
      onChangeText={(text) => setEmail(text)}
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
      <Text style={styles.buttonText}>Ingresar</Text>
    </Pressable>

    <Pressable onPress={() => props.navigation.navigate('Register')}>
      <Text style={styles.link}>No tengo cuenta</Text>
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

export default Login;