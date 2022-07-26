import { Navbar } from 'flowbite-react';

const NavbarComponent = () => {
  return (
    <header className="min-w-full border-b-4 border-double border-gray-500 mb-8 pt-2">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <div className="min-w-full text-3xl md:text-4xl">
            The movies reviewer
          </div>
        </Navbar.Brand>
      </Navbar>
    </header>
  );
};

export default NavbarComponent;
