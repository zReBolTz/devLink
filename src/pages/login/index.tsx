import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { FormEvent, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";
import { UserContext } from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { id, setId, setEmail } = useContext(UserContext);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!userEmail || !password) {
      toast.error("Preencha todos os campos ");
    }
    signInWithEmailAndPassword(auth, userEmail, password)
      .then(() => {
        if (
          auth.currentUser &&
          auth.currentUser.uid !== null &&
          auth.currentUser.email !== null
        ) {
          setId(auth.currentUser.uid);
          setEmail(auth.currentUser.email);
          setUserEmail("");
          setPassword("");
          navigate(`/admin`, { replace: true });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Credenciais inválidas");
            break;
          case "auth/user-not-found":
            toast.error("Usuário não encontrado");
            break;
          case "auth/wrong-password":
            toast.error("Senha incorreta");
            break;
          case "auth/email-already-in-use":
            toast.error("Este email já está em uso");
            break;
          case "auth/weak-password":
            toast.error("A senha é muito fraca");
            break;
          case "auth/network-request-failed":
            toast.error("Falha na conexão de rede");
            break;
        }
      });
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Link to="/">
        <h1 className="text-6xl font-bold text-white mt-11 mb-7 ">
          Dev
          <span className=" bg-gradient-to-r from-yellow-500 via-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        className="w-full max-w-xl flex flex-col px-2"
        onSubmit={handleLogin}
      >
        <Input
          placeholder="Digite o seu Email..."
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 rounded h-9 text-white border-0 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>

      <h1 className="text-white mt-2">
        Ainda não tem conta?{" "}
        <Link to="/register" className="font-medium text-blue-600">
          Cadastre-se
        </Link>{" "}
      </h1>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;
