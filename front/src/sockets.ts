import { io } from 'socket.io-client';
import { setCategories, setProductes, setIngredients, setTiquetTaula } from '@/lib/Features/restaurantSlice';

export const socket = io('http://localhost:3001'); // development URL
// export const socket = io('http://paypart.daw.inspedralbes.cat:3455'); // production URL

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

    socket.on('crear-comanda', (cistella) => {
        console.log('socket crear-comanda', cistella);
        dispatch(setTiquetTaula(cistella));
    });

    socket.on('modificar-producte', (cistella) => {
        console.log('socket modificar-producte', cistella);
        dispatch(setTiquetTaula(cistella));
    });

    socket.on('eliminar-producte', (cistella) => {
        console.log('socket eliminar-producte', cistella);
        dispatch(setTiquetTaula(cistella));
    });

    // Add more event listeners as needed

    return socket;
};