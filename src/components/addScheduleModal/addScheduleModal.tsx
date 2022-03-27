//React import
import { FunctionComponent, useState, useEffect, useRef } from "react";

//Component import
import Modal from "../modal/modal";

//Icons import
import { HiDocumentText } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

//utils import
import supabase from "../../utils/supabase";
import { uploadFile, avatarImage } from "../../utils/upload-file";

//Recoil
import { useRecoilValue } from "recoil";
import { Employee, employeesState } from "../../recoil/state";

//Form hook
import { useForm } from "react-hook-form";

//Id generator
import uniqid from "uniqid";

interface AddScheduleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  unitId: string | null;
}

const AddSchedule: FunctionComponent<AddScheduleProps> = ({
  isModalOpen,
  setIsModalOpen,
  unitId,
}) => {
  //UseState
  const [IsDraggedEnter, setIsDraggedEnter] = useState(false);
  const [schedule, setSchedule] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Ref
  const scheduleRef = useRef(null);

  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDraggedEnter(true);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0].type !== " application/pdf") return;
    setSchedule(e.dataTransfer.files[0]);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedEnter(false);
  };

  const handleSubmit = async () => {
    if (!schedule || isSubmitting) return;
    setIsSubmitting(true);

    console.log(unitId);

    const url = await uploadFile(schedule, "pdf");

    const { data, error } = await supabase
      .from("units")
      .update({ schedule: url })
      .match({ id: unitId });

    if (error) {
      console.log("smth went wrong");
    } else {
      setIsModalOpen(false);
      setSchedule(null)
    }

    setIsSubmitting(false);
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="Add Schedule">
      <input
        id="brief"
        type="file"
        ref={scheduleRef}
        className="hidden"
        accept="application/pdf"
        onChange={(e) => {
          setSchedule(e?.target?.files[0]);
        }}
      />
      <div className="flex flex-col gap-y-2 w-full h-full">
        {!schedule ? (
          <div
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="w-[20rem] h-[20rem] rounded-lg border-[1px] border-white border-dashed flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              scheduleRef.current?.click();
            }}
          >
            <span>Drag & Drop</span>
            <span>OR</span>
            <span>Click here</span>
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <HiDocumentText className="text-[1.5rem]" />
                <span>{schedule.name}</span>
              </div>
              <AiFillDelete
                className="text-[1.5rem] text-red-600 cursor-pointer"
                onClick={() => setSchedule(null)}
              />
            </div>

            <button
              className="w-fit h-[3rem] p-2 flex justify-center items-center bg-bt-dark-gray rounded-lg self-center"
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddSchedule;
