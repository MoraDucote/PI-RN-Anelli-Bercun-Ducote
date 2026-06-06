import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";
import Post from "../../components/post/Post";

function Home(props) {
  
  const [posts, setPosts] = useState([]);
  const [estaLogueado, setEstaLogueado] = useState(false);

  useEffect(() => {
    //Detecta si hay usuario logueado y actualiza el estad
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEstaLogueado(true);
      } else {
        setEstaLogueado(false);
      }
    });

    //Trae los posts de Firebase y los ordena desde los mas nuevos a menos.
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let postsArray = [];

        //Recorro los docs que me trae Firebase y los guardo en un array para luego mostrarlo en la Home.
        docs.forEach((doc) => {
          postsArray.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setPosts(postsArray);
      });
  }, []);

  console.log(posts);

  //Si hay usuario, muestra la Home, pero si no hay usuario, muestra el mensaje.
  if (!estaLogueado) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <Text>Para ver los posteos tenés que estar logueado.</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post
            id={item.id}
            email={item.data.email}
            descripcionPost={item.data.descripcionPost}
            likes={item.data.likes}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

