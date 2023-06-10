import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { ArrowButton } from '../ArrowButton';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/home" className="logo footer__logo">
          <Logo />
        </Link>

        <nav className="footer__navigation">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <Link to="/" className="footer__nav-link">Github</Link>
            </li>

            <li className="footer__nav-item">
              <Link to="/" className="footer__nav-link">Contacts</Link>
            </li>

            <li className="footer__nav-item">
              <Link to="/" className="footer__nav-link">rights</Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="footer__arrow-up"
        >
          Back to top
          <ArrowButton />
        </button>
      </div>
    </footer>
  );
};
