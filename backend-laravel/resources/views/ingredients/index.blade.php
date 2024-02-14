@extends('app')

@section('content')

<div class="categories-container">
    @if (session('success'))
        <div class="alert alert-success position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
            {{ session('success') }}
        </div>
    @endif

    <div class="nav-buttons-container mb-3">
        <a href="{{ route('ingredientsStore') }}" class="btn btn-success">Crear Ingredient</a>
        <form method="GET" action="{{ route('ingredientsIndexSearch') }}" class="d-flex">
            @method('GET')
            @csrf

            <input class="form-control me-2" list="datalistOptions" type="text" name="search" placeholder="Buscar categoria">
            <datalist id="datalistOptions">
            @foreach ($ingredients as $ingredient)
                <option value="{{ $ingredient->nom }}">
            @endforeach       
            </datalist>
            <button class="btn btn-outline-primary" type="submit">Buscar</button>
        </form>
    </div>

    <div>
        <table class="table table-striped table-hover align-middle text-center">
            <tr class="table-dark">
                <th>ID</th>
                <th>Nom</th>
                <th></th>
            </tr>
            @foreach ($ingredients as $ingredient)

            <!-- Modal -->
            <div class="modal fade" id="exampleModal{{$ingredient->id}}" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Segur que vols eliminar l'ingredient <strong>{{ $ingredient->nom }}</strong> ?</h1>
                        </div>
                        <form action="{{ route('ingredientsDestroy', ['id' => $ingredient->id]) }}" method="POST">
                            @method('DELETE')
                            @csrf
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel·lar</button>
                                <button class="btn btn-danger">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <tr>
                <td>{{ $ingredient->id }}</td>
                <td>{{ $ingredient->nom }}</td>
                <td>
                    <div class="d-flex flex-row flex-nowrap justify-content-center gap-2">
                        <a href="{{ route('ingredientsShow', ['id' => $ingredient->id]) }}" class="btn btn-warning">Editar</a>
                        <button type="button" class="btn btn-danger modalEliminar" data-bs-toggle="modal" data-bs-target="#exampleModal{{$ingredient->id}}" value="{{$ingredient->id}}">
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
            @endforeach
        </table>
    </div>
</div>

<script>
    // CODI PER A QUE QUAN OBRIM EL MODAL D'ELIMINAR CATEGORIA
    // EL CHECKBOX DE ELIMINAR PREGUNTES ES DESMARQUI
    const modalEliminar = document.querySelectorAll('.modalEliminar');

    modalEliminar.forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById("flexCheckDefault" + btn.value).checked = false;
        });
    });

</script>

@endsection