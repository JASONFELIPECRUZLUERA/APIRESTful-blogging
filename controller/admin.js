import { pool } from '../config/db.js';
import express from 'express';

export const filter = async (req, res, next) => {
    try {
        const { id_usuarios } = req.params;
        const [usuario] = await pool.execute('SELECT * FROM usuarios WHERE id_usuarios = ?', [id_usuarios]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { id_roles } = usuario[0];

        if (id_roles !== 1) {
            return res.status(403).json({ message: 'Acceso denegado: No permitido' });
        }

        next();
    } catch (error) {
        console.error('Error al filtrar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
