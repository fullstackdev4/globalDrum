import show_Toast from "../../helpers/toast.helper";

const NoAccess = () => {
  return (
    <button
      onClick={() => {
        show_Toast({
          status: true,
          message: "You have no permission",
        });
      }}
    >
      Reason
    </button>
  );
};

export default NoAccess;
