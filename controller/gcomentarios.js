import { pool } from "../config/db.js";

export const createComment = async (req, res) =>{

    const { comentario, id_usuarios, id_publicaciones, fecha_comentario } = req.body;

    try {
        const result = await pool.execute(
            'INSERT INTO comentarios (comentario, id_usuarios, id_publicaciones, fecha_comentario) VALUES (?, ?, ?, ?)',
            [comentario, id_usuarios, id_publicaciones, fecha_comentario]
        );

        res.status(201).json({ message: 'Comentario creada correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ message: 'Error al crear comentario' });
    }
}

export const updateComment = async (req, res) =>{

    const { id_comentarios } = req.params;
    const { comentario, id_usuarios, id_publicaciones, fecha_comentario } = req.body;

    try {
        const result = await pool.execute(
            'UPDATE comentarios SET comentario = ?, id_usuarios = ?, id_publicaciones = ?, fecha_comentario = ? WHERE id_comentarios = ?',
            [comentario, id_usuarios, id_publicaciones, fecha_comentario, id_comentarios]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'comentario no encontrado' });
        }

        res.json({ message: 'Comentario actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ message: 'Error al actualizar comentario' });
    }
    
}

export const deleteComment = async (req, res) =>{

    const { id_comentarios } = req.params;

    try {
        const result = await pool.execute('DELETE FROM comentarios WHERE id_comentarios = ?', [id_comentarios]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comentario no encontrada' });
        }

        res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar la comentario:', error);
        res.status(500).json({ message: 'Error al eliminar la comentario' });
    }
    
}