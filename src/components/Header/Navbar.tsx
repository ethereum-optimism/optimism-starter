// App
import { useState } from "react";
import { NavLink as OriginalNavLink, useMatch } from "react-router-dom";

// Utils
import { appRoutes } from "../../lib/appRoutes";

interface NavbarItem {
  title: string;
  path: string;
  isDisabled?: boolean;
}

interface CustomNavLinkProps {
  item: NavbarItem;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ item }) => {
  const match = useMatch(item.path);
  const isActive = !!match;

  return (
    <OriginalNavLink
      to={item.path}
      className={
        isActive
          ? "[text-decoration:none] font-open_sans font-bold text-sm tracking-[0.5px] leading-[28px] gradiant-color text-left cursor-pointer hover:transition-all duration-200"
          : "[text-decoration:none] font-open_sans font-bold text-sm tracking-[0.5px] leading-[28px] text-body_light_dark text-left cursor-pointer hover:text-gray-900 hover:transition-all duration-200"
      }
    >
      {item.title}
      {isActive ? (
        <hr className="w-9 mx-auto text-primary_brand_01 h-0.5 mt-1" />
      ) : (
        <div className="mt-1" />
      )}
    </OriginalNavLink>
  );
};
const Navbar = () => {
  const navbarItems = [
    {
      path: appRoutes.home_path,
      isDisabled: false,
      title: "Mint",
    },
  ];

  return (
    <>
      <nav className="flex flex-row h-[80px] items-center justify-center flex-grow">
        <ul className="flex flex-row justify-center items-center list-none">
          {navbarItems.map((item: NavbarItem) => {
            if (item.isDisabled) {
              return (
                <div
                  className="flex flex-col text-body_light_dark w-36"
                  key={item.title}
                >
                  <li className="[text-decoration:none] text-xs tracking-[0.5px] leading-[28px] text-center no-break-word pt-3 font-bold">
                    {item.title}
                  </li>
                  <p className="text-4xs text-center no-break-word font-bold">
                    soon!
                  </p>
                </div>
              );
            }
            return (
              <li
                key={item.title}
                className="flex flex-col justify-center items-center w-40"
              >
                <CustomNavLink item={item} />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
