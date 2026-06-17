drop database DBChapiDia_in5cm;
create database DBChapiDia_in5cm;
use DBChapiDia_in5cm;

create table Usuario (
	idUsuario int auto_increment not null,
    nombre varchar (50) not null,
    email varchar (30) not null,
    contrasena varchar (20) not null,
    rol enum('fotografo', 'Cliente') not null,
    primary key PK_idUsuario (idUsuario)
);

create table Categoria (
	idCategoria int auto_increment not null,
    nombreCategoria varchar (30) not null,
    descripcion varchar (100) not null,
    primary key PK_idCategoria (idCategoria)
);

create table Likes (
	idLike int auto_increment not null,
    tipo enum('Noticia', 'Comentario') not null,
    idTipo int not null,
    idUsuario int not null,
    primary key PK_idLike (idLike),
    constraint FK_idUsuario foreign key (idUsuario)
		references Usuario (idUsuario) on delete cascade
);

create table Noticia (
	idNoticia int auto_increment not null,
    titulo varchar (75) not null,
    contenido varchar (250) not null,
    fechaNoticia date,
    imagenNoticia varchar (100) not null,
    estado enum ('Activo', 'Archivado') not null,
    idUsuario int not null,
    idCategoria int not null,
    primary key PK_idNoticia (idNoticia),
    constraint FK_idUsuarios foreign key (idUsuario)
		references Usuario (idUsuario) on delete cascade,
	constraint FK_idCategoria foreign key (idCategoria)
		references Categoria (idCategoria) on delete cascade
);

create table Comentario (
	idComentario int auto_increment not null,
    texto varchar (250) not null,
    fecha date not null,
    fechaModificacion date not null,
    idUsuario int not null,
    idNoticia int not null,
    primary key PK_idComentario (idComentario),
    constraint FK_id_Usuarios foreign key (idUsuario)
		references Usuario (idUsuario) on delete cascade,
	constraint FK_idNoticia foreign key (idNoticia)
		references Noticia (idNoticia) on delete cascade
);

-- Procesos almacenados

-- Usuario
-- Create
delimiter $$
create procedure sp_usuario_create (
	in p_nombre varchar (50),
    in p_email varchar (30),
    in p_contrasena varchar (20),
	in p_rol enum ('fotografo', 'Cliente'))
begin
	insert into Usuario (nombre, email, contrasena, rol)
		values (p_nombre, p_email, p_contrasena, p_rol);
end $$
delimiter ;

-- Read
delimiter $$
create procedure sp_usuario_read_all ()
begin
	select * from Usuario order by idUsuario;
end $$
delimiter ;

-- Update
delimiter $$
create procedure sp_usuario_update (
	in p_idUsuario int,
	in p_nombre varchar (50),
    in p_email varchar (30),
    in p_contrasena varchar (20),
	in p_rol enum ('fotografo', 'Cliente'))
begin
	update Usuario
    set nombre = p_nombre,
        email = p_email,
        contrasena = p_contrasena,
        rol = p_rol
	where idUsuario = p_idUsuario;
end $$
delimiter ;

-- Delete
delimiter $$
create procedure sp_usuario_delete (in p_idUsuario int)
begin
	delete from Usuario where idUsuario = p_idUsuario;
end $$
delimiter ;

-- Categoria
-- Create
delimiter $$
create procedure sp_categoria_create (
	in p_nombreCategoria varchar (30),
    in p_descripcion varchar (100))
begin
	insert into Categoria (nombreCategoria, descripcion)
		values (p_nombreCategoria, p_descripcion);
end $$
delimiter ;

-- Read
delimiter $$
create procedure sp_categoria_read_all ()
begin
	select * from Categoria order by idCategoria;
end $$
delimiter ;

-- Update
delimiter $$
create procedure sp_categoria_update (
	in p_idCategoria int,
	in p_nombreCategoria varchar (30),
    in p_descripcion varchar (100))
begin
	update Categoria
    set nombreCategoria = p_nombreCategoria,
        descripcion = p_descripcion
	where idCategoria = p_idCategoria;
end $$
delimiter ;

-- Delete
delimiter $$
create procedure sp_categoria_delete (in p_idCategoria int)
begin
	delete from Categoria where idCategoria = p_idCategoria;
end $$
delimiter ;

-- Likes
-- Create
delimiter $$
create procedure sp_likes_create (
	in p_tipo enum('Noticia', 'Comentario'),
    in p_idTipo int,
    in p_idUsuario int)
begin
	insert into Likes (tipo, idTipo, idUsuario)
		values (p_tipo, p_idTipo, p_idUsuario);
end $$
delimiter ;

-- Read
delimiter $$
create procedure sp_likes_read_all ()
begin
	select * from Likes order by idLike;
end $$
delimiter ;

-- Update
delimiter $$
create procedure sp_likes_update (
	in p_idLike int,
	in p_tipo enum ('Noticia', 'Comentario'),
	in p_idTipo int,
    in p_idUsuario int)
begin
	update Likes
    set tipo = p_tipo,
        idTipo = p_idTipo,
        idUsuario = p_idUsuario
	where idLike = p_idLike;
end $$
delimiter ;

-- Delete
delimiter $$
create procedure sp_likes_delete (in p_idLike int)
begin
	delete from Likes where idLike = p_idLike;
end $$
delimiter ;

-- Noticia
-- Create
delimiter $$
create procedure sp_noticia_create (
	in p_titulo varchar (75),
    in p_contenido varchar (250),
    in p_fechaNoticia date,
    in p_imagenNoticia varchar (100),
    in p_estado enum ('Activo', 'Archivado'),
    in p_idUsuario int,
    in idCategoria int)
