import { FC } from "react";

// Optional: If you want to pass a custom message or other props, define them here
interface NoDataProps {
  message?: string;
  // any other props you might want
}

const NoData: FC<NoDataProps> = ({ message }) => {
  return (
    <div>
      <h2>{message || "No Data Available"}</h2>
      <p>We couldn't find any data to display. Please try again later.</p>
    </div>
  );
};

export default NoData;
