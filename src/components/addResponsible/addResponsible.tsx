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

//Form import
import { useForm } from "react-hook-form";

//Utils import
import { uploadFile, avatarImage } from "../../utils/upload-file";
import supabase from "../../utils/supabase";

interface AddResponsibleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const AddResponsible: FunctionComponent<AddResponsibleProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const bosses = ["Mehmet Yiğit Tay", "Aylin Can", "Hamdi Bey", "Yiğit Şimşek"];

  //UseState
  // Checking if responsible input is active
  const [isResponsibleActive, setIsResponsibleActive] = useState(false);
  const [filteredBosses, setFilteredBosses] = useState(bosses);
  // Storing selected responsible name
  const [selectedResponsible, setSelectedResponsible] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //Use Ref
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

  //Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = async (data: FormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const imageUrl = profileImage
        ? await uploadFile(profileImage, "image")
        : avatarImage;

      const result = await fetch("/api/createResponsible", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const response = await result.json();
      await supabase.from("workers").insert({
        name: data.name,
        type: "Responsible",
        imgUrl: imageUrl,
        id: response.user.id,
      });

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  type FormValues = {
    name: string;
    email: string;
    password: string;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Add Unit Responsible"
    >
      <div className="flex flex-col w-[30rem]">
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-2">
            {/* Responsible full name input */}
            <span className="font-medium text-[1.1rem] mb-2">Full Name:</span>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
              placeholder="John Doe"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* Responsibe username input  */}
          <div className="relative flex flex-col">
            <span className="font-medium text-[1.1rem] mb-2">Email:</span>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
              placeholder="john.doe@bahcesehir.edu.tr"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* Responsibe password input  */}
          <div className="relative flex flex-col">
            <span className="font-medium text-[1.1rem] mb-2">Password:</span>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-[90%] md:w-[50%] h-[2rem] bg-bt-form-bg rounded-lg border-[1px] border-bt-dark-gray p-2 outline-none focus:border-gray-300 mb-2"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            className="p-2 w-fit h-[2.5rem] rounded-lg flex items-center cursor-pointer bg-bt-tab-bg mt-auto ml-auto"
            type="submit"
          >
            {isLoading ? "Sumbitting..." : "Add Responsible"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddResponsible;
