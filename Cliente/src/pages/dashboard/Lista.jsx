import { useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID",
  "Nombres",
  "Apellidos",
  "Cedula",
  "Correo",
  "Estado",
  "Editar",
  "Eliminar",
];

const TABLE_ROWS = [
  {
    id: "1",
    nombre: "John",
    apellido: "Leturne",
    cedula: "111111",
    correo: "Organization@uteq.edu.ec",
    estado: 1,
  },
];

import { Editar } from "@/pages/dashboard";
export default function Lista() {
  //stado para ver el fomulario de crear persona
  const [verEditar, setVerEditar] = useState(false);
  const [idEditar, setIdEditar] = useState(false);

  const CerrarEditar = () => {
    setVerEditar(false);
  };
  return (
    <>
      {verEditar && <Editar Cerrar={CerrarEditar} ID={idEditar} />}
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
          {TABLE_ROWS.map(
            ({ id, nombre, apellido, cedula, correo, estado }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
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
                        {nombre}
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
                        {apellido}
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
                        {cedula}
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
                        {correo}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={estado === 1 ? "Habilitado" : "Deshabilitado"}
                        color={estado === 1 ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Editar Persona">
                      <IconButton
                        variant="text"
                        onClick={() => (setIdEditar(id), setVerEditar(true))}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Eliminar Persona">
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
  );
}
