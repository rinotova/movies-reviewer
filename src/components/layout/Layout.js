import NavbarComponent from './NavbarComponent';

const Layout = (props) => {
  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <main className="max-w-[900px] flex flex-col my-0 mx-auto p-4 items-center">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
