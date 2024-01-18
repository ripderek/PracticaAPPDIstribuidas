import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

export default function Editar({ Cerrar, ID }) {
  return (
    <>
      <Dialog size="xs" open={true} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Crear Persona {ID}
            </Typography>
            {/**INPUTS A LLENAR */}
            <Input label="Nombres" size="lg" />
            <Input label="Apellidos" size="lg" />
            <Input label="Cedula" size="lg" />
            <Input label="Correo" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Habilitado?" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={Cerrar} fullWidth color="green">
              Crear
            </Button>
            <Button
              variant="gradient"
              onClick={Cerrar}
              fullWidth
              className="mt-2"
              color="red"
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
