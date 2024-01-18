import { useState, useRef } from "react";
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
import { AiOutlineUpload } from "react-icons/ai";

export default function Crear({ Cerrar }) {
  //para enviar la foto de perfil
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } catch (error) {
      console.log(error);
    }
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  const [descripcion, setDescripcion] = useState("");
  //funcion para guardar el documento

  return (
    <>
      <Dialog size="xs" open={true} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Subir Documento
            </Typography>
            {/**INPUTS A LLENAR */}
            <Input
              label="Descripcion"
              value={descripcion}
              size="lg"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
              <label htmlFor="fileInput" className="text-white font-bold">
                Subir documento:
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={ImagePreview}
                accept=".pdf"
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                className="ml-3  rounded-xl  bg-white h-11"
                onClick={handleButtonClick}
              >
                <AiOutlineUpload size="25px" color="black" />
              </Button>
            </div>
            <Typography color="blue-gray" className="mx-auto">
              {filename}
            </Typography>
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
