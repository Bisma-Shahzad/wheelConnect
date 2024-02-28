import { useLocation, useNavigate } from "react-router-dom";
import "../../components/Navbar/main.css";
import { useState } from "react";
import "../../components/Navbar/Navbar.css";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { deletedata } from "../../config/firebasemethods";
import { useDispatch } from "react-redux";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function SingleCarDetail() {
  const dispatch = useDispatch();
    const location = useLocation();
    let data = location.state;
    let nav = useNavigate();
    console.log("data on transportercardetail", data);
    const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.image1);
  const [loader, setLoader] = useState(false);

const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/")
  };
  const handleMessageClick = () => {
    nav("/message");
  };

  const handleSmallImageClick = (image) => {
    setSelectedImage(image);
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

  let DeleteCar = () => {
    setLoader(true);

    deletedata("cars", data.userid, data.carNumber)
      .then((res) => {
        console.log("res of delete listing", res);
        data.available.forEach((day) => {
          deletedata(`${day}`, data.userid, data.carNumber)
            .then((res2) => {
              console.log(res2);
              deletedata(data.bookingType, data.userid, data.carNumber)
                .then((res3) => {
                  console.log(res3);
                })
                .catch((err3) => {
                  console.log(err3);
                });
            })
            .catch((err2) => {
              console.log(err2);
            });
        });
        setLoader(false);
        nav("/adminportalhome");
        alert("Car Deleted Successfully");
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ height: "100vh" }}>
          <div className="mainSidebar">
            <ul className="sidebarUl">
              <li className="sidebarLi" onClick={handleUsersClick} style={{ color: "#db2b39" }}>
                Users
              </li>
              <li className="sidebarLi" onClick={handleCarsClick}>
                Cars
              </li>
              <li
                className="sidebarLi"
                onClick={handleBookingClick}
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
          <div className="transporterbookedCar">
              <div>
                <div className="TransporterBookedCarImage">
                  <img
                    src={selectedImage}
                    className="TransporterBookedCarpic"
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  {[data.image1, data.image2, data.image3, data.image4].map(
                    (image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`image-${index}`}
                        width={"100px"}
                        style={{
                          margin: "10px",
                          border: "1px solid black",
                          height: "70px",
                          cursor: "pointer",
                        }}
                        // Handle small image click and update selectedImage state
                        onClick={() => handleSmallImageClick(image)}
                      />
                    )
                  )}
                </div>
                <div>
                  <Typography
                    variant="h3"
                    style={{
                      textTransform: "uppercase",
                      padding: "5px",
                      paddingLeft: 0,
                      fontWeight: "bold",
                      marginTop: 20,
                    }}
                  >
                    {data.companyName + " " + data.modelName}
                  </Typography>
                  {/* <h1>{location.state.carName}</h1> */}
                  {/* <h5>Model: {data.modelYear.label}</h5> */}
                </div>
                <div>
                  <h4 style={{ color: "#344263" }}>
                    <span style={{ fontWeight: "600" }}>
                      Cost (per hour):{" "}
                    </span>
                    {data.cost}
                    {/* Cost (per hour): {data.cost} */}
                  </h4>
                </div>
              </div>
              <div style={{ width: "500px" }}>
                <div style={{ marginTop: "40px" }}>
                  <div>
                    <h5>
                      <span style={{ fontWeight: "600" }}>Model:</span>{" "}
                      {data.modelYear.label}
                    </h5>
                  </div>
                  <div>
                    <h5>
                      <span style={{ fontWeight: "600" }}>Engine Type:</span>{" "}
                      {data.engineType}
                    </h5>
                    {/* <h5>Engine Type: {data.engineType}</h5> */}
                  </div>
                  <div>
                    <h5>
                      <span style={{ fontWeight: "600" }}>Color:</span>{" "}
                      {data.color}
                    </h5>
                    {/* <h5>Color: {data.color}</h5> */}
                  </div>
                  <div>
                    <h5>
                      <span style={{ fontWeight: "600" }}>Booking Type:</span>{" "}
                      {data.bookingType}
                    </h5>
                    {/* <h5>Booking Type: {data.bookingType}</h5> */}
                  </div>
                  <h3
                    style={{
                      textDecoration: "underline",
                      fontWeight: "600",
                      marginTop: 20,
                    }}
                  >
                    Features
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {[
                      { name: "AC", value: data.ac },
                      { name: "Front Camera", value: data.frontCamera },
                      { name: "Cassette Player", value: data.cassettePlayer },
                      { name: "Air Bags", value: data.airBags },
                      { name: "Sun Roof", value: data.sunRoof },
                      { name: "GPS", value: data.gps },
                      { name: "Bluetooth", value: data.bluetooth },
                      { name: "USB Port", value: data.usbPort },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", marginRight: "20px" }}
                      >
                        <h5 style={{ marginRight: "5px" }}>{feature.name}</h5>
                        <h5>
                          {!feature.value ? (
                            <CloseIcon style={{ color: "red" }} />
                          ) : (
                            <DoneIcon style={{ color: "green" }} />
                          )}
                        </h5>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 18 }}>
                    <span style={{ fontWeight: "600" }}>Description: </span>
                    {data.description}
                    {/* description: {data.description} */}
                  </p>                </div>

                  <div>
                  <h3 style={{ fontWeight: "600", marginTop: 20 }}>
                    Availability
                  </h3>
                  <h5>{data.available.join(", ")}</h5>
                </div>
                <div
                  style={{
                    marginTop: 30,
                    marginBottom: "20px",
                    display: "flex",
                  }}
                >
                  <button
                    className="bookNowButton"
                    onClick={DeleteCar}
                    style={{ textAlign: "center" }}
                  >
                    DELETE CAR
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
