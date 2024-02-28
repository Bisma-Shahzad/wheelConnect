import { Container, Spinner } from "react-bootstrap";
// import BSInput from "../../component/BSInput";
import BSDatePicker from "../../components/BSDatePicker";
import { Box, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BSInput from "../../components/BSInput";
import BSButton from "../../components/BSButton";
import BSDateTimePicker from "../../components/BSDateTimePicker";
import { useRef, useState } from "react";
import {
  deletedata,
  postFbData,
  postFbDatacustomer,
} from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import "../../components/Navbar/Navbar.css";
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
import "../../components/Navbar/NewNavbar.css";
import SecondFooter from "../../components/SecondFooter";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function BookedCar() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location.state", location.state);
  let data = location.state;
  const dataFromRedux = useSelector((state) => state.AuthReducer.userData);
  // const dataFromRedux = useSelector((a) => a.Login);
  console.log("dataFromRedux", dataFromRedux);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs("YYYY-MM-DD"));
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs("YYYY-MM-DDT00:00")
  );
  const [isActive, setIsActive] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  let nav = useNavigate();

  // setBookedData({...bookedData, data: data})
  // console.log(bookedData)
  let cancelBooking = () => {
    // console.log(bookedData)
    setLoader(true);

    deletedata("customerbooking", data.customerid, data.customerBookingId)
      .then((res) => {
        console.log("res of cancel customerbooking", res);
        deletedata("customerbooking", data.userid, data.transporterBookingId)
          .then((res) => {
            setLoader(false);
            console.log("res of cancel transporterbooking", res);
            nav("/profile");
          })
          .catch((err) => {
            setLoader(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
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

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
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
              <a onClick={() => nav("/")} className="navbarlink">
                Home
              </a>
              <a onClick={() => nav("/about")} className="navbarlink">
                About
              </a>
              <a
                onClick={handleProfileClick}
                className="navbarlink"
                style={{ color: "#db2b39" }}
              >
                Profile
              </a>
              <a onClick={TransporterPage} className="navbarlink">
                Add Your Vehicle
              </a>
              <a onClick={handleLogoutButton} className="navbarlink">
                Logout
              </a>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </header>
          <Container>
            <div className="transporterbookedCar">
              <div>
                <div className="TransporterBookedCarImage">
                  <img src={data.image1} className="TransporterBookedCarpic" />
                </div>
              </div>
              <div style={{ width: "500px" }}>
                <div style={{ marginTop: "40px" }}>
                  <Typography
                    variant="h3"
                    style={{
                      textTransform: "uppercase",
                      padding: "5px",
                      width: "40vw",
                      paddingLeft: 0,
                    }}
                  >
                    {data.companyName} {data.modelName}
                  </Typography>
                </div>
                <div>
                  <h4
                    style={{ color: "#535969", padding: "5px", paddingLeft: 0 }}
                  >
                    Cost (per hour): {data.cost}
                  </h4>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    {/* <p className="bookedcarpara">Model:</p> */}
                    {/* <p className="bookedcarpara">Availability:</p> */}
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Booking id:
                      </span>{" "}
                      {data.customerBookingId}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Availability:
                      </span>{" "}
                      {data.available.join(", ")}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Booking Type:
                      </span>{" "}
                      {data.bookingType}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Description:
                      </span>{" "}
                      {data.description}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Engine Type:
                      </span>{" "}
                      {data.engineType}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Location:
                      </span>{" "}
                      {data.address}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Pick-up Time:
                      </span>{" "}
                      {data.selectedDateTime}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Drop-off Date:
                      </span>{" "}
                      {data.selectedDate}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Transporter:
                      </span>{" "}
                      {data.userName}
                    </p>
                    
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Transporter id:
                      </span>{" "}
                      {data.userid}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Transporter Name:
                      </span>{" "}
                      {data.userName}
                    </p>
                    <p className="bookedcarpara2">
                      <span
                        className="bookedcarpara"
                        style={{ marginRight: 10 }}
                      >
                        Transporter Booking id:
                      </span>{" "}
                      {data.transporterBookingId}
                    </p>
                  </div>
                </div>

                <div>
                  <h3>Verification Images:</h3>
                  <div style={{ textAlign: "center", marginTop: "50px" }}>
                    {[data.image5, data.image6].map((image, index) => (
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
                        onClick={() => openFullscreen(image)}
                      />
                    ))}
                  </div>
                </div>

                {/* Modal for fullscreen image */}
                <Modal
                  isOpen={fullscreenImage !== null}
                  onRequestClose={closeFullscreen}
                  contentLabel="Fullscreen Image"
                  ariaHideApp={false}
                >
                  <img
                    src={fullscreenImage}
                    alt="fullscreen"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <button onClick={closeFullscreen}>Close</button>
                </Modal>

                <div style={{ marginTop: 30 }}>
                  <button
                    className="bookNowButton"
                    onClick={cancelBooking}
                    style={{ textAlign: "center" }}
                  >
                    CANCEL BOOKING
                  </button>
                </div>
              </div>
            </div>
          </Container>
          {/* <Footer /> */}
          <div style={{ marginTop: 100 }}>
            <SecondFooter />
          </div>{" "}
        </>
      )}
    </>
  );
}
