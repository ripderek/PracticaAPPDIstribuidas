import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { NavBarFormsLogin } from '@/components/FormsLayout'
import { Cards } from '@/pages/dashboard'
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from 'next/router';
export default function index() {
    const Router = useRouter();
    //funcion para el inicio de sesion skere modo diablo
    const loginG = useGoogleLogin({
        onSuccess: async (respose) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${respose.access_token}`,
                        },
                    }
                );
                //console.log(res.data);
                //Aqui va para sacar los datos que regresa google
                //si existe res.data entonces mandar a la API a verificar 
                if (res.data) {
                    console.log(res.data);

                    const { email: email, family_name: apellidos, given_name: nombres, hd: dominio, name: nombres_completos, picture: foto } = res.data;

                    const result = await axios.post(
                        process.env.NEXT_PUBLIC_ACCESLINK + "authgoogle/LoginG",
                        { email },
                        {
                            withCredentials: true,
                        }
                    );
                    //Llama al metodo pasandole el email
                    //GoogleLogin(email, nombres_completos, dominio, foto);
                    const cookies = new Cookies();
                    cookies.set("myTokenName", result.data.token, { path: "/" });
                    cookies.set("Nombres", nombres_completos, { path: "/" });
                    cookies.set("foto", foto, { path: "/" });
                    cookies.set("email", email, { path: "/" });
                }
                Router.push("/Aplicacion");
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <Card className="mt-9 w-96 mx-auto">
            <CardBody>

                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Ingresar al programa
                </Typography>
                <Typography>
                    Firmador y gestor de documentos
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button size="sm" variant="text" className="flex items-center gap-2" onClick={loginG}>
                    Continuar con Google
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Button>
            </CardFooter>
        </Card>
    );
}