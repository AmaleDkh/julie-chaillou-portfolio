// Component
import Layout from "../../components/Layout/Layout";

// Style
import "./About.scss";

// Image
import Photo1 from "../../assets/image/photo1.webp";
import Photo2 from "../../assets/image/photo2.webp";

function About() {
  return (
    <Layout>
      <div className="about-content">
        <section className="about-content__first-section">
          <div className="about-content__first-section__photo-container">
            <img
              src={Photo1}
              alt="Première présentation de Julie Chaillou"
              className="about-content__first-section__photo-container__photo"
            ></img>
            <div className="about-content__first-section__photo-container__square"></div>
          </div>

          <div className="about-content__first-section__text">
            <h2 className="about-content__first-section__text__title">
              HELLO ! <br></br> MOI, C’EST <span>JULIE</span>. <br></br>
              <span>VIDÉASTE </span>
              PASSIONNÉE.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tristique felis a justo faucibus malesuada. Duis pretium risus
              eget sodales viverra. Nam id velit mollis, tincidunt tellus
              pretium, consequat ex.
            </p>
          </div>
        </section>

        <section className="about-content__second-section">
          <div>
            <h2 className="about-content__second-section__title">
              LOREM IPSUM
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              tristique felis a justo faucibus malesuada. Duis pretium risus
              eget sodales viverra. Nam id velit mollis, tincidunt tellus
              pretium, consequat ex.
            </p>
          </div>

          <div className="about-content__second-section__photo-container">
            <img
              src={Photo2}
              alt="Deuxième présentation de Julie Chaillou"
              className="about-content__second-section__photo-container__photo"
            ></img>
            <div className="about-content__second-section__photo-container__square"></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
