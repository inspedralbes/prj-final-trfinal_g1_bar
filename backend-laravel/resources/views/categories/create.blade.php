@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
        <form method="POST" action="{{ route('categoriesStore') }}">
            @method('POST')
            @csrf

            <div class="mb-3 col">
                <!--NOM-->
                <label for="nom_categoria" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom_categoria" name="nom" placeholder="Introduexi el nom de la categoria"><br>

                <!--IMATGE-->
                <label for="imatge_categoria" class="form-label">Imatge</label>
                <input type="text" class="form-control" id="imatge_categoria" name="imatge" placeholder="Introduexi la imatge de la categoria"><br>

                <!--BUTTONS-->
                <input type="submit" value="Crear categoria" class="btn btn-success my-2" />
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