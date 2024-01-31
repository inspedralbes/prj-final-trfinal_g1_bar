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
