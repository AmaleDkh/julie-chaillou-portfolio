// Components
import Layout from "../../src/app/components/Layout/Layout";
import ContactIntroduction from "../../src/app/components/ContactIntroduction/ContactIntroduction";
import SocialMediaContact from "../../src/app/components/SocialMediaContact/SocialMediaContact";

// Style
import "../../assets/style/Global.scss";
import "./contact.scss";

function Contact() {
  return (
    <Layout>
      <div className="contact-content-page">
        <div className="contact-content">
          <ContactIntroduction />
          <div className="contact-content__line"></div>
          <SocialMediaContact />
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
