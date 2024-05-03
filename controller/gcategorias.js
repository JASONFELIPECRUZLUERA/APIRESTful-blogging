import { pool } from '../config/db.js'


//MOSTRAR TODAS LAS CATEGORIAS
export const allCategories = async (req, res) => {
  try {
      const listCategories = await pool.query('SELECT * FROM categorias');
      console.log('Consulta exitosa. Resultados:', listCategories);
      res.end(JSON.stringify(listCategories));
  } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error al obtener la lista de usuarios' }));
  }
}

//CREAR UNA NUEVA CATEGORIA
export const createCategory = async (req, res) => {

  const { categoria_nombre } = req.body;

  try {
      const result = await pool.execute(
          'INSERT INTO categorias (categoria_nombre) VALUES (?)',
          [categoria_nombre]
      );

      res.status(201).json({ message: 'Categoria creada correctamente', id: result.insertId });
  } catch (error) {
      console.error('Error al crear categoria:', error);
      res.status(500).json({ message: 'Error al crear categoria' });
  }
}

//MODIFICAR UNA CATEGORIA POR SU ID
export const updateCategory = async (req,res) => {

  const { id_categorias } = req.params;
    const { categoria_nombre } = req.body;

    try {
        const result = await pool.execute(
            'UPDATE categorias SET categoria_nombre = ? WHERE id_categorias = ?',
            [categoria_nombre, id_categorias]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }

        res.json({ message: 'Categoria actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ message: 'Error al actualizar la categoria' });
    }

}

//ELIMINAR UNA CATEGORIA POR SU ID
export const deleteCategory = async (req,res) => {

  const { id_categorias } = req.params;

    try {
        const result = await pool.execute('DELETE FROM categorias WHERE id_categorias = ?', [id_categorias]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.json({ message: 'Categoria eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ message: 'Error al eliminar la categoria' });
  }
}