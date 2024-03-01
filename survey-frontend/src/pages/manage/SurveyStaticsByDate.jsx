import { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardBody, Avatar} from "@material-tailwind/react";
import { useNavigate,useLocation } from 'react-router-dom';
import { baseUrl } from "@/constant";

export function SurveyStaticsByDate() {
  
  const location = useLocation();
  const navigate = useNavigate();

  const [statics, setStatics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStatics();
  }, []);

  const getStatics = () => {
    setLoading(true)
    fetch(baseUrl + `statics/getbydaterange/${location.state.surveyId}`, {
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
                Tarihsel İstatistikler
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Tarih", "Katılımcı Sayısı"].map(
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
                    {statics.map(
                      ({ participationDate, participationCount }, key) => {
                        const className = `py-3 px-5 ${
                          key === statics.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={participationDate} onClick={() => navigate2Questions(id,title)} className="hover:cursor-pointer opacity-100 transition-all hover:text-blue-500 hover:opacity-50">
                            <td width='20%' className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar src={"/img/calendar.svg"} alt={participationDate} size="sm" />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold">
                                  {participationDate}
                                </Typography>
                              </div>
                            </td>
                            <td width='80%'className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  className="text-xs font-medium text-blue-gray-600">
                                  {participationCount}
                                </Typography>
                              </div>
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

export default SurveyStaticsByDate;