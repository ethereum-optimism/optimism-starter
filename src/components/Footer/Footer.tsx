import Twitter from "../../assets/social/twitter.svg";
import Medium from "../../assets/social/medium.svg";
import Instagram from "../../assets/social/instagram.svg";
import MainLogoSvg from "../../assets/main-logo.svg";
import { useMediaQuery } from "usehooks-ts";

const Footer = () => {
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const socialLinks = [
    {
      name: "Medium",
      url: Medium,
    },
    {
      name: "Twitter",
      url: Twitter,
    },
    {
      name: "Instagram",
      url: Instagram,
    },
  ];

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Optional if you want to skip the scrolling animation
    });
  };

  return (
    <footer className="flex flex-row items-center justify-around w-full mobile:px-4 tablet:px-8 desktop:px-16">
      <div className="flex flex-row items-center justify-start w-1/3">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="mr-4"
          >
            <img src={link.url} alt={link.name} />
          </a>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center w-1/3 ">
        <img
          className="w-[250px] h-[100px] cursor-pointer"
          src={MainLogoSvg}
          alt="Factor"
          onClick={() => scrollToTop()}
        />
      </div>
      <div className="flex flex-row items-center justify-end w-1/3">
        <div className="flex flex-row gap-4 ">
          <p className="cursor-pointer link-text">Privacy Policy</p>
          <p className="cursor-pointer link-text">Terms Of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
