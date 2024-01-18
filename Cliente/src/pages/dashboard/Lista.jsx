import { useState, useEffect } from "react";

import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = [
  "ID",
  "Descripcion",
  "Nombre",

  "Documento firmado",
  "Estado",
  "Ver",

  "Eliminar",
];
import { Loader } from "@/widgets";

import { Editar } from "@/pages/dashboard";
import Cookies from "universal-cookie";
import { VisorPDF } from "@/pages/dashboard";
export default function Lista() {
  const [Loading, setLoading] = useState(false);

  //stado para ver el fomulario de crear persona
  const [verEditar, setVerEditar] = useState(false);
  const [idEditar, setIdEditar] = useState(false);
  const cookies = new Cookies();

  const CerrarEditar = () => {
    setVerEditar(false);
    ObtenerListaDocumentos();
  };
  //crear un useEffect que cargue la lista de los docuemntos obteniendo el correo de la cookie
  //decodeURIComponent(cookies.get("email"))
  const [Lista, setLista] = useState([]);
  useEffect(() => {
    ObtenerListaDocumentos();
    //else buscar_por_id
  }, []);
  //funcion para hacer la peticion y obtener los datos de la pregunta
  const ObtenerListaDocumentos = async () => {
    //alert(id_pregunta + " " + buscar + " " + id_nivel);
    setLoading(true);

    try {
      //alert("Buscando");
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "docs/ListaDocs/" +
          decodeURIComponent(cookies.get("email")),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      setLista(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Error");
      console.log(error);
    }
  };
  //estado para ver el visor del pdf
  const [visor, setVisor] = useState(false);
  const CerrarVisor = () => {
    setVisor(false);
  };
  const [urlDoc, setUrlDoc] = useState("");
  return (
    <>
      {Loading && <Loader />}
      {visor && <VisorPDF URLDOC={urlDoc} cerrar={CerrarVisor} />}
      {verEditar && <Editar Cerrar={CerrarEditar} ID={idEditar} />}
      {Lista.length === 0 ? (
        <Typography
          variant="h2"
          color="blue-gray"
          className="font-normal leading-none opacity-70 mx-auto"
        >
          No tiene documentos guardados
        </Typography>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>

          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Lista.map(
                (
                  {
                    r_id_documento,
                    r_url_documento,
                    r_descripcion,
                    r_nombre_documento,
                    r_url_documento_firmado,
                    r_estado,
                  },
                  index
                ) => {
                  const isLast = index === Lista.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={r_id_documento}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {r_nombre_documento}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {r_url_documento}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          {r_url_documento_firmado ? (
                            <Tooltip content="Ver Documento Firmado">
                              <IconButton
                                variant="text"
                                onClick={() => (
                                  setUrlDoc(
                                    process.env.NEXT_PUBLIC_ACCESLINK +
                                      "docs/VerPDF/" +
                                      r_id_documento +
                                      "/" +
                                      false
                                  ),
                                  setVisor(true)
                                )}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip content="Firmar documento">
                              <IconButton
                                variant="text"
                                onClick={() => (
                                  setIdEditar(r_id_documento),
                                  setVerEditar(true)
                                )}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={r_estado ? "Habilitado" : "Deshabilitado"}
                            color={r_estado ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Ver Documento">
                          <IconButton
                            variant="text"
                            onClick={() => (
                              setUrlDoc(
                                process.env.NEXT_PUBLIC_ACCESLINK +
                                  "docs/VerPDF/" +
                                  r_id_documento +
                                  "/" +
                                  true
                              ),
                              setVisor(true)
                            )}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Eliminar documento">
                          <IconButton variant="text">
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
