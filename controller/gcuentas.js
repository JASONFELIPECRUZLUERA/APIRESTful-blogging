import { pool } from '../config/db.js';

//VER TODOS LOS USUARIOS REGISTRADOS
export const allUsers = async (req, res) => {
    try {
        const userlist = await pool.query('SELECT * FROM usuarios');
        console.log('Consulta exitosa. Resultados:', userlist);
        res.end(JSON.stringify(userlist));
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error al obtener la lista de usuarios' }));
    }
}

//VER LA INFO DE TU MISMO USUARIO 
export const myuser = async (req, res) => {
    const { id_usuarios } = req.params;

    if (!id_usuarios) {
        return res.status(400).json({ message: 'Usuario no identificado' })
    }

    try {
        const [usuario] = await pool.execute('SELECT * FROM usuarios WHERE id_usuarios = ?', [id_usuarios]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario[0]);
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// CREAR UN NUEVO USUARIO
export const createUser = async (req, res) => {

    // Extraer datos del cuerpo de la solicitud
    const { usuario_nombre, email, password, id_roles } = req.body;

    try {
        const result = await pool.execute(
            'INSERT INTO usuarios (usuario_nombre, email, password, id_roles) VALUES (?, ?, ?, ?)',
            [usuario_nombre, email, password, id_roles]
        );

        res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

//MOFICIAR UN USUARIO BUSCANDOLO POR NOMBRE_USUARIO EN LA URL
export const updateUser = async (req, res) => {
   
    const { id_usuarios } = req.params;
    const { usuario_nombre, email, password, id_roles } = req.body;

    try {
        const result = await pool.execute(
            'UPDATE usuarios SET usuario_nombre = ?, email = ?, password = ?, id_roles = ? WHERE id_usuarios = ?',
            [usuario_nombre, email, password, id_roles, id_usuarios]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Datos de usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar datos de usuario:', error);
        res.status(500).json({ message: 'Error al actualizar datos de usuario' });
    }
};

//ELIMINAR UN USUARIO 
export const deleteUser = async (req, res) => {
    const { id_usuarios } = req.params;

    try {
        const result = await pool.execute('DELETE FROM usuarios WHERE id_usuarios = ?', [id_usuarios]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};