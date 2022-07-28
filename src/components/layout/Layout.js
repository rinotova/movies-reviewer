import NavbarComponent from './NavbarComponent';
import InputSearch from '../InputSearch';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <main className="max-w-[900px] flex flex-col my-0 mx-auto p-4 items-center">
        <InputSearch />
        <SearchSuggestions />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
