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
export default function Editar({ Cerrar, ID }) {
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
  //Funcion para firmar xd
  const [Loading, setLoading] = useState(false);
  const HandleSUbumit = async (e) => {
    setLoading(true);
    await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_ACCESLINK + "docs/PDF_para_firmar/" + ID,
      responseType: "blob",
      withCredentials: true,
    })
      .then(async (res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        // Crear un archivo File a partir del Blob
        const pdfFile = new File([pdfBlob], "archivo.pdf", {
          type: "application/pdf",
        });
        console.log(pdfFile);

        const form = new FormData();
        form.append("pdf", pdfFile);
        form.append("firma", file);
        form.append("palabra_secreta", descripcion);
        form.append("posicion_x", 20);
        form.append("posicion_y", 20);
        form.append("numero_paguina", 0);

        //enviar a firmar
        try {
          await axios({
            method: "post",
            url: "http://192.168.1.22:81/procesar",
            data: form,
            responseType: "blob",
            withCredentials: false,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(async (res) => {
              console.log("descargando el archivo");
              //este es el que descarga
              //si se necesitan hacer pruebas descomentar fileDownload(res.data, "archiv.pdf");
              //fileDownload(res.data, "archiv.pdf");
              ///
              ///
              ///
              ///
              //
              //aqui invocar la otra parte de la funcion para enviar el pdf a la API en lugar de descargarlo
              //si se necesitan hacer pruebas sin enviar a la api o registrar la firma (osea para ver el documento pdf firmado)
              //comentar todo lo siguiente hasta .catch((err)=>{})

              // Convertir el Blob del PDF en un archivo File
              console.log(res.data);
              const pdfBlob2 = new Blob([res.data], {
                type: "application/pdf",
              });
              console.log(pdfBlob2);
              var nombre_documento = "DocumentoFirmado-" + Date.now() + ".pdf";
              //const pdfFile = new File([pdfBlob], 'archivo.pdf');
              // Crear un archivo File a partir del Blob
              const pdfFile2 = new File([pdfBlob2], nombre_documento, {
                type: "application/pdf",
              });

              //modificar esta funcion para hacer que se guarde en el servidor el documento firmado
              // Crear un objeto FormData para adjuntar el archivo PDF
              const formData = new FormData();
              formData.append("file", pdfFile2);
              formData.append("id_documento", ID);

              // Realizar la solicitud POST al servidor
              await axios({
                method: "post",
                url:
                  process.env.NEXT_PUBLIC_ACCESLINK + "docs/DocumentoFirmado",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
              })
                .then(async (response) => {
                  console.log(response);
                  Cerrar();
                  setLoading(false);
                })
                .catch((error) => {
                  // Maneja los errores de la solicitud aquí
                  setLoading(false);
                  alert("Error");
                  console.error("Error en la solicitud:", error);
                });
              ///

              ////

              ///
              ///

              ///

              ///
              //regresar a la pantalla principal de documentos por firmar
              //salir_firmador(true);
              //setLoading(false);
            })
            .catch((err) => {
              // Manejar el error aquí
              console.log(err.message);
              alert("Erro1");
              alert(err.message);
              setLoading(false);
            });
        } catch (error) {
          setLoading(false);
          alert("Error2");
          console.log(error);
        }
      })
      .catch((err) => {
        // Manejar el error aquí
        alert("Erro3");
        console.log(err);
        console.log(err.message);
        alert(err.message);
        setLoading(false);
      });
  };
  return (
    <>
      <Dialog size="xs" open={true} className="bg-transparent shadow-none">
        {Loading && <Loader />}
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Firmar {ID}
            </Typography>
            {/**INPUTS A LLENAR */}
            <Input
              label="Contraseña del .p12"
              value={descripcion}
              type="password"
              size="lg"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
              <label htmlFor="fileInput" className="text-white font-bold">
                Subir .p12:
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={ImagePreview}
                accept=".p12"
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
              fullWidth
              color="green"
              onClick={HandleSUbumit}
            >
              Firmar
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
