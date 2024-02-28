import { Link, useNavigate } from "react-router-dom";
import "../../components/Navbar/Navbar.css";
import { useEffect, useState } from "react";
import { getIdData, postCarData, postMessageData } from "../../config/firebasemethods";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import "../../components/Navbar/NewNavbar.css";
import "../../components/Navbar/main.css";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SecondFooter from "../../components/SecondFooter";
import { Box, TextField } from "@mui/material";

export default function Contact() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [model, setModel] = useState({});
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  let getData = async () => {
    // console.log('userAuth?.instituteType: ', userAuth?.instituteType);
    setLoader(true);
    await getIdData("cars", "")
      .then((res) => {
        // console.log(res)
        // console.log('necha wala chal rha hain');
        const result = Object.values(res).flatMap((value) =>
          Object.values(value).map(
            ({
              ac,
              bluetooth,
              carName,
              cost,
              description,
              gps,
              id,
              image,
              modelname,
              usbPort,
              userName,
              userid,
              available,
            }) => ({
              ac,
              bluetooth,
              carName,
              cost,
              description,
              gps,
              id,
              image,
              modelname,
              usbPort,
              userName,
              userid,
              available,
            })
          )
        );

        // console.log(result);
        setLoader(false);
      })
      .catch((err) => {
        // console.log('no data found')
        setLoader(false);
      });
  };

  useEffect(() => {
    setModel({
      ...model,
      title: title,
      message: message,
      userid: userAuth.id,
    });
  }, [title, message, userAuth]);

  let add = () => {
    postMessageData("message", model)
      .then((res) => {
        console.log("res", res);
        alert("Message send successfully");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // async () => {
    setLoader(true);
    getData();
    // console.log('else is working');
    setLoader(false);
  }, [userAuth]);

  const handleListVehicle = () => {
    const userType = "Transporter"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleLoginClick = () => {
    const userType = "User"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleProfileClick = () => {
    nav("../profile");
    // console.log('ProfileButton')
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  return (
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
      <div
        style={{
          height: "100vh",
          //   display: 'flex',
          //   flexDirection: 'row',
        }}
      >
        <div
          style={{
            //   height: "100vh",
            textAlign: "center",
            marginTop: 40,
            marginBottom: 20,
            fontWeight: "bold",
            //   display: 'flex',
            //   flexDirection: 'row',
          }}
        >
          <h1>Contact Form</h1>
        </div>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            // marginTop: 10,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <TextField
            fullWidth
            label="Title"
            id="fullWidth"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            marginTop: 2,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <TextField
            fullWidth
            label="Message"
            id="fullWidth"
            multiline={true}
            rows={10}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <div style={{ marginTop: 30, marginLeft: "28%" }}>
          <button
            className="bookNowButton"
            onClick={add}
            style={{ textAlign: "center" }}
          >
            Send
          </button>
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <SecondFooter />
      </div>{" "}
    </>
  );
}
