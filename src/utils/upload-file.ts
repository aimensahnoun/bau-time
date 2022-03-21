//Web3Storage import
import { Web3Storage } from "web3.storage";
import imageCompression from "browser-image-compression";

export const avatarImage =
  "https://bafybeihj2j6solt4kbl6doc7w2vw7e5eqgc66fsuzpattjnn4mjhxici7y.ipfs.dweb.link/avatar.png";

var options = {
  maxSizeMB: 1,
  useWebWorker: true,
};

const token = process.env.NEXT_PUBLIC_STORAGE_API;
const client = new Web3Storage({ token });

export const uploadFile = async (file: File, type: string) => {
  if (!file) return;

  const fileName = file.name.replace(/ /g, "");

  var blob = file.slice(0, file.size, file.type);
  const newFile = new File([blob], fileName, { type: file.type });

  let finalFile = newFile;

  try {
    if (type === "image") finalFile = await imageCompression(newFile, options);

    const cid = await client.put([finalFile]);

    return `https://${cid}.ipfs.dweb.link/${fileName}`;
  } catch (e) {
    console.log(e);
  }
};
