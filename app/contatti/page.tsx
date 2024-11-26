// app/contatti/page.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Contatti = () => {
  return (
    <div className="flex flex-col items-center py-60 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">Contattaci</h1>

      <div className="text-xl">
        <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-red-700" />
        <span>+39 123 456 7890</span>
      </div>

      <div className="flex space-x-6 text-2xl text-red-700 hover:text.red-500">
        <a
          href="https://www.instagram.com/tuoaccount"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/tuoaccount"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.twitter.com/tuoaccount"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  );
};

export default Contatti;
