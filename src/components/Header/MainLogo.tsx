import { Link } from "react-router-dom";

// Components
import MainLogoSVG from "../../assets/main-logo.svg";
import { useMediaQuery } from "usehooks-ts";
import { appRoutes } from "../../lib/appRoutes";

const MainLogo = () => {
  const isMobileView = useMediaQuery("(max-width:800px)");
  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional if you want to skip the scrolling animation
    });
  };
  return (
    <div
      className="flex justify-between items-center desktop:w-auto"
      onClick={() => scrollToTop()}
    >
      <Link to={appRoutes.home_path}>
        <img
          className={isMobileView ? `w-[110px] h-[40px]` : `w-[308px] h-[72px]`}
          src={MainLogoSVG}
          alt="Factor"
        />
      </Link>
    </div>
  );
};

export default MainLogo;
