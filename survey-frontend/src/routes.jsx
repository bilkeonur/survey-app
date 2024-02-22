import { ListBulletIcon } from "@heroicons/react/24/solid";
import { Home,Survey } from "@/pages/dashboard";
  
const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <ListBulletIcon {...icon} />,
                name: "Anketler",
                path: "/home",
                active: true,
                element: <Home />
            },
            {
              icon: <ListBulletIcon {...icon} />,
              name: "survey",
              path: "/survey",
              active: false,
              element: <Survey />
            }
        ]
    }
];

export default routes;
  