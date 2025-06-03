import React from "react";
import { Link } from "react-router-dom";

interface ActionCardProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ to, icon, label }) => {
  return (
    <Link to={to} className="ctn-grd-mormal">
      <div className="action-ic">{icon}</div>
      <p className="action-name">{label}</p>
    </Link>
  );
};

export default ActionCard;
