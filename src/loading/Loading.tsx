import SyncLoader from "react-spinners/SyncLoader";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-blackrgba flex flex-col items-center justify-center z-10 ">
      {message && (
        <p className="text-white text-xl font-medium max-w-[50%] mb-6 text-center">
          {message}
        </p>
      )}
      <SyncLoader size={30} />
    </div>
  );
};

export default Loading;
