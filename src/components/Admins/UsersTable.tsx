import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from 'react-bootstrap';
import { RevealDropdownTrigger } from 'components/base/RevealDropdown';
import RevealDropdown from 'components/base/RevealDropdown';
import UserModal from './UserModal';

const URL = 'https://engine.qberi.com/api/allUsers/qberi/users/info';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

type roles = {
  HospitalMerch: string[];
  Qberi: string[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  roles: roles;
  sharePercentage: number;
};

const UsersList = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [, setTotalPortfolioValue] = useState(0);

  const userTableColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'firstName',
      header: 'First Name'
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name'
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row: { original } }) => {
        return <>{original.email || 'N/A'}</>;
      },
      meta: {
        headerProps: { style: { width: 200 } }
      }
    },
    {
      accessorKey: 'mobile',
      header: 'Mobile',
      cell: ({ row: { original } }) => {
        return <>{original.mobile || 'N/A'}</>;
      },
      meta: {
        headerProps: { style: { width: 200 } }
      }
    },
    {
      accessorKey: 'HM-Roles',
      header: 'HM-Roles',
      cell: ({ row: { original } }) => {
        const roles = original.roles || { HospitalMerch: [], Qberi: [] };
        const hospitalmerchRoles = roles.HospitalMerch || [];
        return (
          <>
            {hospitalmerchRoles.map((role, index) => (
              <Badge className="badge badge-soft-primary" key={index}>
                {role}
              </Badge>
            ))}
          </>
        );
      },
      meta: {
        headerProps: { style: { width: 80 } }
      }
    },
    {
      accessorKey: 'Q-Roles',
      header: 'Q Roles',
      cell: ({ row: { original } }) => {
        const roles = original.roles || { HospitalMerch: [], Qberi: [] };
        const qberiRoles = roles.Qberi || [];
        return (
          <>
            {qberiRoles.map((role, index) => (
              <Badge
                className="badge badge-soft-primary"
                key={`${index}-qberi`}
              >
                {role}
              </Badge>
            ))}
          </>
        );
      },
      meta: {
        headerProps: { style: { width: 80 } }
      }
    },
    // {
    //   accessorKey: 'sharePercentage',
    //   header: 'Share %',
    //   cell: ({ row: { original } }) => {
    //     return <>{original.sharePercentage || 0}</>;
    //   },
    //   meta: {
    //     headerProps: { style: { width: 50 } }
    //   }
    // },
    // {
    //   accessorKey: 'netShareValue',
    //   header: 'NAV (Net Assets Value)',
    //   cell: ({ row: { original } }) => {
    //     return <>{(original.sharePercentage || 0 / 100) * 100}</>;
    //   },
    //   meta: {
    //     headerProps: { style: { width: 50 } }
    //   }
    // },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: ({ row: { original } }) => {
        return (
          <RevealDropdownTrigger>
            <RevealDropdown>
              <Dropdown.Item
                onClick={() => {
                  console.log('Edit', original);

                  setIsOpen(true);
                  setCanEdit(true);
                  setCurrentUser(original);
                }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log('View', original);
                  setIsOpen(true);
                  setCanEdit(false);
                  setCurrentUser(original);
                }}
              >
                View
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  onClickDelete(original.id);
                }}
                className="text-danger"
              >
                Delete
              </Dropdown.Item>
            </RevealDropdown>
          </RevealDropdownTrigger>
        );
      },
      meta: {
        headerProps: { style: { width: 100 } }
      }
    }
  ];

  const DeleteUser = (id: string) => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session?.sessionToken;

    const URL = `https://engine.qberi.com/api/deleteUser/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    };

    axios.delete(URL, { headers: headers }).then(response => {
      console.log(response.data);
    });
  };

  const onClickDelete = (id: string) => {
    console.log('Delete', id);
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmDelete) {
      DeleteUser(id);
    }
  };

  // const fetchTotalPortfolioValue = useCallback(() => {
  //   axios
  //     .get('https://engine.qberi.com/api/totalPortfolioValue/portfolioValue', {
  //       headers: headers
  //     })
  //     .then(response => {
  //       setTotalPortfolioValue(response.data.amountInUsd);
  //       // console.log('Response:', response.data.amountInUsd);
  //     })
  //     .catch(error => {
  //       if (error.response && error.response.status === 401) {
  //         console.error('Error:', error);
  //         window.location.href = '/auth/sign-out';
  //       } else {
  //         console.error('Error:', error);
  //       }
  //     });
  // }, []);

  const fetchData = useCallback(() => {
    axios
      .get(URL, { headers: headers })
      .then(response => {
        setAllUserData(response.data);
        // console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // fetchTotalPortfolioValue();
    setTotalPortfolioValue(100);
  }, []);

  const table = useAdvanceTable({
    data: allUserData,
    columns: userTableColumns,
    pageSize: 10,
    pagination: true,
    selection: true,
    sortable: true
  });

  const defaultUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    roles: { HospitalMerch: [], Qberi: [] },
    sharePercentage: 0
  };

  const [isOpen, setIsOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);

  return (
    <>
      <AdvanceTableProvider {...table}>
        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
          <AdvanceTable tableProps={{ className: 'phoenix-table fs-9' }} />
          <AdvanceTableFooter pagination />
        </div>
      </AdvanceTableProvider>
      <UserModal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        canEdit={canEdit}
        user={currentUser}
      />
    </>
  );
};

export default UsersList;
