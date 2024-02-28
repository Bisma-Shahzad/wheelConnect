import { useNavigate } from "react-router-dom";
import "../../components/Navbar/main.css";
import { useEffect, useState } from "react";
import { getIdData, getprofileData } from "../../config/firebasemethods";
import UserCard from "../../components/UserCard";
import { Spinner } from "react-bootstrap";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { useDispatch } from "react-redux";

export default function Allbookings() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/")
  };

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
  const getProduct = (e) => {
    nav("/singlebooking", {
      state: e,
    });
    // console.log(e)
  };

  let getData = async () => {
    setLoader(true);
    await getIdData("customerbooking", "")
      .then((res) => {
        console.log("res on get id data on home page", res);
        console.log("object.keys(res)", Object.keys(res));
        // console.log('necha wala chal rha hain');
        const result = Object.values(res).flatMap((value) =>
          Object.values(value).map(
            ({
              ac,
              airBags,
              address,
              bluetooth,
              bookingType,
              cassettePlayer,
              color,
              companyName,
              cost,
              carNumber,
              description,
              engineType,
              frontCamera,
              gps,
              id,
              image1,
              image2,
              image3,
              image4,
              image5,
              image6,
              modelName,
              modelYear,
              sunRoof,
              usbPort,
              userName,
              userid,
              available,
              customerBookingId,
              customerid,
              customeruserName,
              selectedDate,
              selectedDateTime,
              transporterBookingId,
            }) => ({
              ac,
              airBags,
              address,
              bluetooth,
              bookingType,
              cassettePlayer,
              color,
              companyName,
              cost,
              carNumber,
              description,
              engineType,
              frontCamera,
              gps,
              id,
              image1,
              image2,
              image3,
              image4,
              image5,
              image6,
              modelName,
              modelYear,
              sunRoof,
              usbPort,
              userName,
              userid,
              available,
              customerBookingId,
              customerid,
              customeruserName,
              selectedDate,
              selectedDateTime,
              transporterBookingId,
            })
          )
        );

        console.log(result);// Store the original data
        setListData(result);
        setLoader(false);
      })
      .catch((err) => {
        // console.log('no data found')
        setLoader(false);
      });
  };

  useEffect(() => {
    // async () => {
    setLoader(true);
    getData();
    // console.log('else is working');
    setLoader(false);
  }, []);
  console.log("listData on addmin", listData);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "110vh" }}>
          <div className="mainSidebar">
            <ul className="sidebarUl">
              <li className="sidebarLi" onClick={handleUsersClick}>
                Users
              </li>
              <li className="sidebarLi" onClick={handleCarsClick}>
                Cars
              </li>
              <li
                className="sidebarLi"
                onClick={handleBookingClick}
                style={{ color: "#db2b39" }}
              >
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
        <div style={{ width: "100%"}}>
          <div style={{ width: "100%", textAlign: 'center' }}>
            <h1 style={{fontWeight: 'bold'}}>Admin Portal</h1>
          </div>
          <div style={{ marginLeft: 30}}>
            <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>
              All Bookings:
            </h2>
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
                    marginLeft: "30px",
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
