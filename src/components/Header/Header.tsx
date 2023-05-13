import { useState, useEffect } from "react";
import MainLogo from "./MainLogo";
import Navbar from "./Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMediaQuery } from "usehooks-ts";

const Header = () => {
  const isMobileView = useMediaQuery("(max-width:900px)");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isMobileView
          ? `fixed top-0 flex flex-row w-full z-50 h-[80px] ${
              isScrolled ? "bg-ui_surface_opc rounded-b-3xl " : ""
            }`
          : "h-[120px]"
      } flex flex-row items-center mobile:justify-between desktop:justify-start mobile:px-4 tablet:px-8 desktop:px-16 transition-all duration-200 border-bottom-header shadow-lg w-full`}
    >
      <MainLogo />
      {!isMobileView && <Navbar />}

      <ConnectButton
        label="Connect Wallet"
        chainStatus="icon"
        accountStatus="address"
        showBalance={false}
      />
    </header>
  );
};

export default Header;
