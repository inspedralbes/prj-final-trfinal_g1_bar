@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
    <form  method="POST" action="{{ route('categoriesUpdate', ['id' => $categoria->id]) }}">
        @method('PUT')
        @csrf

        <div class="mb-3 col">

            <label for="nom_categoria" class="form-label">Nom</label>
            <input type="text" class="form-control mb-2" name="nom" id="nom_categoria" placeholder="Introduexi el nom de la categoria" value="{{ $categoria->nom }}">
            <label for="imatge_categoria" class="form-label">Imatge</label>
            <input type="text" class="form-control mb-2" name="imatge" id="imatge_categoria" placeholder="Introduexi la imatge de la categoria" value="{{ $categoria->imatge }}">

            <input type="submit" value="Actualitzar categoria" class="btn btn-warning my-2" />
            <div style="display: inline-block; margin-top: 10px; float: right;">
                <a href="{{ route('categoriesIndex') }}" class="btn btn-danger">
                    Cancel·lar
                </a>
            </div>

        </div>
    </form>

    
    </div>
</div>

@endsection