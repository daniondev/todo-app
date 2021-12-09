import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({agregarTodo}) => {

    const initialState = {
        nombre: 'Tarea 1',
        descripcion: 'Descripción RANDOM',
        estado: 'pendiente',
        prioridad: false
    };

    const [inputs, handleChange, reset] = useFormulario(initialState)

    const {nombre, descripcion, estado, prioridad} = inputs;

    const handleSubmit = e => {
        e.preventDefault();
        
        if(!nombre.trim()){
            e.target[0].focus(); // El orden es segun esten en el formulario 0,1,2...
            Swal.fire({
                title: '¡Oops!',
                text: '¡El nombre no puede estar vacio!',
                icon: 'warning'
            });
            return;
        }

        if(!descripcion.trim()){
            e.target[1].focus(); // El orden es segun esten en el formulario 0,1,2...
            Swal.fire({
                title: '¡Oops!',
                text: '¡La descripción no puede estar vacia!',
                icon: 'warning'
            });
            return;
        }

        Swal.fire({
            title: '¡Genial!',
            text: '¡Se ha agregado un nuevo TODO!',
            icon: 'success'
        });

        agregarTodo({
            nombre,
            descripcion,
            estado: estado === 'pendiente' ? false : true,
            prioridad,
            id: uuidv4()
        });

        reset(initialState);
    };

    return (
        <>
            <h3>Agregar TODO</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="nombre"
                    placeholder="Ingrese TODO nombre"
                    value={nombre}
                    onChange={handleChange}
                />
                <textarea                  
                    className="form-control mb-2"
                    name="descripcion"
                    placeholder="Ingrese descripción"
                    value={descripcion}
                    onChange={handleChange}
                />
                <select
                    name="estado"
                    className="form-control mb-2"
                    value={estado}
                    onChange={handleChange}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                </select>
                <div className="form-check">
                    <input
                        id="flexCheckDefault"
                        className="form-check-input"
                        type="checkbox"
                        name="prioridad"
                        checked={prioridad}
                        onChange={handleChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                    >
                        Prioritario
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Agregar
                </button>
            </form>
        </>
    )
}

export default Formulario
