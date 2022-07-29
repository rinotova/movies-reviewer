import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import reviewer from '../../img/reviewer.png';

const NavbarComponent = () => {
  return (
    <header className="min-w-full border-b-4 border-solid border-gray-500 mb-4 pt-2">
      <Navbar fluid={true} rounded={false}>
        <NavLink to="/movies">
          <div className="flex items-center">
            <img
              src={reviewer}
              className="h-9 w-9 md:h-14 md:w-14 mr-3"
              alt="Reviewer"
              loading="lazy"
            />
            <div className="min-w-full font-teko text-3xl md:text-4xl text-amber-600">
              The movies reviewer
            </div>
          </div>
        </NavLink>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <li>
            <NavLink to="/movies">
              <span className="font-teko text-xl md:text-2xl dark:text-white dark:hover:text-amber-600">
                All Movies
              </span>
            </NavLink>
          </li>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavbarComponent;
