import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FunctionComponent } from "react";
import ActionCard from "../../components/ActionCard";
import { pageAction } from "../../constants/PageActions";

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen p-4 mx-auto gap-4">
      <h1 className="w-full text-white font-bold text-center mb-4 text-3xl">
        Marketing Email
      </h1>
      <div className="w-full grid grid-cols-4 gap-6">
        {pageAction.map((action) => (
          <ActionCard
            key={action.to}
            to={action.to}
            icon={
              <FontAwesomeIcon icon={action.icon} color="black" size="xl" />
            }
            label={action.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
