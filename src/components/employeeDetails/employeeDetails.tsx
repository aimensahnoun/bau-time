//React import
import { FunctionComponent } from "react";

//Component import
import Modal from "../modal/modal";
import CustomImage from "../customImage/customImage";

//Recoil import
import { useRecoilValue } from "recoil";
import { selectedEmployeeState, unitsState } from "../../recoil/state";

interface EmployeeDetails {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const EmployeeDetails: FunctionComponent<EmployeeDetails> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const selectedEmployee = useRecoilValue(selectedEmployeeState);
  const units = useRecoilValue(unitsState);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Employee Details"
    >
      <div className="flex flex-col gap-y-4 select-text">
        {/* Employee Avatar */}
        <div className="h-[4rem] w-[4rem] rounded-full relative self-center">
          <CustomImage
            className="h-[4rem] w-[4rem]  rounded-full"
            height="100%"
            width="100%"
            layout="fill"
            alt="user image"
            src={selectedEmployee?.imgUrl}
          />
        </div>

        {/* Employee name */}
        <div className="flex flex-col">
          <span className="font-medium">Employee Name:</span>
          <span>{selectedEmployee?.name}</span>
        </div>

        {/* Employee Type */}
        <div className="flex flex-col">
          <span className="font-medium">Employee Type:</span>
          <span>{selectedEmployee?.type}</span>
        </div>

        {/* Employee Office */}
        <div className="flex flex-col">
          <span className="font-medium">Employee Office:</span>
          <span>
            {
              units.filter((unit) => {
                return unit.id === selectedEmployee?.office;
              })[0]?.name
            }
          </span>
        </div>

        {selectedEmployee?.type === "Assistant" && (
          <>
            {/* Employee student number */}
            <div className="flex flex-col">
              <span className="font-medium">Employee Student Number:</span>
              <span>{selectedEmployee?.studentNumber}</span>
            </div>

            {/* Employee department */}
            <div className="flex flex-col">
              <span className="font-medium">Employee Department:</span>
              <span>{selectedEmployee?.department}</span>
            </div>

            {/* Employee department */}
            <div className="flex flex-col">
              <span className="font-medium">Employee Year:</span>
              <span>{selectedEmployee?.year}</span>
            </div>

            {/* Employee IBAN */}
            <div className="flex flex-col">
              <span className="font-medium">Employee IBAN:</span>
              <span>{selectedEmployee?.iban}</span>
            </div>

            {/* Employee Starting Date */}
            <div className="flex items-center gap-x-8">
              <div className="flex flex-col">
                <span className="font-medium">Employee Starting Date:</span>
                <span>{selectedEmployee?.startingDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Employee End Date:</span>
                <span>{selectedEmployee?.endDate}</span>
              </div>
            </div>

            {/* Employee Passport and residence permit */}
            <div className="flex items-center gap-x-8">
              <div className="flex flex-col">
                <span className="font-medium">Employee Passport:</span>
                <span
                  onClick={() =>
                    window.open(selectedEmployee?.passport, "_blank")
                  }
                  className="cursor-pointer"
                >
                  Download Document
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Employee Residence Permit:</span>
                <span
                  onClick={() =>
                    window.open(selectedEmployee?.residence, "_blank")
                  }
                  className="cursor-pointer"
                >
                  Download Document
                </span>
              </div>
            </div>

            {/* Employee Insurance and image */}
            <div className="flex items-center gap-x-8">
              <div className="flex flex-col">
                <span className="font-medium">Employee Insurance:</span>
                <span
                  onClick={() =>
                    window.open(selectedEmployee?.insurance, "_blank")
                  }
                  className="cursor-pointer"
                >
                  Download Document
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Employee Image:</span>
                <span
                  onClick={() =>
                    window.open(selectedEmployee?.imgUrl, "_blank")
                  }
                  className="cursor-pointer"
                >
                  Download Document
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EmployeeDetails;
