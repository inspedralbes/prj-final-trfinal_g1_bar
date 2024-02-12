@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
    <form  method="POST" action="{{ route('productesUpdate', ['id' => $producte->id]) }}">
        @method('PUT')
        @csrf

        <div class="mb-3 col">

            <label for="nom_producte" class="form-label">Nom</label>
            <input type="text" class="form-control mb-2" name="nom" id="nom_producte" placeholder="Introduexi el nom del producte" value="{{ $producte->nom }}">

            <div class="form-check form-switch">
                <label class="form-check-label" for="esActiu_producte">Producte actiu</label>
                <input class="form-check-input" type="checkbox" role="switch" name="esActiu" id="esActiu_producte" value="1" {{  ($producte->actiu == 1 ? ' checked' : '') }}>
            </div>

            <label for="categoria_producte" class="form-label">Categoria del producte</label>
            <select id="categoria_producte" name="categoria" class="form-select">
                @foreach ($categories as $category)
                    @if ($category->id == $producte->categoria_id)
                        <option value="{{$category->id}}" selected>{{$category->nom}}</option>
                    @else
                        <option value="{{$category->id}}">{{$category->nom}}</option>
                    @endif
                @endforeach
            </select><br>

            <label for="descripcio_producte" class="form-label">Descripcio</label>
            <input type="text" class="form-control mb-2" id="descripcio_producte" name="descripcio" placeholder="Introduexi la descripció del producte" value="{{ $producte->descripcio }}">

            <label for="preu_producte" class="form-label">Preu</label>
            <input type="number" class="form-control mb-2" id="preu_producte" name="preu" step=".01" required placeholder="Introduexi el preu del producte" value="{{ $producte->preu }}">

            <label for="imatge_producte" class="form-label">Imatge</label>
            <input type="text" class="form-control mb-2" name="imatge" id="imatge_producte" placeholder="Introduexi la imatge del producte" value="{{ $producte->imatge }}">

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