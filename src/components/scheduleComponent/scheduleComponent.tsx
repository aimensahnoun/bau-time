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
      className="w-full h-[70vh]"
      src={schedule}
    ></iframe>
  );
};

export default ScheduleComponent;
