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

CREATE OR REPLACE PROCEDURE public.guardar_documento(
			p_correo character varying,
			p_descripcion character varying,
			p_nombre_docuemnto character varying,
			p_URL character varying
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	insert into documentos(
							correo,
							url_documento,
							descripcion,
							nombre_documento,
							url_documento_firmado
						)values
						(
						p_correo ,
						p_URL,
						p_descripcion,
						p_nombre_docuemnto,
						''
						);

	EXCEPTION
        -- Si ocurre un error en la transacción principal, revertir
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE EXCEPTION 'Ha ocurrido un error en la transacción principal: %', SQLERRM;	
END;
$procedure$
;



--funcion para listar los documentos segun el correo del usuario 

select * from documentos_usuario('raulshide02@gmail.com');

CREATE OR REPLACE FUNCTION public.documentos_usuario(p_correo character varying)
 RETURNS TABLE(
	r_id_documento int,
	r_url_documento character varying,
	r_descripcion character varying,
	r_nombre_documento character varying,
	r_url_documento_firmado character varying,
	r_estado bool
 )
 LANGUAGE plpgsql
AS $function$
begin
	return query
	--verificar si existe el usuario 
select d.id_documento ,d.url_documento ,d.descripcion,d.nombre_documento,d.url_documento_firmado ,d.estado  from documentos d where d.correo =p_correo;
	end;
$function$
;

--funcion que devuele la url del pdf para renderizarlo xd segun el id 
--ver_pdf
select * from ver_pdf(1,true);
--nuevo identificador para ver si se quiere ver el documento firmado o el original xd 
drop  FUNCTION public.ver_pdf(p_id int)

CREATE OR REPLACE FUNCTION public.ver_pdf(p_id int,original bool)
 RETURNS TABLE(
	d_url character varying
 )
 LANGUAGE plpgsql
AS $function$
begin
	if original then 
		return query
		select d.descripcion  from documentos d where d.id_documento =p_id ;
	else 
	return query
		select d.url_documento_firmado  from documentos d where d.id_documento =p_id ;
	end if;
	
	end;
$function$
;

select  * from documentos


--crear un procedimiento para guardar el documento firmado xd 
CREATE OR REPLACE PROCEDURE public.FirmarDoc(
			p_id_docmento int,
			p_URL character varying
		)
LANGUAGE plpgsql
AS $procedure$

Begin
	
	--select * from documentos where id_documento =p_id_docmento;
	update documentos set url_documento_firmado =p_URL where id_documento =p_id_docmento;
	EXCEPTION
        -- Si ocurre un error en la transacción principal, revertir
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE EXCEPTION 'Ha ocurrido un error en la transacción principal: %', SQLERRM;	
END;
$procedure$
;


