
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from '../../firebase/config';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // guardo el mail y la contra que escribe el usuario  

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

        props.navigation.navigate('Home');
// redirigo al usuario a home 
      })
//ejecuto este bloque solo si ocurrio un error
      .catch((error) => {
        console.log('Error al loguear usuario');
        console.log(error);

        setError(error.message);
// guardo el msj de error en el estado para mostrarlo en pantalla
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