import { useLocation, useNavigate } from "react-router-dom";
import "../../components/Navbar/main.css";
import { getIdData } from "../../config/firebasemethods";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import UserCard from "../../components/UserCard";
import "../../components/Navbar/Navbar.css";
import { useDispatch } from "react-redux";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function SingleUserProfile() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location.state", location.state);
  let data = location.state;
  let nav = useNavigate();
  const [loader, setLoader] = useState(true);
  const [listData, setListData] = useState([]);

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/")
    };

  const handleUsersClick = () => {
    nav("/adminportalhome");
  };
  const handleCarsClick = () => {
    nav("/allcars");
  };
  const handleBookingClick = () => {
    nav("/allbookings");
  };

  let getdata = () => {
    setLoader(true);
    getIdData("cars", data.id)
      .then((res) => {
        // console.log("res", res);
        const newArray = Object.values(res).map((obj) => ({
          ac: obj.ac,
          airBags: obj.airBags,
          bluetooth: obj.bluetooth,
          bookingType: obj.bookingType,
          cassettePlayer: obj.cassettePlayer,
          color: obj.color,
          companyName: obj.companyName,
          cost: obj.cost,
          description: obj.description,
          engineType: obj.engineType,
          frontCamera: obj.frontCamera,
          gps: obj.gps,
          id: obj.id,
          image1: obj.image1,
          image2: obj.image2,
          image3: obj.image3,
          image4: obj.image4,
          modelName: obj.modelName,
          modelYear: obj.modelYear,
          sunRoof: obj.sunRoof,
          usbPort: obj.usbPort,
          userName: obj.userName,
          userid: obj.userid,
          available: obj.available,
          carNumber: obj.carNumber,
        }));

        // console.log(newArray);
        setListData(newArray);
        setLoader(false);
      })
      .catch((err) => {
        // console.log('no data found')
        setLoader(false);
      });
  };
  const handleMessageClick = () => {
    nav("/message");
  };

  useEffect(() => {
    getdata();
  }, []);

  const getProduct = (e) => {
    nav("/singlecardetail", {
      state: e,
    });
    // console.log(e)
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "110vh" }}>
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
          <div>
            <h1 style={{ fontWeight: "bold", marginLeft: 30 }}>PROFILE</h1>
          </div>
          
          <div>
            <div style={{marginLeft: 30}}>
              <p className="bookedcarpara4">
                <span className="bookedcarpara3" style={{ marginRight: 10 }}>
                  User Id:
                </span>{" "}
                {location.state.id}
              </p>
              <p
                className="bookedcarpara4"
                style={{ textTransform: "capitalize" }}
              >
                <span className="bookedcarpara3" style={{ marginRight: 10 }}>
                  Name:
                </span>{" "}
                {location.state.userName}
              </p>
              <p className="bookedcarpara4">
                <span className="bookedcarpara3" style={{ marginRight: 10 }}>
                  Email address:
                </span>{" "}
                {location.state.email}
              </p>
              <p className="bookedcarpara4">
                <span className="bookedcarpara3" style={{ marginRight: 10 }}>
                  Contact Number:
                </span>{" "}
                {location.state.contact}
              </p>
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ fontWeight: "bold" }}>Cars</h1>
          </div>
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
            <div>
              {listData.length === 0 ? (
                <div>
                  <img
                    src={require("../../Assets/Images/no_cars_search.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      marginVerticle: "50px",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginLeft: '30px'
                  }}
                >
                  {listData
                    // .filter((x) =>
                    //   x.carName.toLowerCase().includes(searchProd)
                    // )
                    .map((x, i) => {
                      return (
                        <UserCard
                          title={x.companyName + " " + x.modelName}
                          src={x.image1}
                          price={x.cost}
                          onClick={() => getProduct(x)}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
