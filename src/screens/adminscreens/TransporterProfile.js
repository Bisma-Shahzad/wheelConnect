import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getIdData,
  getprofileData,
  userLogout,
} from "../../config/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import "../../components/Navbar/Navbar.css";
import UserCard from "../../components/UserCard";
import { Box } from "@mui/material";
import "../../components/Navbar/NewNavbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../components/Navbar/main.css";
import "../../components/Navbar/NewNavbar.css";
import SecondFooter from "../../components/SecondFooter";

export default function TransporterProfile() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [confirmData, setConfirmData] = useState([]);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  console.log("userAuth at profile", userAuth.id);

  // let getdata = async () => {
  //     // setLoader(true)
  //     await getprofileData("customerbooking", userAuth.id, '')
  //         .then((res) => {
  //             // setLoader(false)
  //             console.log('res of customerBooking', res)

  //             setListData(res);
  //         })
  //         .catch((err) => {
  //             console.log('no data found')
  //             // setLoader(false)
  //         });
  // };

  let getdata = async () => {
    // setLoader(true);
    try {
      const res = await getprofileData("customerbooking", userAuth.id, "");
      setListData(res);
      // setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoader(false);
    }
  };

  // let getConfirmdata = async () => {
  //   setLoader(true);
  //   try {
  //     const res = await getprofileData("confirmbooking", userAuth.id, "");
  //     // setListData(res);
  //     setLoader(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    getdata();
  }, []);

  let getConfirmdata = async () => {
  //   // setLoader(true);
    try {
      const confirmRes = await getprofileData("confirmbooking", userAuth.id, "");
      console.log("confirmRes on Profile", confirmRes);
  //     const confirmDataIds = confirmRes.map(item => item.id);
  
  //     const updatedListData = listData.map(item => ({
  //       ...item,
  //       status: confirmDataIds.includes(item.id) ? "Confirm" : false
  //     }));
  
  //     setListData(updatedListData);
  //     // setLoader(false);
    } catch (error) {
      console.error("Error fetching confirm data:", error);
      // setLoader(false);
    }
  };
  
  useEffect(() => {
    getConfirmdata();
  }, [listData]);

  console.log("listData on Profile", listData);

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

  const handleBookingListing = (e) => {
    nav("/transporterbookedcar", {
      state: e,
    });
    // console.log(e)
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

  const filteredListData = listData.filter(
    (item) => item.userid === userAuth.id
  );

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
            <div style={{height: '100vh'}}>
              <h3 className="AboutHeads2">BOOKINGS:</h3>
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
                  {filteredListData.length === 0 ? (
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <h4 className="AboutHeads">No Bookings...</h4>
                    </div>
                  ) : (
                    <div style={{}}>
                      <ol>
                        {filteredListData.map((x, i) => {
                          return (
                            <li
                              style={{
                                marginTop: "30px",
                                cursor: "pointer",
                                border: "1px outset rgba(40, 48, 67, 0.2)",
                              }}
                              onClick={() => handleBookingListing(x)}
                            >
                              <div>
                                <img
                                  src={x.image1}
                                  width="130px"
                                  height="80px"
                                />
                                <span style={{ marginLeft: "10px" }}>
                                  {x.companyName} {x.modelName}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
          <div style={{ marginTop: "300px" }}>
            {/* <Footer /> */}
            <SecondFooter />
          </div>
        </>
      )}
    </>
  );
}
