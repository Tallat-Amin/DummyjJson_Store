import { Button } from "@material-tailwind/react";
import { dummyAxios } from "../../axios/axios";
import { useEffect, useState } from "react";

export const UserDetailModal = ({ users, onClose }) => {
  const [usersDetails, setUsersDetails] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  const getUsersDetails = async () => {
    try {
      const response = await dummyAxios.get(`/users/${users.id}`);
      setUsersDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersDetails();
    console.log(usersDetails);
  }, []);

  const { name, username, email, address } = usersDetails;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg ">
        {loading ? (
          // Show loader while data is being fetched
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600">Username: {username}</p>
            <p className="text-gray-600">Email: {email}</p>
            <p className="text-gray-600">
              Address: {address?.street}, {address?.city}, {address?.state}
              {address?.zipcode}
            </p>
            <Button
              variant="outlined"
              onClick={onClose}
              className="mt-4 border-black text-black px-4 py-2 hover:bg-black hover:text-white"
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
