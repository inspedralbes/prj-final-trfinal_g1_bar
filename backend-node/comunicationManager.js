const baseUrl = 'http://localhost:8000';
// const token = token;

async function fetchCall(url, method, body) {
    const response = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

//funcion para Route::post('/register', [AuthController::class,'register']);

async function register(user) {
    return await fetchCall('/api/register', 'POST', user);
}

// Route::post('/login', [AuthController::class,'login']);

async function login(user) {
    return await fetchCall('/api/login', 'POST', user);
}

// Get categories d'un restaurant en concret
// Route::get('/restaurants/{id}/categories', [CategoriesController::class,'index']);

async function getCategories(id) {
    return await fetchCall(`/api/restaurants/${id}/categories`, 'GET');
}

// Get productes d'una categoria en concret
// Route::get('/categories/{id}/productes', [ProductesController::class,'index']);

async function getProductes(id) {
    return await fetchCall(`/api/categories/${id}/productes`, 'GET');
}

// Get ingredients d'un producte en concret
// Route::get('/productes/{id}/ingredients', [IngredientsController::class,'indexPerProducte']);

async function getIngredients(id) {
    return await fetchCall(`/api/productes/${id}/ingredients`, 'GET');
}

//Get tots els ingredients
// Route::get('/ingredients', [IngredientsController::class,'index']);

async function getAllIngredients() {
    return await fetchCall('/api/ingredients', 'GET');
}


// Get d'un tiquet en concret
// Route::get('/tiquets/{id}', [TiquetsController::class,'show']);

async function getTiquet(id) {
    return await fetchCall(`/api/tiquets/${id}`, 'GET');
}

const comunicationManager = {
    register,
    login,
    getCategories,
    getProductes,
    getIngredients,
    getAllIngredients,
    getTiquet
};


module.exports = { comunicationManager };
