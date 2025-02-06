import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { FormEvent, useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, setId } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          await setDoc(doc(db, "usersInfo", user.uid), {
            name,
          });
          toast.success("Conta Criada com sucesso");
          setId(user.uid);
          navigate(`/login`, { replace: true });
        } catch (error) {
          toast.error("Preencha todos os campos");
        }
      }
    }
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos");
    }
    if (password != confirmPassword) {
      toast.error("As senhas devem ser iguais");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Link to={id === "" ? "/" : `/${id}`}>
        <h1 className="text-6xl font-bold text-white mt-11 mb-7 ">
          Dev
          <span className=" bg-gradient-to-r from-yellow-500 via-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        className="w-full max-w-xl flex flex-col px-2"
        onSubmit={handleRegister}
      >
        <Input
          placeholder="Digite o seu Nome..."
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Digite o seu Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
        />
        <Input
          placeholder="********"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={6}
        />
        <button
          className="bg-blue-600 rounded h-9 text-white border-0 cursor-pointer"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default RegisterPage;
