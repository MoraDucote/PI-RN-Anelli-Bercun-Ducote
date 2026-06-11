import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

// Importamos las pantallas que van a formar parte del menú Tab
import navSecundaria from '../navegacionStack/navSecundaria';
import NewPost from '../../screens/newPost/NewPost';
import Profile from '../../screens/profile/Profile';

const Tab = createBottomTabNavigator();

function NavegacionTab() {
  return (
    // tab navigator contiene y organiza las pantallas
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>

      {/* tab screen declara una pantalla dentro las tabs */}
      <Tab.Screen
        name="DailyPosts Home"
        component={navSecundaria}
        options={{
          // agregamos iconos
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
          headerShown: false
        }}
      />

      <Tab.Screen
        name="DailyPosts NewPost"
        component={NewPost}
        options={{
          tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />
        }}
      />

      <Tab.Screen
        name="DailyPosts Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
        }}
      />
    </Tab.Navigator>
  );
}

export default NavegacionTab;