@extends('app')

@section('content')

@error('nom')
<div class="alert alert-danger position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
    El nom es obligatori
</div>
@enderror

<div class="container w-30 border p-4 mt-5">
    <div class="row mx-auto">
    <form  method="POST" action="{{ route('ingredientsUpdate', ['id' => $ingredient->id]) }}">
        @method('PUT')
        @csrf

        <div class="mb-3 col">

            <!--NOM-->
            <label for="nom_ingredient" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom_ingredient" name="nom" value="{{$ingredient->nom}}" placeholder="Introduexi el nom de l'ingredient" autocomplete="off"><br>

            <!--GLUTEN-->
            <div class="form-check form-switch mb-1">
                @if ($ingredient->gluten === 1)
                    <input class="form-check-input" name="gluten" type="checkbox" id="flexSwitchCheckDefaultGluten" value=1 checked="">
                @else
                    <input class="form-check-input" name="gluten" type="checkbox" id="flexSwitchCheckDefaultGluten" value=1>
                @endif

                <label class="form-check-label" for="flexSwitchCheckDefaultGluten">Gluten</label>
            </div>

            <!--LACTOSA-->
            <div class="form-check form-switch mb-1">
                @if ($ingredient->lactosa === 1)
                    <input class="form-check-input" name="lactosa" type="checkbox" id="flexSwitchCheckDefaultLactosa" value=1 checked="">
                @else
                    <input class="form-check-input" name="lactosa" type="checkbox" id="flexSwitchCheckDefaultLactosa" value=1>
                @endif

                <label class="form-check-label" for="flexSwitchCheckDefaultLactosa">Lactosa</label>
            </div>

            <!--FRUITS SECS-->
            <div class="form-check form-switch mb-1">
                @if($ingredient->fruits_secs === 1)
                <input class="form-check-input" name="fruits_secs" type="checkbox" id="flexSwitchCheckDefaultFruitsSecs" value=1 checked="">
                @else
                    <input class="form-check-input" name="fruits_secs" type="checkbox" id="flexSwitchCheckDefaultFruitsSecs" value=1>
                @endif

                <label class="form-check-label" for="flexSwitchCheckDefaultFruitsSecs">Fruits Secs</label>
            </div>

            <!--VEGETARIANA-->
            <div class="form-check form-switch mb-1">
                @if($ingredient->vegetariana === 1)
                    <input class="form-check-input" name="vegetariana" type="checkbox" id="flexSwitchCheckDefaultVegetariana" value=1 checked="">
                @else
                    <input class="form-check-input" name="vegetariana" type="checkbox" id="flexSwitchCheckDefaultVegetariana" value=1>
                @endif
                
                <label class="form-check-label" for="flexSwitchCheckDefaultVegetariana">Vegetariana</label>
            </div>

            <!--VEGANA-->
            <div class="form-check form-switch mb-3">
                @if($ingredient->vegana === 1)
                    <input class="form-check-input" name="vegana" type="checkbox" id="flexSwitchCheckDefaultVegana" value=1 checked="">
                @else
                    <input class="form-check-input" name="vegana" type="checkbox" id="flexSwitchCheckDefaultVegana" value=1>
                @endif

                <label class="form-check-label" for="flexSwitchCheckDefaultVegana">Vegana</label>
            </div>
            

            <input type="submit" value="Actualitzar categoria" class="btn btn-warning my-2" />
            <div style="display: inline-block; margin-top: 10px; float: right;">
                <a href="{{ route('ingredientsIndex') }}" class="btn btn-danger">
                    Cancel·lar
                </a>
            </div>

        </div>
    </form>
    </div>
</div>

@endsection