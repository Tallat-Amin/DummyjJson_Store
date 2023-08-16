import { Typography, List, ListItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import pic from "../../../assets/image/tallat.jpg";
const Sidebar = () => {
  return (
    <>
      <div className={`h-[100vh] w-64 pt-2.5 bg-[#343A40] fixed`}>
        <div className="mb-2 p-[0.2rem] pb-2 pl-4 flex gap-2 items-center border-b-2 border-gray-400">
          <img
            src={pic}
            alt="tallat"
            className="rounded-[50%] justify-center object-contain w-10 h-10"
          />
          <Typography variant="paragraph" color="white" className="pt-2">
            Tallat AmIn
          </Typography>
        </div>
        <List>
          <Link to="/products">
            <ListItem>
              <Typography
                variant="paragraph"
                color="white"
                className="text-md flex gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Products
              </Typography>
            </ListItem>
          </Link>
          {/*<Link to="/users">*/}
          {/*  <ListItem>*/}
          {/*    <Typography*/}
          {/*      variant="paragraph"*/}
          {/*      color="white"*/}
          {/*      className="text-md flex gap-2"*/}
          {/*    >*/}
          {/*      <svg*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        fill="none"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*        strokeWidth="1.5"*/}
          {/*        stroke="currentColor"*/}
          {/*        className="w-6 h-6"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          strokeLinecap="round"*/}
          {/*          strokeLinejoin="round"*/}
          {/*          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"*/}
          {/*        />*/}
          {/*      </svg>*/}
          {/*      Users*/}
          {/*    </Typography>*/}
          {/*  </ListItem>*/}
          {/*</Link>*/}
          <Link to={"/add_product"}>
            <ListItem>
              <Typography
                variant="paragraph"
                color="white"
                className="text-md flex gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </Typography>
            </ListItem>
          </Link>
          <Link to={"/edit_product"}>
            <ListItem>
              <Typography
                variant="paragraph"
                color="white"
                className="text-md flex gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Edit Product
              </Typography>
            </ListItem>
          </Link>
        </List>
      </div>
    </>
  );
};

export default Sidebar;
