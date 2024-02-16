@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
    <form  method="POST" action="{{ route('productesUpdate', ['id' => $producte->id]) }}" enctype="multipart/form-data">
        @method('PUT')
        @csrf

        <div class="mb-3 col">

            <label for="nom_producte" class="form-label">Nom</label>
            <input type="text" class="form-control mb-2" name="nom" id="nom_producte" placeholder="Introduexi el nom del producte" value="{{ $producte->nom }}">
            <br>

            <div class="form-check form-switch">
                <label class="form-check-label" for="esActiu_producte">Producte actiu</label>
                <input class="form-check-input" type="checkbox" role="switch" name="esActiu" id="esActiu_producte" value="1" {{  ($producte->actiu == 1 ? ' checked' : '') }}>
            </div>
            <br>

            <div class="row">
                    <div class="col">
                        <!--CATEGORIES-->
                        <label for="categoria_producte" class="form-label">Categoria del producte</label>
                        @foreach ($allCategories as $category)
                        <br>
                        <input class="form-check-input" name="categories[]" type="checkbox" value="{{$category->id}}"
                            id="flexCheckDefaultCategory{{$category->id}}" {{ $linkedCategories->contains($category) ? 'checked' : '' }} >
                        <label class="form-check-label" for="flexCheckDefaultCategory{{$category->id}}">
                            {{$category->nom}}
                        </label>
                        @endforeach
                    </div>

                    <div class="col">
                        <!--INGREDIENTS-->
                        <label for="ingredients_producte" class="form-label">Ingredients del producte</label>
                        <div style="overflow-y: scroll; max-height: 200px">
                            @foreach ($allIngredients as $ingredient)
                            <br>
                            <input class="form-check-input" name="ingredients[]" type="checkbox"
                                value="{{$ingredient->id}}" id="flexCheckDefaultIngredient{{$ingredient->id}}" {{ $linkedIngredients->contains($ingredient) ? 'checked' : '' }}>
                            <label class="form-check-label" for="flexCheckDefaultIngredient{{$ingredient->id}}">
                                {{$ingredient->nom}}
                            </label>
                            @endforeach
                        </div>
                    </div>

                </div>

            <label for="descripcio_producte" class="form-label">Descripcio</label>
            <input type="text" class="form-control mb-2" id="descripcio_producte" name="descripcio" placeholder="Introduexi la descripció del producte" value="{{ $producte->descripcio }}">

            <label for="preu_producte" class="form-label">Preu</label>
            <input type="number" class="form-control mb-2" id="preu_producte" name="preu" step=".01" required placeholder="Introduexi el preu del producte" value="{{ $producte->preu }}">
            <br>

            <label for="imatge_producte" class="form-label">Imatge actual</label><br>
            <!--show image-->
            <img src="{{ asset('img/' . $producte->imatge) }}" alt="Image">

            <input type="submit" value="Actualitzar producte" class="btn btn-warning my-2" />
            <div style="display: inline-block; margin-top: 10px; float: right;">
                <a href="{{ route('productesIndex') }}" class="btn btn-danger">
                    Cancel·lar
                </a>
            </div>
        </div>
    </form>

    
    </div>
</div>

@endsection