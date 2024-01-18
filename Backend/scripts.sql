create table Usuarios(
	correo character varying not null unique,
	estado bool not null default true,
	primary key(correo)
);



select * from Usuarios;

---funcion para verificar si un usuario esta creado 
CREATE OR REPLACE FUNCTION public.Verification_Auth(p_correo character varying)
 RETURNS TABLE(
	verification bool
 )
 LANGUAGE plpgsql
AS $function$
begin
	return query
	--verificar si existe el usuario 
	select case when COUNT(*)>= 1 then true else false end from Usuarios where correo=p_correo;
	end;
$function$
;

select * from Verification_Auth('sss')2;

select* from Usuarios;

call crear_usuario('Juna xd');
--procedimineto almacenado para crear un usuario 
CREATE OR REPLACE PROCEDURE public.crear_usuario(
			p_correo character varying
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	insert into Usuarios(
	correo
						)values
						(
													p_correo

						);

COMMIT;
END;
$procedure$
;

--crear una tabla para almacenar los datos de los datos de los documentos 
--gmail de la persona
--nombre del archivo 
--fecha subida
--estadp
--firmado 
--url del firmado

create table documentos(
	id_documento INT GENERATED ALWAYS AS IDENTITY,
	correo character varying not null,
	url_documento character varying not null,
	descripcion character varying not null,
	nombre_documento character varying not null,
	url_documento_firmado character varying not null,
	estado bool not null default true,
	primary key(id_documento)
);

--crear una funcion que almacene los documentos xd 




