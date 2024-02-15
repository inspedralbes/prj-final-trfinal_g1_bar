@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

@error('categories')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    La categoria és obligatoria
</div>
@enderror

@error('ingredients')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    Els ingredients són obligatoris
</div>
@enderror

@error('descripcio')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    La descripció és obligatoria
</div>
@enderror

@error('preu')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El preu és obligatori
</div>
@enderror

@error('imatge')
<div class="alert alert-danger position-absolute top-1"
    style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    La imatge és obligatoria
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('productesStore') }}">
            @method('POST')
            @csrf

            <div class="mb-3 col">
                <!--NOM-->
                <label for="nom_producte" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom_producte" name="nom"
                    placeholder="Introduexi el nom del producte"><br>

                <div class="form-check form-switch">
                    <label class="form-check-label" for="esActiu_producte">Producte actiu</label>
                    <input class="form-check-input" type="checkbox" role="switch" name="actiu" id="esActiu_producte"
                        value="1">
                </div>
                <br>


                <div class="row">
                    <div class="col">
                        <!--CATEGORIES-->
                        <label for="categoria_producte" class="form-label">Categoria del producte</label>
                        @foreach ($categories as $category)
                        <br>
                        <input class="form-check-input" name="categories[]" type="checkbox" value="{{$category->id}}"
                            id="flexCheckDefaultCategory{{$category->id}}">
                        <label class="form-check-label" for="flexCheckDefaultCategory{{$category->id}}">
                            {{$category->nom}}
                        </label>
                        @endforeach
                    </div>

                    <div class="col">
                        <!--INGREDIENTS-->
                        <label for="ingredients_producte" class="form-label">Ingredients del producte</label>
                        <div style="overflow-y: scroll; max-height: 200px">
                            @foreach ($ingredients as $ingredient)
                            <br>
                            <input class="form-check-input" name="ingredients[]" type="checkbox"
                                value="{{$ingredient->id}}" id="flexCheckDefaultIngredient{{$ingredient->id}}">
                            <label class="form-check-label" for="flexCheckDefaultIngredient{{$ingredient->id}}">
                                {{$ingredient->nom}}
                            </label>
                            @endforeach
                        </div>
                    </div>

                </div>

                <!--DESCRIPCIO-->
                <label for="descripcio_producte" class="form-label">Descripcio</label>
                <input type="text" class="form-control" id="descripcio_producte" name="descripcio"
                    placeholder="Introduexi la descripció del producte"><br>

                <!--PREU-->
                <label for="preu_producte" class="form-label">Preu</label>
                <input type="number" class="form-control" id="preu_producte" name="preu" step=".01" required
                    placeholder="Introduexi el preu del producte"><br>

                <!--IMATGE-->
                <label for="imatge_producte" class="form-label">Imatge</label>
                <input type="text" class="form-control" id="imatge_producte" name="imatge"
                    placeholder="Introduexi la imatge del producte"><br>

                <!--BUTTONS-->
                <input type="submit" value="Crear producte" class="btn btn-success my-2" />
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