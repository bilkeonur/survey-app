import { HomeIcon, ListBulletIcon, ChatBubbleBottomCenterTextIcon, BuildingOfficeIcon, ServerStackIcon, RectangleStackIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { Home, Survey, Question } from "@/pages/dashboard";
import { AnswerTypeManagement, CreateOrganization, OrganizationManagement, SurveyManagement } from "@/pages/manage";
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
                icon: <HomeIcon {...icon} />,
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
              icon: <ChatBubbleBottomCenterTextIcon {...icon} />,
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
          icon: <BuildingOfficeIcon {...icon} />,
          name: "Şirket Yönetimi",
          path: "/organizationmanagement",
          active: true,
          element: <Authorization element={<OrganizationManagement/>} permissions={[Permissions.ORGANIZATION_MANAGEMENT]}/>
        },
        {
          icon: <ListBulletIcon {...icon} />,
          name: "Şirket Ekle",
          path: "/createorganization",
          active: false,
          element: <Authorization element={<CreateOrganization/>} permissions={[Permissions.CREATE_ORGANIZATION]}/>
        },
        {
          icon: <ChatBubbleBottomCenterTextIcon {...icon} />,
          name: "Cevap Tipi Yönetimi",
          path: "/answertypemanagement",
          active: true,
          element: <Authorization element={<AnswerTypeManagement/>} permissions={[Permissions.ANSWER_TYPE_MANAGEMENT]}/>
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Anket Yönetimi",
          path: "/surveymanagement",
          active: true,
          element: <Authorization element={<SurveyManagement/>} permissions={[Permissions.SURVEY_MANAGEMENT]}/>
        }
      ]
    }
];

export default routes;
  