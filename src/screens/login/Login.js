
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
    flex: 1,
    backgroundColor: '#26394b',
    paddingHorizontal: 22,
    paddingTop: 70
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
    marginBottom: 40
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
    marginTop: 6
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

export default Login;