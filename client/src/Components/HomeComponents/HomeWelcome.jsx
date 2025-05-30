import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import { InputGroup, Form } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import "./styles/homeComponent.css";

const HomeWelcome = () => {
  // const [textContent, setText]
  const isTab = useMediaQuery({
    query: "(max-width: 768px)",
  });


  return (
    <div className="home-welcome-container">
      <Container className="home-welcome-left-container">
        <div>
          <h1>
            Power up Your Electric <br/> Vehicle with Our Convenient <br/> {" "}
            <span className="charging-word">Charging</span> Solutions
          </h1>
          <p>
            Fast, Reliable, and Eco-friendly Charging for Your Electric Vehicle.
          </p>
        </div>
        <div className="home-search-container">
          <InputGroup>
            <InputGroup.Text>
              <FaLocationDot />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search Nearby Charging Point."
            />
          </InputGroup>
          <button>Search</button>
        </div>
      </Container>
      <Container className="home-welcome-img-div">
        <Image
          src="https://static.wixstatic.com/media/ff73f8_81895a0a8ea44ef6ac6453c066115b29~mv2.jpg/v1/fill/w_1101,h_771,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ff73f8_81895a0a8ea44ef6ac6453c066115b29~mv2.jpg"
          alt="img"
        />
      </Container>
    </div>
  );
};
export default HomeWelcome;