begin
	insert into Noticia (titulo, contenido, fechaNoticia, imagenNoticia, estado, idUsuario, idCategoria)
		values (p_titulo, p_contenido, p_fechaNoticia, p_imagenNoticia, p_estado, p_idUsuario, idCategoria);
end $$
delimiter ;

-- Read
delimiter $$
create procedure sp_noticia_read_all ()
begin
	select * from Noticia order by idNoticia;
end $$
delimiter ;

-- Update
delimiter $$
create procedure sp_noticia_update (
	in p_idNoticia int,
	in p_titulo varchar (75),
    in p_contenido varchar (250),
    in p_fechaNoticia date,
    in p_imagenNoticia varchar (100),
    in p_estado enum ('Activo', 'Archivado'),
    in p_idUsuario int,
    in p_idCategoria int)
begin
	update Noticia
    set titulo = p_titulo,
        contenido = p_contenido,
        fechaNoticia = p_fechaNoticia,
        imagenNoticia = p_imagenNoticia,
        estado = p_estado,
        idUsuario = p_idUsuario,
        idCategoria = p_idCategoria
	where idNoticia = p_idNoticia;
end $$
delimiter ;

-- Delete
delimiter $$
create procedure sp_noticia_delete (in p_idNoticia int)
begin
	delete from Noticia where idNoticia = p_idNoticia;
end $$
delimiter ;

-- Comentario
-- Create
delimiter $$
create procedure sp_comentario_create (
	in p_texto varchar (250),
    in p_fecha date,
    in p_fechaModificacion date,
	in p_idUsuario int,
    in p_idNoticia int)
begin
	insert into Comentario (texto, fecha, fechaModificacion, idUsuario, idNoticia)
		values (p_texto, p_fecha, p_fechaModificacion, p_idUsuario, p_idNoticia);
end $$
delimiter ;

-- Read
delimiter $$
create procedure sp_comentario_read_all ()
begin
	select * from Comentario order by idComentario;
end $$
delimiter ;

-- Update
delimiter $$
create procedure sp_comentario_update (
	in p_idComentario int,
	in p_texto varchar (250),
    in p_fecha date,
    in p_fechaModificacion date,
	in p_idUsuario int,
    in p_idNoticia int)
begin
	update Comentario
    set texto = p_texto,
        fecha = p_fecha,
        fechaModificacion = p_fechaModificacion,
        idUsuario = p_idUsuario,
        idNoticia = p_idNoticia
	where idComentario = p_idComentario;
end $$
delimiter ;

-- Delete
delimiter $$
create procedure sp_comentario_delete (in p_idComentario int)
begin
	delete from Comentario where idComentario = p_idComentario;
end $$
delimiter ;

-- Datos
call sp_usuario_create('Juan Pérez', 'juan@gmail.com', 'juan123', 'Cliente');
call sp_usuario_create('María López', 'maria@gmail.com', 'maria456', 'Cliente');
call sp_usuario_create('Carlos Méndez', 'carlos@gmail.com', 'carlos789', 'fotografo');
call sp_usuario_create('Ana García', 'ana@gmail.com', 'ana321', 'Cliente');
call sp_usuario_create('Luis Ramírez', 'luis@gmail.com', 'luis654', 'fotografo');

call sp_categoria_create('Naturaleza', 'Fotografías de paisajes y fauna');
call sp_categoria_create('Deportes', 'Noticias relacionadas con eventos deportivos');
call sp_categoria_create('Tecnología', 'Avances y novedades tecnológicas');
call sp_categoria_create('Cultura', 'Actividades culturales y artísticas');
call sp_categoria_create('Turismo', 'Lugares turísticos y recomendaciones');

call sp_likes_create('Noticia', 1, 1);
call sp_likes_create('Noticia', 2, 2);
call sp_likes_create('Comentario', 1, 3);
call sp_likes_create('Comentario', 2, 4);
call sp_likes_create('Noticia', 3, 5);

call sp_noticia_create('Atardecer en Antigua', 'Se capturaron impresionantes fotografías del atardecer.', '2026-06-17', 'atardecer.jpg', 'Activo', 3, 1);
call sp_noticia_create('Maratón Internacional', 'Cientos de atletas participaron en el evento.', '2026-06-18', 'maraton.jpg', 'Activo', 1, 2);
call sp_noticia_create('Nueva Cámara Profesional', 'Se presentó un nuevo modelo de cámara digital.','2026-06-19', 'camara.jpg','Activo', 5, 3);
call sp_noticia_create('Festival Cultural', 'Artistas nacionales participaron en diversas actividades.', '2026-06-20', 'festival.jpg', 'Archivado', 2, 4);
call sp_noticia_create('Destino Turístico del Año', 'Un nuevo destino se posiciona entre los más visitados.', '2026-06-21', 'turismo.jpg', 'Activo', 4, 5);

call sp_comentario_create('Excelente reportaje fotográfico.', '2026-06-17', '2026-06-17', 1, 1);
call sp_comentario_create('Muy interesante la información.', '2026-06-18', '2026-06-18', 2, 2);
call sp_comentario_create('Las fotografías son impresionantes.', '2026-06-19', '2026-06-19', 3, 3);
call sp_comentario_create('Me gustaría asistir al próximo evento.', '2026-06-20', '2026-06-20', 4, 4);
call sp_comentario_create('Gracias por compartir esta noticia.', '2026-06-21', '2026-06-21', 5, 5);