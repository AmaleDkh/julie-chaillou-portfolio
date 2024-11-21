// Component
import Layout from "../../components/Layout/Layout";

// Style
import "./About.scss";

// Image
import Photo from "../../assets/image/photo.jpeg";

function About() {
  return (
    <Layout>
      <div className="about-content">
        <div className="about-content__photo-container">
          <img
            src={Photo}
            className="about-content__photo-container__photo"
          ></img>
          <div className="about-content__photo-container__square"></div>
        </div>

        <div>
          <h2 className="about-content__title">
            HELLO ! <br></br> MOI, C’EST <span>JULIE</span>. <br></br>
            <span>VIDÉASTE </span>
            PASSIONNÉE.
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            tristique felis a justo faucibus malesuada. Duis pretium risus eget
            sodales viverra. Nam id velit mollis, tincidunt tellus pretium,
            consequat ex.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
