import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/home/Home';
import Comments from '../../screens/comments/Comments';

const Stack = createNativeStackNavigator();


function navSecundaria() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ title: 'Comentarios' }}
        />
      </Stack.Navigator>
  );
}

export default navSecundaria;