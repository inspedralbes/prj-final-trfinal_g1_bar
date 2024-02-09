@extends('app')

@section('content')

<div class="categories-container">
    @if (session('success'))
        <div class="alert alert-success position-absolute top-1" style="width: fit-content; left: 50%; transform: translate(-50%)" role="alert">
            {{ session('success') }}
        </div>
    @endif

    <div class="nav-buttons-container mb-3">
        <a href="{{ route('productesStore') }}" class="btn btn-success">Crear Producte</a>
        <form method="GET" action="{{ route('productesIndexSearch') }}" class="d-flex">
            @method('GET')
            @csrf

            <input class="form-control me-2" type="text" name="search" placeholder="Buscar producte">
            <button class="btn btn-outline-primary" type="submit">Buscar</button>
        </form>
    </div>

    <div>
        <table class="table table-striped table-hover align-middle text-center">
            <tr class="table-dark">
                <th>ID</th>
                <th>Nom</th>
                <th>Preu</th>
                <th></th>
            </tr>
            @foreach ($productes as $producte)

            <!-- Modal -->
            <div class="modal fade" id="exampleModal{{$producte->id}}" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Segur que vols eliminar el producte {{
                                $producte->nom }}?</h1>
                        </div>
                        <form action="{{ route('productesDestroy', ['id' => $producte->id]) }}" method="POST">
                            @method('DELETE')
                            @csrf
                            <div class="modal-body">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="true" name="eliminar_preg"
                                        id="flexCheckDefault{{$producte->id}}">
                                    <label class="form-check-label" for="flexCheckDefault{{$producte->id}}">
                                        Eliminar tots els ingredients d'aquest producte
                                    </label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel·lar</button>
                                <button class="btn btn-danger">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <tr>
                <td>{{ $producte->id }}</td>
                <td>{{ $producte->nom }}</td>
                <td>{{ $producte->preu }}</td>
                <td>
                    <div class="d-flex flex-row flex-nowrap justify-content-center gap-2">
                        <a href="{{ route('productesShow', ['id' => $producte->id]) }}" class="btn btn-warning">Editar</a>
                        <button type="button" class="btn btn-danger modalEliminar" data-bs-toggle="modal" data-bs-target="#exampleModal{{$producte->id}}" value="{{$producte->id}}">
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
    // CODI PER A QUE QUAN OBRIM EL MODAL D'ELIMINAR PRODUCTE
    // EL CHECKBOX DE ELIMINAR PREGUNTES ES DESMARQUI
    const modalEliminar = document.querySelectorAll('.modalEliminar');

    modalEliminar.forEach(btn => {
        btn.addEventListener('click', function () {
            document.getElementById("flexCheckDefault" + btn.value).checked = false;
        });
    });

</script>

@endsection