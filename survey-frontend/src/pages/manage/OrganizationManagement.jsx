import { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardBody, Avatar} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { baseUrl } from "@/constant";
import { useAuth } from "@/provider/AuthProvider";

export function OrganizationManagement() {
  
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(baseUrl + 'survey/organizations', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    })
    .then((res) => {return res.json()})
    .then((data) => {setOrganizations(data)})
    .finally(() => {setLoading(false)})
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Şirket Yönetimi
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Şirket Adı", ""].map(
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
                    {organizations.map(
                      ({ id, name }, key) => {
                        const className = `py-3 px-5 ${
                          key === organizations.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"}`;
                        return (
                          <tr key={id} className="hover:cursor-pointer opacity-100 transition-all hover:text-blue-500 hover:opacity-50">
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar src={"/img/company.svg"} alt={id} size="sm" />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold">
                                  {name}
                                </Typography>
                              </div>
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

export default OrganizationManagement;