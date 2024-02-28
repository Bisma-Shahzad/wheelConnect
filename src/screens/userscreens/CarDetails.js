import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Container, Spinner } from "react-bootstrap";
// import BSButton from "../../component/BSButton"
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BSButton from "../../components/BSButton";
import BSScreenHeader from "../../components/BSScreenHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import Footer from "../../components/Footer/Footer";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import "../../components/Navbar/Navbar.css";
import "../../components/Navbar/NewNavbar.css";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SecondFooter from "../../components/SecondFooter";

export default function CarDetails() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const location = useLocation();
  console.log(location.state);
  console.log("userAuth on cardetails", userAuth);
  let data = location.state;
  let nav = useNavigate();

  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.image1);

  const handleSmallImageClick = (image) => {
    setSelectedImage(image);
  };
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  let bookcar = () => {
    if (userAuth == null) {
      const userType = "User"; // or any other value
      nav("/login", {
        state: userType,
      });
    } else {
      nav("/booknow", {
        state: data,
      });
    }
    console.log(data);
  };

  const handleLoginClick = () => {
    const userType = "User"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleListVehicle = () => {
    const userType = "Transporter"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const TransporterMainPage = (e) => {
    nav("/transportermainpage", {
      state: e,
    });
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  return (
    <>
      {loader ? (
        <Box
          sx={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center "
        >
          <Spinner animation="border" style={{}} />
        </Box>
      ) : (
        <>
          <header>
            <div onClick={() => nav("/")} className={`logo `}>
              <img
                src={require("../../Assets/Images/asdasdasdc.png")}
                style={{
                  width: "90px",
                  height: "90px",
                  marginTop: -9,
                  cursor: "pointer",
                }}
              />
            </div>
            <nav ref={navRef}>
              <a
                onClick={() => nav("/")}
                className="navbarlink"
                style={{ color: "#db2b39" }}
              >
                Home
              </a>
              <a onClick={() => nav("/about")} className="navbarlink">
                About
              </a>
              {userAuth ? (
                <a onClick={handleProfileClick} className="navbarlink">
                  Profile
                </a>
              ) : (
                <a onClick={handleLoginClick} className="navbarlink">
                  Login
                </a>
              )}
              {userAuth ? (
                <a onClick={TransporterPage} className="navbarlink">
                  Add Your Vehicle
                </a>
              ) : null}
              {userAuth ? (
                <a onClick={handleLogoutButton} className="navbarlink">
                  Logout
                </a>
              ) : null}
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </header>

          <Container>
            <div className="transporterbookedCar" style={{ marginBottom: 100 }}>
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
                </div>
                <div>
                  <h4 style={{ color: "#344263" }}>
                    <span style={{ fontWeight: "600" }}>
                      Cost (per hour)::{" "}
                    </span>
                    {data.cost}
                    {/* Cost (per hour): {data.cost} */}
                  </h4>
                </div>
                <div>
                  <div onClick={() => TransporterMainPage(data)}>
                    <h5
                      style={{
                        color: "red",
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontWeight: 600,
                      }}
                      onClick={() => TransporterMainPage(data)}
                    >
                      Transporter: {data.userName}
                    </h5>
                  </div>
                </div>
              </div>
              <div style={{ width: "500px", marginTop: 50 }}>
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
                  </p>
                </div>
                <div>
                  <h3 style={{ fontWeight: "600", marginTop: 20 }}>
                    Availability
                  </h3>
                  <h5>{data.available.join(", ")}</h5>
                </div>
                <div style={{ marginTop: 30, marginBottom: "20px" }}>
                  <button
                    className="bookNowButton"
                    onClick={bookcar}
                    style={{ textAlign: "center" }}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </Container>
          {/* <Footer /> */}
          <SecondFooter />
        </>
      )}
    </>
  );
}
