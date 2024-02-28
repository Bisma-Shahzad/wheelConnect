import { useNavigate } from "react-router-dom";
import "../../components/Navbar/main.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdData, userLogout } from "../../config/firebasemethods";
import { Spinner } from "react-bootstrap";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function AdminPortalHome() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const [loader, setLoader] = useState(true);
  const [listData, setListData] = useState([]);

  const handleUsersClick = () => {
    nav("/adminportalhome");
  };
  const handleCarsClick = () => {
    nav("/allcars");
  };
  const handleBookingClick = () => {
    nav("/allbookings");
  };
  const handleMessageClick = () => {
    nav("/message");
  };
  const adminUserClick = (e) => {
    nav("/singleuserprofile", {
      state: e,
    });
  };

  let getData = async () => {
    setLoader(true);
    try {
      const res = await getIdData("users", "");
      const dataArray = Object.values(res).map((user) => {
        // Destructure the user object and extract the needed properties
        const { confirmPassword, contact, email, id, password, userName } =
          user;

        return {
          confirmPassword,
          contact,
          email,
          id,
          password,
          userName,
        };
      });

      setListData(dataArray);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoader(false);
    }
  };

  useEffect(() => {
    // async () => {
    setLoader(true);
    getData();
    // console.log('else is working');
    setLoader(false);
  }, [userAuth]);
  console.log("listData on addmin", listData);

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/")
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "100vh" }}>
          <div className="mainSidebar">
            <ul className="sidebarUl">
              <li
                className="sidebarLi"
                onClick={handleUsersClick}
                style={{ color: "#db2b39" }}
              >
                Users
              </li>
              <li className="sidebarLi" onClick={handleCarsClick}>
                Cars
              </li>
              <li className="sidebarLi" onClick={handleBookingClick}>
                Bookings
              </li>
              <li className="sidebarLi" onClick={handleMessageClick}>
                Feedback
              </li>
              <li className="sidebarLi" onClick={handleLogoutButton}>
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold" }}>Admin Portal</h1>
          </div>
          <div style={{ marginLeft: 40 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>
              Users List:
            </h2>
            <div>
              {loader ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Spinner animation="border" style={{}} />
                </div>
              ) : (
                <>
                  <div
                    style={
                      {
                        //   display: "flex",
                        //   justifyContent: "space-between",
                        //   flexWrap: "wrap",
                      }
                    }
                  >
                    <ol>
                      {listData.map((x, i) => (
                        <li
                          key={i}
                          className="adminUserList"
                          onClick={() => adminUserClick(x)}
                        >
                          {x?.userName} ( {x.id} )
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
