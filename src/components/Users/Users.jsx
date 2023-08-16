import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDetailModal } from "./UsersDetailsModel";
import { dummyAxios } from "../../axios/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const getUsers = async () => {
    try {
      const response = await dummyAxios.get(`/users`);
      setUsers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:" + error);
      return [];
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-6 p-6 pr-8 bg-[#F4F6F9]">
        {/*<div className="w-full flex flex-wrap gap-6 p-6 pr-8 bg-[#F4F6F9]">*/}
        {users.map((user) => {
          const { id, name, username, email, address } = user;
          const { street, city, state, zipcode } = address;
          return (
            <div
              onClick={() => handleUserClick(user)}
              key={id}
              className="bg-white p-4 rounded-lg shadow hover:opacity-80 cursor-pointer"
            >
              <Link to={`:${id}`}></Link>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-gray-600">Username: {username}</p>
              <p className="text-gray-600">Email: {email}</p>
              <p className="text-gray-600">
                Address: {street}, {city}, {state} - {zipcode}
              </p>
            </div>
          );
        })}
      </div>
      {selectedUser && (
        <UserDetailModal users={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Users;
