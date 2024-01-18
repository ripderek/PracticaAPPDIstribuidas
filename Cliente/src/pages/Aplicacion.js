import { useState } from 'react'
import { Home, Crear, Menu, Lista } from '@/pages/dashboard'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Navbar_app } from '@/widgets'

export default function Aplicacion() {
  //stado para ver el fomulario de crear persona
  const [verCrear, setVerCrear] = useState(false);
  const CerrarCrear = () => {
    setVerCrear(false);
  }
  return (
    <>
      <Navbar_app titulo={"Aplicacion Distribuida"} />
      {verCrear && <Crear Cerrar={CerrarCrear} />}
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Arquitectura Distribuida
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                NODE, NEXTJS, POSTGRESQL
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {/*
            <Button variant="outlined" size="sm">
              view all
            </Button>
             */}
              <Button className="flex items-center gap-3" size="sm" onClick={() => setVerCrear(true)}>
                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Subir Documento
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0 p-5">
          <Lista />
        </CardBody>
      </Card>
    </>
  );
}