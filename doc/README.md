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

1. **GET categories per restaurant**

```
http://localhost:8000/api/restaurants/{id}/categories
```

2. **GET productes per categoria**

```
http://localhost:8000/api/categories/{id}/productes
```

3. **GET ingredients per producte**

```
http://localhost:8000/api/productes/{id}/ingredients
```

4. **GET tiquet amb els seus items**

```
http://localhost:8000/api/tiquets/{id}
```

5. **Crear un nou tiquet**

*_només l'administrador d'un restaurant pot crear un tiquet_

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
    link_qr: "[link del codi qr]"
  }),
})
```

6. **Actualitzar un tiquet**

*_només l'administrador d'un restaurant pot actualitzar un tiquet_

```javascript
fetch(`http://localhost:8000/api/tiquets/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    nombre_taula: 2,
    link_qr: "[nou link del codi qr]"
  }),
})
```

7. **Eliminar un tiquet**

*_només l'administrador d'un restaurant pot eliminar un tiquet_

```javascript
fetch(`http://localhost:8000/api/tiquets/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
})
```

8. **Crear un nou item al tiquet**

```javascript
fetch("http://localhost:8000/api/tiquets/items", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    tiquet_id: 1,
    producte_id: 1,
    quantitat: 2
  }),
})
```

9. **Actualitzar un nou item al tiquet (quantitat)**

*_només el creador d'un item pot editar la quantitat un item_

```javascript
fetch(`http://localhost:8000/api/tiquets/items/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    tiquet_id: 1,
    producte_id: 1,
    quantitat: 6,
  }),
})
```

10. **Actualitzar l'estat d'un item al tiquet**

*_només l'administrador del restaurant pot actualitzar l'estat un item_

```javascript
fetch(`http://localhost:8000/api/tiquets/items/${id}/estat`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    tiquet_id: 1,
    producte_id: 1,
    estat: "En Preparació",
  }),
})
```

11. **Eliminar un item al tiquet**

*_només el creador d'un item pot eliminar-ho_

```javascript
fetch(`http://localhost:8000/api/tiquets/items/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  },
})
```

#### Rutes administració

*_només l'administrador del restaurant pot trucar les rutes d'administració_

12. **Crear una categoria**

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

13. **Actualitzar una categoria**

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

14. **Eliminar una categoria**

```javascript
fetch(`http://localhost:8000/api/categories/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```

15. **Crear un producte**

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

15. **Actualitzar un producte**

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

15. **Eliminar un producte**

```javascript
fetch(`http://localhost:8000/api/productes/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```

16. **Crear un ingredient**

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

17. **Actualitzar un ingredient**

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

18. **Eliminar un ingredient**

```javascript
fetch(`http://localhost:8000/api/ingredients/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`,
  }
})
```