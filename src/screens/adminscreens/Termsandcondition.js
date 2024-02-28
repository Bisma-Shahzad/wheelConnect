import { Link, useNavigate } from "react-router-dom";
import "../../components/Navbar/Navbar.css";
import { useEffect, useState } from "react";
import { getIdData } from "../../config/firebasemethods";
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

export default function About() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isActive, setIsActive] = useState(false);
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
      {/* <nav>
            <div onClick={() => nav('/')} className={`logo ${isActive ? 'hide' : ''}`}>
                <img src={require("../../Assets/Images/asdasdasdc.png")} style={{ width: '90px', height: '90px', marginTop: -13, cursor: 'pointer' }} />
            </div>
            <div className={`navitemsWithoutsearch ${isActive ? 'active' : ''}`}>
                <li>
                    <button onClick={() => nav('/about')} >
                        ABOUT
                    </button>
                </li>
                <li>
                    {userAuth?.instituteType == 'User' ? (
                        <button onClick={handleProfileClick} >
                            PROFILE
                        </button>
                    ) : (
                        <button onClick={handleLoginClick}>
                            LOGIN
                        </button>)}
                </li>
                <li>
                    {userAuth?.instituteType == 'User' ?
                        (
                            <button onClick={handleLogoutButton}  className={'logoutButton'}>
                                LOGOUT
                            </button>
                        ) : (
                            <button onClick={handleListVehicle} className={'listvehicle'} >
                                LIST YOUR VEHICLE
                            </button>)}
                </li>
                </div>
        </nav> */}
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
            <a
              onClick={TransporterPage}
              className="navbarlink"
              style={{ color: "#db2b39" }}
            >
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
      {/* <div className="mainbanner"></div> */}
      <Container>
        <h1 className="AboutMainHead">Terms And Condition </h1>
        <h3 className="AboutHeads">
          Welcome to WHEEL CONNECT – Your Ultimate Car Rental Platform!
        </h3>
        <p className="AboutPara">
          By utilizing our platform as a transporter, you acknowledge and agree
          to adhere to the following terms and conditions:
        </p>
        <h3 className="AboutHeads">Registration and Information Accuracy:</h3>
        <p className="AboutPara">
          By engaging as a transporter on our platform, you commit to providing
          accurate and up-to-date registration information. It is imperative
          that any changes to your contact details or operational status are
          promptly updated to maintain transparency and facilitate effective
          communication.
        </p>
        <h3 className="AboutHeads">Reliable and Safe Transportation:</h3>
        <p className="AboutPara">
          Transporters using our platform agree to offer reliable and safe
          transportation services for the vehicles rented through our system.
          This commitment encompasses adherence to all applicable laws and
          regulations governing the transportation industry to ensure a secure
          and compliant service.{" "}
        </p>
        <h3 className="AboutHeads">Open Communication with Renters:</h3>
        <p className="AboutPara">
          Maintaining open and timely communication with renters is fundamental
          to the success of our platform. Transporters pledge to provide regular
          updates on the status of vehicle transportation, fostering
          transparency and trust between the parties involved.
        </p>
        <h3 className="AboutHeads">Accurate Vehicle Listings:</h3>
        <p className="AboutPara">
          Transporters are entrusted with the responsibility of accurately
          listing vehicles on the platform. This includes providing
          comprehensive details such as make, model, year, color, capacity, and
          any special features or requirements, contributing to an informative
          and reliable user experience.
        </p>
        <h3 className="AboutHeads">Profile Presentation:</h3>
        <p className="AboutPara">
          The presentation of your profile is crucial in showcasing your
          services. The home page should offer an overview of your services and
          any ongoing promotions, while the about page is an opportunity to
          provide background information, including your experience, values, and
          mission statement.
        </p>
        <h3 className="AboutHeads">Highlighting Vehicle Features:</h3>
        <p className="AboutPara">
          Transporters may enhance their vehicle listings by highlighting
          specific features and amenities, such as GPS, AC, Bluetooth, or
          entertainment systems. Accurate representation of these features is
          essential to set clear expectations for renters.
        </p>
        <h3 className="AboutHeads">Image Upload Requirements:</h3>
        <p className="AboutPara">
          To provide a comprehensive view of listed vehicles, transporters are
          required to upload four images of each car, showcasing different
          angles, including the front, back, interior, and a side pose. This
          visual representation aids renters in making informed decisions.
        </p>
        <h3 className="AboutHeads">Efficient Booking Management:</h3>
        <p className="AboutPara">
          Transporters commit to managing bookings efficiently, confirming
          availability, type of car, color, model, and cost according to
          renters' needs. Timely communication is essential throughout the
          booking process to ensure a seamless experience.
        </p>
        <h3 className="AboutHeads">Confidentiality of Information:</h3>
        <p className="AboutPara">
          Transporters must uphold the confidentiality of sensitive information
          obtained during vehicle transportation, including renter details and
          vehicle conditions. This commitment ensures the privacy and security
          of all parties involved.
        </p>
        <h3 className="AboutHeads">Termination Clause:</h3>
        <p className="AboutPara">
          The Wheel Connect reserves the right to terminate the agreement with
          any transporter found in violation of these terms and conditions,
          without prior notice. This clause is in place to maintain the
          integrity of our platform and uphold the highest standards of service.
          If you have any questions or concerns, please reach out to our support
          team for assistance.
        </p>
      </Container>
      {/* <Footer /> */}
      <div style={{ marginTop: 100 }}>
        <SecondFooter />
      </div>{" "}
    </>
  );
}
