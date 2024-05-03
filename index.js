import express from 'express'
import { PORT } from './config/config.js'

import { myuser , allUsers , createUser, updateUser , deleteUser } from './controller/gcuentas.js'
import { filter } from './controller/admin.js'
import { viewPosts , createPost , titlePosts , updatePost , deletePost , postsCategories } from './controller/gpublicaciones.js'
import { allCategories, createCategory, updateCategory, deleteCategory } from './controller/gcategorias.js'
import { createComment, updateComment, deleteComment } from './controller/gcomentarios.js'
import { swaggerDocs } from './swagger.js'


const app = express()
app.use(express.json())


//GESTION DE CUENTAS 
app.get('/api/usuario/:id_usuarios', myuser);
app.get('/api/usuarios/:id_usuarios',filter, allUsers );// SOLO ADMIN
app.post('/api/newuser', createUser);
app.put('/api/modifyuser/:id_usuarios', updateUser);
app.delete('/api/deleteuser/:id_usuarios', deleteUser);


//GESTION DE PUBLICACIONES
app.get('/api/viewposts', viewPosts );
app.get('/api/viewposts/title/:titulo', titlePosts);
app.get('/api/viewposts/categories/:id_categorias', postsCategories);
app.post('/api/createpost', createPost );
app.put('/api/updatepost/:id_publicaciones', updatePost );
app.delete('/api/deletepost/:id_publicaciones', deletePost);

//GESTION DE COMENTARIOS
app.post('/api/newcomment', createComment );
app.put('/api/modifycomment/:id_comentarios', updateComment);
app.delete('/api/deletecomment/:id_comentarios', deleteComment );

//GESTION DE CATEGORIAS - SOLO ADMIN

app.get('/api/categories/:id_usuarios',filter,allCategories );
app.post('/api/createcategories/:id_usuarios',filter, createCategory);
app.put('/api/modifycategories/:id_usuarios/:id_categorias',filter,updateCategory );
app.delete('/api/deletecategories/:id_usuarios/:id_categorias',filter,deleteCategory );

swaggerDocs(app)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api-docs`))
