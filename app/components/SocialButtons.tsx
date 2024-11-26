import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

interface SocialButtonsProps {
  children: React.ReactNode;
}

const SocialButtons: React.FC<SocialButtonsProps> = () => {
  return (
    <div className="flex space-x-4">
      {/* Bottone Instagram */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full p-3 hover:shadow-lg transition"
      >
        <FontAwesomeIcon icon={faInstagram} size="lg" />
      </a>

      {/* Bottone Facebook */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white rounded-full p-3 hover:shadow-lg transition"
      >
        <FontAwesomeIcon icon={faFacebook} size="lg" />
      </a>

      {/* Bottone TikTok */}
      <a
        href="https://www.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white rounded-full p-3 hover:shadow-lg transition"
      >
        <FontAwesomeIcon icon={faTiktok} size="lg" />
      </a>
    </div>
  );
};

export default SocialButtons;
