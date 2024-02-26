import { ListBulletIcon, ServerStackIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { Home, Survey, Question } from "@/pages/dashboard";
import { AnswerTypeManagement, OrganizationManagement } from "@/pages/manage";
import { SignIn, SignUp } from "@/pages/auth";
import Authorization from "@/provider/Authorization";
import Permissions from "@/provider/Permissions";
  
const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <ListBulletIcon {...icon} />,
                name: "Ana Sayfa",
                path: "/home",
                active: true,
                element: <Home />
            },
            {
              icon: <ListBulletIcon {...icon} />,
              name: "Anketler",
              path: "/survey",
              active: true,
              element: <Survey />
            },
            {
              icon: <ListBulletIcon {...icon} />,
              name: "Sorular",
              path: "/question",
              active: false,
              element: <Question />
            }
        ]
    },
    {
        layout: "auth",
        pages: [
          {
            icon: <ServerStackIcon {...icon} />,
            name: "Giriş Yap",
            path: "/signin",
            active: false,
            element: <SignIn />
          },
          {
            icon: <RectangleStackIcon {...icon} />,
            name: "Kayıt Ol",
            path: "/signup",
            active: false,
            element: <SignUp />
          },
        ]
      },
    {
      layout: "manage",
      title: "Anket Yönetimi",
      pages: [
        {
          icon: <ListBulletIcon {...icon} />,
          name: "Şirket Yönetimi",
          path: "/organizationmanagement",
          active: true,
          element: <Authorization element={<OrganizationManagement/>} permissions={[Permissions.ORGANIZATION_MANAGEMENT]}/>
        },
        {
          icon: <ListBulletIcon {...icon} />,
          name: "Cevap Tipi Yönetimi",
          path: "/answertypemanagement",
          active: true,
          element: <Authorization element={<AnswerTypeManagement/>} permissions={[Permissions.ANSWER_TYPE_MANAGEMENT]}/>
        }
      ]
    }
];

export default routes;
  