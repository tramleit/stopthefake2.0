import Breadcrumb from "components/Breadcrumb";
import PortalWrapper from "components/PortalWrapper/PortalWrapper";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "shared/Pagination/Pagination";
import axios from "../../axios";

const Users = () => {
  const { token } = useAuth();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const pageNumber = Number(search.get("page"));
  const [page, setPage] = useState(pageNumber || 1);
  const [pageSize, setPageSize] = useState(16);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async (page: any) => {
    await axios
      .get("/users?page=" + page, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((resp: any) => {
        setUsersCount(resp.data.count);
        setUsers(resp.data.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getUsers(page);
  }, [page]);

  const paginate = (pge: any) => {
    setPage(pge);
  };

  return (
    <PortalWrapper>
      <div className="p-4">
        <Breadcrumb page="Users" />
        <SectionGridAuthorBox
          admin={true}
          boxCard="box3"
          loading={loading}
          users={users}
        />
      </div>
      <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
        <Pagination
          pageSize={pageSize}
          total={usersCount}
          paginate={paginate}
        />
        {/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
      </div>
    </PortalWrapper>
  );
};

export default Users;
