//React import
import { FunctionComponent } from "react";

interface ScheduleProps {
  schedule: string | null ;
}

const ScheduleComponent: FunctionComponent<ScheduleProps> = ({ schedule }) => {
  if (schedule === "" || schedule === null) return <div>No schedule</div>;
  return (
    <iframe
      id="iframepdf"
      className="w-full xl:h-[65vh] -mt-[1rem] 2xl:h-[70vh] overflow-auto"
      src={schedule}
    ></iframe>
  );
};

export default ScheduleComponent;
