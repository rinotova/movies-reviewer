import githubLogo from '../../img/github.png';

const Footer = () => {
  return (
    <footer className="mt-12 p-4 bg-white rounded-lg shadow flex items-center justify-center dark:bg-gray-800 border-t border-solid border-gray-500">
      <span className="flex items-center tex-center justify-centertext-sm text-white text-center">
        As seen on
        <a
          href="https://github.com/rinotova/movies-reviewer"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="ml-6"
            src={githubLogo}
            alt="GitHub Logo"
            width="32"
            height="32"
            loading="lazy"
          />
        </a>
      </span>
    </footer>
  );
};

export default Footer;
