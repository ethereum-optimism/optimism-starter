import React from "react";

interface BadgeProps {
  title: string;
  icon: string;
  subTitle: string;
  description: string;
}

const Badge = (props: BadgeProps) => {
  const { title, icon, subTitle, description } = props;

  return (
    <div className="badge">
      <div className="badge-icon">
        <img src={icon} alt={`${title} icon`} />
      </div>
      <div className="badge-content">
        <h2 className="badge-title">{title}</h2>
        <h3 className="badge-subtitle">{subTitle}</h3>
        <p className="badge-description">{description}</p>
      </div>
    </div>
  );
};

export default Badge;
