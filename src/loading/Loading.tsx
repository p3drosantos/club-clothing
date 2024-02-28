import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
  return (
    <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] bg-gray-500 flex items-center justify-center ">
      <SyncLoader size={30} />
    </div>
  );
};

export default Loading;
