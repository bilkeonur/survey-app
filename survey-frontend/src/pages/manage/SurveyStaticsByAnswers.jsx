import { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardBody, Avatar} from "@material-tailwind/react";
import { useNavigate,useLocation } from 'react-router-dom';
import { baseUrl } from "@/constant";

export function SurveyStaticsByAnswers() {
  
  const location = useLocation();
  const navigate = useNavigate();

  const [statics, setStatics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStatics();
  }, []);

  const getStatics = () => {
    setLoading(true)
    fetch(baseUrl + `statics/getbyanswers/${location.state.surveyId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then((res) => {if(res.status==401) {navigate('/auth/signin')} else return res.json()})
    .then((data) => {setStatics(data)})
    .finally(() => {setLoading(false)})
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Yanıtsal İstatistikler
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              {statics.map((answer) => {
                return (
                  <div className="m-10">
                    <table className="w-full min-w-[640px] table-auto text-left border-solid border-2 border-indigo-600">
                      <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <tr>
                          <th
                            key={crypto.randomUUID()}
                            className="border-b border-blue-gray-250 py-3 px-5 text-left">
                            <Typography
                              variant="small"
                              className="text-[16px] font-bold uppercase text-black">
                              Soru
                            </Typography>
                          </th>

                          {answer.options.map((option) => {
                            return (
                              <th
                                key={crypto.randomUUID()}
                                className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                <Typography
                                  variant="small"
                                  className="text-[16px] font-bold uppercase text-black">
                                  {option.name}
                                </Typography>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr 
                          key={crypto.randomUUID()}
                          className="opacity-100 transition-all">
                          <td className={"border-b border-blue-gray-50"}>
                            <div className="flex items-right gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold ml-4">
                                {answer.questionText}
                              </Typography>
                            </div>
                          </td>
                          {answer.options.map((option) => {
                            return (
                              <td className={"border-b border-blue-gray-50"}>
                                <div className="flex items-center gap-4">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold ml-5">
                                    {option.count}
                                  </Typography>
                                </div>
                              </td>
                            );
                          })} 
                        </tr>   
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}

export default SurveyStaticsByAnswers;