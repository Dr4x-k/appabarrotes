create view viewUsuarios as
select us.nombres as 'Nombres', us.apellidoPaterno as 'Apellido Paterno',
    us.apellidoMaterno as 'Apellido Materno', us.usuario as 'Usuario',
    r.nombre as 'Rol'
from usuario as us
inner join rol as r
on r.idRol = us.fk_rol

select * from viewUsuarios