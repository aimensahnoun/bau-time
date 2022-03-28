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

const AddAssitant: FunctionComponent<AddScheduleProps> = ({
  isModalOpen,
  setIsModalOpen,
  unitId,
}) => {
  //UseState
  const [IsDraggedEnter, setIsDraggedEnter] = useState(false);
  const [schedule, setSchedule] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passport, setPassport] = useState<File | null>(null);
  const [residence, setResidence] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);

  //Ref
  const scheduleRef = useRef(null);

  //Form hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (d) => {
    if (isSubmitting || !passport || !image || !insurance || !residence) return;
    setIsSubmitting(true);

    const urls = [];

    for (const file of [passport, image, insurance, residence]) {
      const url = await uploadFile(file, "file");
      urls.push(url);
    }

    const { data, error } = await supabase.from("workers").insert({
      name: d.name,
      type: "Assistant",
      imgUrl: urls[1],
      id: uniqid(),
      office: unitId,
      startingDate: d.startingDate,
      endDate: d.endDate,
      department: d.department,
      year: d.year,
      iban: d.iban,
      passport: urls[0],
      residence: urls[3],
      insurance: urls[2],
      studentNumber: d.studentNumber,
      isCreated: true,
      isDeleted : false
    });

    if (error) console.log("smth went wrong");
    setPassport(null);
    setImage(null);
    setInsurance(null);
    setResidence(null);

    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Add Assistant"
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name field */}
        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Assistant Full Name:</span>
          <input
            {...register("name", { required: true })}
            className="w-[32.5rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
            type="text"
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Dates field */}
        <div className="flex gap-x-10">
          {/* Starting Date field */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">Starting date:</span>
            <input
              {...register("startingDate", { required: true })}
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="date"
            />
            {errors.startingDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          {/* Leaving Date field */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">End date:</span>
            <input
              {...register("endDate", { required: true })}
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="date"
            />
            {errors.endDate && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>

        {/* Student Number Field */}
        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Student Number:</span>
          <input
            className="w-[32.5rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
            type="number"
            placeholder="1801539"
            {...register("studentNumber", { required: true })}
          />
          {errors.department && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Department Field */}
        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Department:</span>
          <input
            className="w-[32.5rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
            type="text"
            placeholder="Computer Engineering"
            {...register("department", { required: true })}
          />
          {errors.department && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Year Field */}
        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Year:</span>
          <input
            {...register("year", { required: true })}
            className="w-[32.5rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
            type="text"
            placeholder="4th year"
          />
          {errors.year && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Iban Field */}
        <div className="flex flex-col gap-y-2">
          <span className="font-medium">Iban:</span>
          <input
            {...register("iban", { required: true })}
            className="w-[32.5rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
            type="text"
            placeholder="TR130006400000110891105407"
          />
          {errors.iban && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        {/* Documents fields */}
        <div className="flex gap-x-10">
          {/* Assitant photo */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">Assistant Image:</span>
            <input
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          {/* Assitant Passport field */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">Assitant Passport:</span>
            <input
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="file"
              accept="image/* ,application/pdf"
              onChange={(e) => {
                setPassport(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="flex gap-x-10">
          {/* Residence Permit */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">Residence permit:</span>
            <input
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="file"
              accept="image/* ,application/pdf"
              onChange={(e) => {
                setResidence(e.target.files[0]);
              }}
            />
          </div>
          {/* Insurance form field */}
          <div className="flex flex-col gap-y-2">
            <span className="font-medium">Insurance Form:</span>
            <input
              className="w-[15rem] h-[3rem] p-2 bg-bt-dark-gray rounded-lg outline-none"
              type="file"
              accept="image/* ,application/pdf"
              onChange={(e) => {
                setInsurance(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <button type="submit" className="p-2 bg-bt-dark-gray rounded-lg">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
};

export default AddAssitant;
