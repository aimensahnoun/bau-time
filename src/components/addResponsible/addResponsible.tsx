//React import
import { FunctionComponent, useState, useEffect, useRef } from "react";

//NextJS import
import Image from "next/image";

//Component import
import Modal from "../modal/modal";

//Assets import
import Avatar from "../../../public/assets/avatar.png";

//Icons import
import { HiUpload } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

interface AddResponsibleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AddResponsible: FunctionComponent<AddResponsibleProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const bosses = ["Mehmet Yiğit Tay", "Aylin Can", "Hamdi Bey", "Yiğit Şimşek"];

  // Checking if responsible input is active
  const [isResponsibleActive, setIsResponsibleActive] = useState(false);

  const [filteredBosses, setFilteredBosses] = useState(bosses);

  // Storing selected responsible name
  const [selectedResponsible, setSelectedResponsible] = useState("");

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const imageRef = useRef<HTMLInputElement | null>(null);

  // Filtering responsible list based on input
  useEffect(() => {
    if (selectedResponsible === "") {
      return setFilteredBosses(bosses);
    }

    const newList = bosses.filter((boss) =>
      boss.toLowerCase().includes(selectedResponsible.toLowerCase())
    );
    setFilteredBosses(newList);
  }, [selectedResponsible]);

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Add Unit Responsible"
    >
      {/* Responsible image */}
      <div className="w-[5rem] h-[5rem] bg-bt-dark-gray rounded-lg self-center relative select-none">
        <Image
          src={profileImage ? URL.createObjectURL(profileImage) : Avatar}
          className="rounded-lg object-cover "
          width="100%"
          height="100%"
          alt="avatar"
        />
        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-x-1.5 justify-center items-center">
          <div
            onClick={() => {
              console.log(imageRef);
              if (imageRef.current === null) return;
              imageRef.current.click();
            }}
            className=" bg-bt-tab-bg h-[2rem] w-[2rem]  rounded-full flex justify-center items-center z-10"
          >
            <HiUpload className="text-white text-[1.3rem] cursor-pointer" />
          </div>
          <div
            onClick={() => {
              setProfileImage(null);
            }}
            className={`bg-bt-tab-bg h-[2rem] w-[2rem]  rounded-full justify-center items-center z-10 ${
              profileImage ? "flex" : "hidden"
            }`}
          >
            <AiFillDelete className="text-white text-[1.3rem] cursor-pointer" />
          </div>
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={imageRef}
          className="invisible"
          onChange={(e) => {
            if (e.target.files === null) return;
            setProfileImage(e.target.files[0]);
          }}
        />
      </div>

      {/* Responsible full name input */}
      <span className="font-medium text-[1.1rem] mb-2">Full Name:</span>
      <input
        type="text"
        className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
        placeholder="John Doe"
      />

      {/* Responsibe username input  */}
      <div className="relative flex flex-col">
        <span className="font-medium text-[1.1rem] mb-2">Username:</span>
        <input
          onFocus={() => setIsResponsibleActive(true)}
          onBlur={() => setIsResponsibleActive(false)}
          value={selectedResponsible}
          onChange={(e) => setSelectedResponsible(e.target.value)}
          type="text"
          className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
          placeholder="john.doe"
        />
      </div>

       {/* Responsibe password input  */}
       <div className="relative flex flex-col">
        <span className="font-medium text-[1.1rem] mb-2">Username:</span>
        <input
         
          type="password"
          className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
          placeholder="Password"
        />
      </div>


      {/* Submit */}
      <div
        className="p-2 w-fit h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg mt-auto ml-auto"
        onClick={() => setIsModalOpen(false)}
      >
        <span>Add Responsible</span>
      </div>
    </Modal>
  );
};

export default AddResponsible;
