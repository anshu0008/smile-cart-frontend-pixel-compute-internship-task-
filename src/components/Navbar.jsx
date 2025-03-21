import { LeftArrow } from "neetoicons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = ({ title, shouldShowBackButton = true, actionBlock }) => {
  const history = useHistory();

  return (
    <div className="m-2">
      <div className="mx-6 mb-2 mt-6 flex items-end justify-between">
        <div className="text-black-400 flex cursor-pointer items-center gap-2 text-4xl font-semibold">
          {shouldShowBackButton && (
            <LeftArrow className="mr-6" onClick={history.goBack} />
          )}
          <h1 className="text-black-400 text-4xl font-bold">{title}</h1>
        </div>
        {actionBlock}
      </div>
      <hr className="border-2 border-black" />
      <br />
    </div>
  );
};

export default Navbar;
