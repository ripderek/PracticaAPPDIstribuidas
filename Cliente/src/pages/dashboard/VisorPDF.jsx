import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";

export default function VisorPDF({ URLDOC, cerrar }) {
  //Hacer una funcion que cargue el pdf y lo deje ver xd

  return (
    <>
      <Dialog
        open={true}
        size="xl"
        handler={cerrar}
        className="overflow-y-scroll"
      >
        <DialogHeader>
          <Button
            variant="gradient"
            color="gray"
            onClick={cerrar}
            className="mx-auto"
          >
            Cerrar
          </Button>
        </DialogHeader>
        <DialogBody>
          <div>
            <iframe
              src={URLDOC}
              height="20%"
              width="100%"
              className="h-screen"
            />
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </>
  );
}
