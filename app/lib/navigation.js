import { NavigationActions } from 'react-navigation';


// Función para navegar entre rutas
export const navigateTo = (path, navigation) => {
  const reset = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: path })],
  });
  navigation.dispatch(reset);
};

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
