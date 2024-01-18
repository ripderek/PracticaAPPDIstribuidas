import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
  ArrowsPointingOutIcon,
  ArrowLongLeftIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

export function Navbar_app({ titulo }) {
  const cookies = new Cookies();
  const [image, setimage] = useState("");
  const [nombres, setNombre] = useState("");
  const [nombresS, setNombreS] = useState("");
  const [gmail, setGmail] = useState("");

  useEffect(() => {
    setimage(decodeURIComponent(cookies.get("foto")));
    setNombre(decodeURIComponent(cookies.get("Nombres")));
    setNombreS(decodeURIComponent(cookies.get("Nombres")).substring(0, 15));
    setGmail(decodeURIComponent(cookies.get("email")));
  }, []);
  return (
    <Navbar
      className="sticky top-4 z-40 py-3  border-4 border-black bg-white border-none rounded-none mb-4"
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h4" color="black">
            {titulo}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="">
            <div className="h-auto bg-blue-gray-400 flex mt-1 cursor-pointer text-center rounded-xl mx-auto w-full ">
              <div className="flex items-center">
                <Tooltip content={nombres}>
                  <img
                    className="h-14 rounded-xl shadow-lg "
                    src={image}
                    alt="User image"
                  />
                </Tooltip>
                <div className="ml-2 font-bold text-blue-gray-600 p-2">
                  {nombresS}..
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
export default Navbar_app;
