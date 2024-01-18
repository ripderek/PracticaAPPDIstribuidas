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
import Cookies from "universal-cookie";
import axios from "axios";
import { Loader } from "@/widgets";

export default function Crear({ Cerrar }) {
  const [Loading, setLoading] = useState(false);

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
  const Crear_Respuesta = async () => {
    //process.env.NEXT_PUBLIC_ACCESLINK
    //Router.push("/Inicio");
    const cookies = new Cookies();
    setLoading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      //obtener de la cookie
      form.set("p_correo", decodeURIComponent(cookies.get("email")));
      form.set("p_descripcion", descripcion);
      form.set("p_nombre_docuemnto", filename);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "docs/CrearDocumento",
        form,
        {
          withCredentials: true,
        }
      );
      //se manda 0 como id porque se desconoce el id de la pregunta que se creo, y se envia true como segundo parametro para que relize la busqueda de la ultima pregunta en la sigueinte ventana en un useEffect
      //AbrirEditarMEMRZAR(0, true);
      setLoading(false);
      alert("Se guardo el documento");
      Cerrar();
    } catch (error) {
      console.log(error);
      alert("Error");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog size="xs" open={true} className="bg-transparent shadow-none">
        {Loading && <Loader />}
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
            <Button
              variant="gradient"
              onClick={Crear_Respuesta}
              fullWidth
              color="green"
            >
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
