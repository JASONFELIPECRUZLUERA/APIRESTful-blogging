import { pool } from '../config/db.js';

export const viewPosts = async (req,res)=>{
    try {
        const [publicaciones] = await pool.execute('SELECT * FROM publicaciones');
        res.json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
}

export const titlePosts = async (req,res)=>{

    const { titulo } = req.params;
    try {
        const [publicacion] = await pool.execute('SELECT * FROM publicaciones WHERE titulo = ?', [titulo]);

        if (publicacion.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.json(publicacion[0]);
    } catch (error) {
        console.error('Error al obtener la publicación:', error);
        res.status(500).json({ message: 'Error al obtener la publicación' });
    }

}

export const postsCategories = async (req,res)=>{

    const { id_categorias } = req.params; // Obtén el id_categorias desde los parámetros de la URL

    try {
        // Consulta SQL para obtener las publicaciones relacionadas con la categoría especificada
        const query = `
            SELECT p.id_publicaciones, p.titulo, p.contenido, p.id_usuarios, p.fecha_publicacion
            FROM publicaciones p
            INNER JOIN categorias_publicaciones cp ON p.id_publicaciones = cp.id_publicaciones
            WHERE cp.id_categorias = ?
        `;

        const [rows] = await pool.execute(query, [id_categorias]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron publicaciones para esta categoría' });
        }

        // Devuelve las publicaciones relacionadas con la categoría especificada
        res.json({ publicaciones: rows });
    } catch (error) {
        console.error('Error al obtener las publicaciones por categoría:', error);
        res.status(500).json({ message: 'Error al obtener las publicaciones por categoría' });
    }
}

export const createPost = async (req,res)=>{

    const { titulo, contenido, id_usuarios, fecha_publicacion } = req.body;

    try {
        const result = await pool.execute(
            'INSERT INTO publicaciones (titulo, contenido, id_usuarios, fecha_publicacion) VALUES (?, ?, ?, ?)',
            [titulo, contenido, id_usuarios, fecha_publicacion]
        );

        res.status(201).json({ message: 'Publicación creada correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ message: 'Error al crear la publicación' });
    }

}

export const updatePost = async (req,res)=>{

    const { id_publicaciones } = req.params;
    const { titulo, contenido, id_usuarios, fecha_publicacion } = req.body;

    try {
        const result = await pool.execute(
            'UPDATE publicaciones SET titulo = ?, contenido = ?, id_usuarios = ?, fecha_publicacion = ? WHERE id_publicaciones = ?',
            [titulo, contenido, id_usuarios, fecha_publicacion, id_publicaciones]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.json({ message: 'Publicación actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la publicación:', error);
        res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
}

export const deletePost = async (req,res)=>{

    const { id_publicaciones } = req.params;

    try {
        const result = await pool.execute('DELETE FROM publicaciones WHERE id_publicaciones = ?', [id_publicaciones]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.json({ message: 'Publicación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
}
