import { useNavigate } from "react-router-dom";
import "../../components/Navbar/main.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdData, userLogout } from "../../config/firebasemethods";
import { Spinner } from "react-bootstrap";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function Message() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const [loader, setLoader] = useState(true);
  const [listData, setListData] = useState([]);

  const handleUsersClick = () => {
    nav("/adminportalhome");
  };
  const handleMessageClick = () => {
    nav("/message");
  };
  const handleCarsClick = () => {
    nav("/allcars");
  };
  const handleBookingClick = () => {
    nav("/allbookings");
  };
  const adminUserClick = (e) => {
    nav("/singleuserprofile", {
      state: e,
    });
  };

  let getData = async () => {
    setLoader(true);
    try {
      const res = await getIdData("message", "");
      const dataArray = Object.values(res).map((user) => {
        // Destructure the user object and extract the needed properties
        const { title, message, userid } = user;

        return {
          title,
          message,
          userid,
        };
      });
      console.log("message", res);
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
    nav("/");
  };
  console.log("listData", listData);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "100" }}>
          <div className="mainSidebar">
            <ul className="sidebarUl">
              <li className="sidebarLi" onClick={handleUsersClick}>
                Users
              </li>
              <li className="sidebarLi" onClick={handleCarsClick}>
                Cars
              </li>
              <li className="sidebarLi" onClick={handleBookingClick}>
                Bookings
              </li>
              <li
                className="sidebarLi"
                onClick={handleMessageClick}
                style={{ color: "#db2b39" }}
              >
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
            <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>FeebBacks:</h2>
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
                  <div>
                    {listData // Filter out undefined and objects without title and message
                      .map((x, i) => (
                        <div key={i} className="" style={{marginRight: 30}}>
                          <p style={{fontWeight: 'bold', fontSize: 30,}}>
                            {i + 1}. {x.title}
                          </p>
                          <p style={{fontSize: 16,}}>User id: {x.userid}</p>
                          <p>{x.message}</p>
                        </div>
                      ))}
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
