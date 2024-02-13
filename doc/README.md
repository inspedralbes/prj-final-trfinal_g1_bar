# Documentació bàsica del projecte
Alguns dels punts que han de quedar explicats:
 * Objectius
 * Arquitectura bàsica
   * Tecnologies utilitzades
   * Interrelació entre els diversos components
 * Com crees l'entorn de desenvolupament
 * Com desplegues l'aplicació a producció
 * Llistat d'endpoints de l'API de backend
    * Rutes
   * Exemples de JSON de peticó
   * Exemples de JSON de resposta i els seus codis d'estat 200? 404?


### Rutes API

- [1. GET categories per restaurant](#1-get-categories-per-restaurant)
- [2. GET productes per categoria](#2-get-productes-per-categoria)
- [3. GET ingredients per producte](#3-get-ingredients-per-producte)
- [4. GET tiquet amb els seus items](#4-get-tiquet-amb-els-seus-items)
- [5. Crear un nou tiquet](#5-crear-un-nou-tiquet)
- [6. Crear un nou item al tiquet](#6-crear-un-nou-item-al-tiquet)

### Rutes Administració

- [7. Crear una categoria](#7-crear-una-categoria)
- [8. Actualitzar una categoria](#8-actualitzar-una-categoria)
- [9. Eliminar una categoria](#9-eliminar-una-categoria)
- [10. Crear un producte](#10-crear-un-producte)
- [11. Actualitzar un producte](#11-actualitzar-un-producte)
- [12. Eliminar un producte](#12-eliminar-un-producte)
- [13. Crear un ingredient](#13-crear-un-ingredient)
- [14. Actualitzar un ingredient](#14-actualitzar-un-ingredient)
- [15. Eliminar un ingredient](#15-eliminar-un-ingredient)



####  1. Get categories per restaurant

_Obté totes les categories disponibles per a un restaurant específic._

```
http://localhost:8000/api/restaurants/{id}/categories
```

####  2. Get productes per categoria

_Llista tots els productes disponibles dins d'una categoria específica._

```
http://localhost:8000/api/categories/{id}/productes
```

####  3. Get ingredients per producte

_Detalla tots els ingredients que componen un producte específic._

```
http://localhost:8000/api/productes/{id}/ingredients
```

####  4. Get tiquet amb els seus items

_Consulta la informació d'un tiquet específic juntament amb tots els seus items._

```
http://localhost:8000/api/tiquets/{id}
```

####  5. Crear un nou tiquet

_Permet a l'administrador d'un restaurant crear un nou tiquet._

```javascript
fetch("http://localhost:8000/api/tiquets", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    restaurant_id: 1,
    nombre_taula: 1,
  }),
})
```

####  6. Crear un nou item al tiquet

_Afegeix un nou item a un tiquet existent._

```javascript
fetch("http://localhost:8000/api/tiquets/items", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify([{
    tiquet_id: 1,
    producte_id: 1,
    quantitat: 2,
    user_id: 3,
  },
  {
    tiquet_id: 1,
    producte_id: 5,
    quantitat: 1,
    user_id: 2,
  }]),
})
```

####  7. Crear una categoria

_Permet a l'administrador d'un restaurant afegir una nova categoria._


```javascript
fetch("http://localhost:8000/api/categories", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Ofertes",
    imatge: "ruta_a_la_imatge.jpg",
    restaurant_id: 1
  }),
})
```

####  8. Actualitzar una categoria

_Permet a l'administrador d'un restaurant actualitzar una categoria existent._

```javascript
fetch(`http://localhost:8000/api/categories/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Sopars",
    imatge: "ruta_actualitzada_a_la_imatge.jpg",
  }),
})
```

####  9. Eliminar una categoria

_Permet a l'administrador d'un restaurant eliminar una categoria existent._

```javascript
fetch(`http://localhost:8000/api/categories/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```

####  10. Crear un producte

_Permet a l'administrador d'un restaurant afegir un nou producte al catàleg._

```javascript
fetch("http://localhost:8000/api/productes", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Pizza Margarita",
    descripcio: "Pizza tradicional italiana amb salsa de tomàquet, mozzarella fresca i fulles de basilic, sobre una massa fina i cruixent.",
    preu: 10.50,
    imatge: "pizza_margarita.jpg",
    actiu: true,
    categories: [1, 4],
    ingredients: [3, 6, 8, 9]
  }),
})
```

####  11. Actualitzar un producte

_Permet a l'administrador d'un restaurant actualitzar les dades d'un producte existent._

```javascript
fetch(`http://localhost:8000/api/productes/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Pizza Barbacos",
    descripcio: "Pizza barbacoa rara de cojones.",
    preu: 13,
    imatge: "pizza_barbacue.jpg",
    actiu: false,
    categories: [3],
    ingredients: [1, 7, 13, 4]
  }),
})
```

####  12. Eliminar un producte

_Permet a l'administrador d'un restaurant eliminar un producte del catàleg._

```javascript
fetch(`http://localhost:8000/api/productes/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```

####  13. Crear un ingredient

_Permet a l'administrador d'un restaurant introduir un nou ingredient a la base de dades._

```javascript
fetch("http://localhost:8000/api/ingredients", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Mozzarella",
    gluten: false,
    lactosa: true,
    fruits_secs: false,
    vegetariana: true,
    vegana: false
  }),
})
```

#### 14. Actualitzar un ingredient

_Permet a l'administrador d'un restaurant modificar les propietats d'un ingredient existent._

```javascript
fetch(`http://localhost:8000/api/ingredients/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nom: "Mozzarella",
    gluten: false,
    lactosa: true,
    fruits_secs: false,
    vegetariana: true,
    vegana: false
  }),
})
```

####  15. Eliminar un ingredient

_Permet a l'administrador d'un restaurant eliminar un ingredient de la base de dades._

```javascript
fetch(`http://localhost:8000/api/ingredients/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```
