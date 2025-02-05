import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase/firebaseConnection";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

const Header = () => {
  const { id, setId } = useContext(UserContext);

  function handlesignOut() {
    setId("");
    signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-3 font-medium">
          <Link to={`/${id}`}>
            <span>Home</span>
          </Link>
          <Link to="/admin">
            <span>Admin</span>
          </Link>
          <Link to="/admin/social">
            <span>Redes Sociais</span>
          </Link>
        </div>
        <button className="cursor-pointer" onClick={handlesignOut}>
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
