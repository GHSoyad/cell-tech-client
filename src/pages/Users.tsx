import { Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PageHeader from "../components/shared/PageHeader";
import { useEffect, useState } from "react";
import Loader from "../components/shared/Loader";
import { useGetUsersQuery } from "../redux/features/user/userApi";
import { IUser } from "../types/userTypes";
import Dropdown from "../components/shared/Dropdown";
import UpdateUser from "../components/ui/UpdateUser";

interface ITableProps {
  sno: number,
  _id: string,
  name: string,
  email: string,
  role: string,
  status: string,
}


const Users = () => {
  const { data, isFetching } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });
  const [users, setUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [modifyUser, setModifyUser] = useState<IUser>();

  useEffect(() => {
    if (data?.content?.length) {
      const rows = data?.content?.map((user: IUser, index: number) => ({
        sno: index + 1,
        _id: user._id,
        name: user?.name,
        email: user.email,
        role: user.role,
        status: user?.status ? "Active" : "Inactive",
      }))

      setUsers(rows);
    }
  }, [data?.content])

  const handleModify = (id: string, action: string) => {
    const findUser = users?.find((user: IUser) => user._id === id);
    setModifyUser(findUser);

    if (action.toLowerCase() === "update") {
      setOpenUpdate(true);
    }
  };


  return (
    <>
      <PageHeader title="Users" />
      <Card sx={{ borderRadius: "10px", p: { xs: 2, md: 3 }, minHeight: "calc(100vh - 178px)", position: "relative" }}>
        <>
          {
            isFetching ?
              <Loader />
              :
              users?.length ?
                <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 278px)" }}>
                  <Table stickyHeader size="small" aria-label="inventory table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>No.</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        users.map((row: ITableProps) => (
                          <TableRow
                            key={row?._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover
                          >
                            <TableCell>{row?.sno}</TableCell>
                            <TableCell>{row?.name}</TableCell>
                            <TableCell>{row?.email}</TableCell>
                            <TableCell>{row?.role?.toUpperCase()}</TableCell>
                            <TableCell align="center">{row?.status}</TableCell>
                            <TableCell align="center">
                              <Dropdown
                                options={[
                                  { id: row?._id, name: "Update", action: handleModify },
                                ]}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                :
                <Typography variant="h6" sx={{ p: 3, textAlign: "center" }}>
                  No Data Found
                </Typography>
          }
        </>
      </Card>
      {
        openUpdate ?
          <UpdateUser open={openUpdate} setOpen={setOpenUpdate} modifyUser={modifyUser} />
          :
          null
      }
    </>
  );
};

export default Users;