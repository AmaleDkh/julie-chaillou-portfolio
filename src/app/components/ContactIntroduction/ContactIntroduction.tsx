// Style
import "./ContactIntroduction.scss";

function ContactIntroduction() {
  return (
    <section className="contact__first-section">
      <h2 className="contact__first-section__title">
        CONSTRUISONS <span>ENSEMBLE</span> DES <span>PROJETS</span> UNIQUES
      </h2>

      <div className="contact__first-section__content">
        <p className="contact__first-section__question">
          Vous avez un projet en tête ou souhaitez collaborer ?
        </p>
        <p className="contact__first-section__paragraph">
          J’adore rencontrer de nouveaux talents et relever des défis créatifs.
          <br></br>
          Contactez-moi pour échanger sur vos idées, je serais ravie de discuter
          de la manière dont nous pouvons travailler ensemble.
        </p>
      </div>
    </section>
  );
}

export default ContactIntroduction;
