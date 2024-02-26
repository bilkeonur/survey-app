import { Card,CardHeader,CardBody,Typography,Avatar } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/constant";

export function Survey() {

  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowId, setRowId] = useState();

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl + 'survey/surveys')
      .then((res) => {return res.json()})
      .then((data) => {setSurveys(data)})
      .finally(() => {setLoading(false)})
  }, []);

  useEffect(() => {
    if(rowId != undefined) {
      navigate('/dashboard/question', { state: { surveyId: rowId, surveyName: surveys[rowId-1].title } });
    }
  },[rowId])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Aktif Anketler
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Anket Adı", "Şirket", "Başlangıç Tarihi", "Bitiş Tarihi", ""].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400">
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                    <tbody>
                    {surveys.map(
                      ({ id, title, organization, startDate, endDate }, key) => {
                        const className = `py-3 px-5 ${
                          key === surveys.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={title} onClick={() => setRowId(id)} className="hover:cursor-pointer opacity-100 transition-all hover:text-blue-500 hover:opacity-50">
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar src={"/img/survey.svg"} alt={title} size="sm" />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold">
                                  {title}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600">
                                  {organization}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600">
                                {startDate}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600">
                                {endDate}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600">
                                <EllipsisVerticalIcon
                                  strokeWidth={2}
                                  className="h-5 w-5 text-inherit"/>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
              </table>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}

export default Survey;