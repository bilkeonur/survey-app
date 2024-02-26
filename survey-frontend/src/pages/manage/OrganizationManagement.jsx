import { useState, useEffect } from 'react';
import { IconButton, Button, Typography, Card, CardHeader, CardBody, Avatar} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrl } from "@/constant";


export function OrganizationManagement() {
  
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = (id) => {
    setLoading(true)
    fetch(baseUrl + 'organizations/get', {
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
  }; 

  const editCompany = (id) => {
    navigate('/manage/createorganization', { state: { organization: organizations[id] }});
  };

  const deleteCompany = (id) => {
    fetch(baseUrl + `organizations/delete/${organizations[id].id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
    .then((res) => { 
      getCompanies();
    })
    .catch(error => {console.log(error)});
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
                Şirket Yönetimi
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <NavLink to={'/manage/createorganization'}>
              <Button className="ml-4" color="amber">Şirket Ekle</Button>
            </NavLink>
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
                            <td width='95%' className={className}>
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
                            <td width='5%' className={className}>
                              <div className="flex items-center gap-4">
                                <IconButton onClick={() => editCompany(key)} size="md" color="blue" variant="outlined" className="m-2">
                                  <i className="fa-solid fa-pen-to-square fa-md" />
                                </IconButton>
                                <IconButton onClick={() => deleteCompany(key)} size="md" color="red" variant="outlined" className="m-2">
                                  <i className="fa-solid fa-trash fa-md" />
                                </IconButton>
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

export default OrganizationManagement;