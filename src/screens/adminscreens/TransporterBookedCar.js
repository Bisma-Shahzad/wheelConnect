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
import { useEffect, useRef, useState } from "react";
import {
  deletedata,
  getCustomerData,
  getprofileData,
  postFbData,
  postFbDataBooking,
  postFbDatacustomer,
  putFbDataBooking,
} from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import "../../components/Navbar/Navbar.css";
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
import "../../components/Navbar/NewNavbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../components/Navbar/main.css";
import "../../components/Navbar/NewNavbar.css";
import SecondFooter from "../../components/SecondFooter";
import Modal from "react-modal";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function TransporterBookedCar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navRef = useRef();
  console.log("location.state", location.state);
  let data = location.state;
  const dataFromRedux = useSelector((state) => state.AuthReducer.userData);
  // const dataFromRedux = useSelector((a) => a.Login);
  console.log("dataFromRedux", dataFromRedux);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renterData, setRenterData] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  console.log("renterData", renterData);

  let nav = useNavigate();

  // setBookedData({...bookedData, data: data})
  // console.log(bookedData)
  let getdata = () => {
    // setLoader(true);
    try {
      // const res = await getCustomerData("users", "User", data.customerid);
      getCustomerData("users", data.customerid)
        .then((res) => {
          // setLoader(false);
          console.log("res of getcustomerdata on transporterbookedcar", res);
          setRenterData(res);
          // nav('/cars')
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoader(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  let confirmBooking = () => {
    setLoader(true);
  
    // Update the status to "confirm" in the data object
    const updatedData = { ...data, status: "confirm" };
  
    putFbDataBooking("customerbooking", updatedData)
      .then(({ customerBookingId, transporterBookingId }) => {
        setLoader(false);
        // Use both IDs as needed
        console.log("Customer Booking ID:", customerBookingId);
        console.log("Transporter Booking ID:", transporterBookingId);
        nav("/");
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };

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
            nav("/transporterprofile");
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

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const handleBookingClick = () => {
    nav("/transporterprofile");
  };

  const handleAddVehicleClick = () => {
    nav("../addcars");
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
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
              <a onClick={handleProfileClick} className="navbarlink">
                Profile
              </a>
              <a
                onClick={TransporterPage}
                className="navbarlink"
                style={{ color: "#db2b39" }}
              >
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
                  <div>
                    <Typography
                      variant="h4"
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
                      style={{
                        color: "#535969",
                        padding: "5px",
                        paddingLeft: 0,
                      }}
                    >
                      Cost (per hour): {data.cost}
                    </h4>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p
                        className="bookedcarpara2"
                        style={{ textTransform: "capitalize" }}
                      >
                        <span
                          className="bookedcarpara"
                          style={{ marginRight: 10 }}
                        >
                          Renter Name:
                        </span>{" "}
                        {data.customeruserName}
                      </p>
                      <p className="bookedcarpara2">
                        <span
                          className="bookedcarpara"
                          style={{ marginRight: 10 }}
                        >
                          Renter id:
                        </span>{" "}
                        {data.customerid}
                      </p>
                      <p className="bookedcarpara2">
                        <span
                          className="bookedcarpara"
                          style={{ marginRight: 10 }}
                        >
                          Email:
                        </span>{" "}
                        {renterData.email}{" "}
                      </p>
                      <p className="bookedcarpara2">
                        <span
                          className="bookedcarpara"
                          style={{ marginRight: 10 }}
                        >
                          Contact:
                        </span>{" "}
                        {renterData.contact}
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
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Verification Images:</h3>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
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

                {/* <div style={{ marginTop: 30, marginBottom: 50 }}>
                  <button
                    className="bookNowButton"
                    onClick={confirmBooking}
                    style={{ textAlign: "center" }}
                  >
                    CONFIRM BOOKING
                  </button>
                </div> */}
                <div style={{ marginTop: 30, marginBottom: 50 }}>
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
