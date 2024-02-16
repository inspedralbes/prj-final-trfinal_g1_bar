import { io } from 'socket.io-client';
import { setCategories, setProductes, setIngredients } from '@/lib/Features/restaurantSlice';

export const socket = io('http://localhost:3001');

export const setupSocketConnection = (dispatch: any) => {
    
    socket.on('connect', () => {
        console.log('Connected to socket.io server');
        // Dispatch an action if needed
        // dispatch({ type: 'SOCKET_CONNECTED' });
    });

    socket.on('restaurant', (restaurant) => {
        // Handle incoming messages
        console.log("restaurant" , restaurant)
        dispatch(setCategories(restaurant.dades.categories));
        dispatch(setProductes(restaurant.dades.productes));
        dispatch(setIngredients(restaurant.dades.ingredients));
        // dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
    });

    // Add more event listeners as needed

    return socket;
};