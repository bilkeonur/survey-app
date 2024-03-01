import { ListBulletIcon, ChatBubbleBottomCenterTextIcon, BuildingOfficeIcon, ServerStackIcon, RectangleStackIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { Survey, Question } from "@/pages/dashboard";
import { SurveyStaticsByAnswers, SurveyStaticsByDate, CreateSurvey, CreateQuestions, CreateOrganization, OrganizationManagement, SurveyManagement } from "@/pages/manage";
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
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Anket Yönetimi",
          path: "/surveymanagement",
          active: true,
          element: <SurveyManagement/>
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Anket Ekle",
          path: "/createsurvey",
          active: false,
          element: <CreateSurvey/>
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Soru Ekle",
          path: "/createquestions",
          active: false,
          element: <CreateQuestions/>
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Tarihsel İstatistik",
          path: "/surveystaticsbydate",
          active: false,
          element: <SurveyStaticsByDate/>
        },
        {
          icon: <ClipboardDocumentListIcon {...icon} />,
          name: "Yanıtsal İstatistik",
          path: "/surveystaticsbyanswers",
          active: false,
          element: <SurveyStaticsByAnswers/>
        }
      ]
    }
];

export default routes;
  