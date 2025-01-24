import { Link, replace, useAsyncValue, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha todos os Campos");
    }
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/admin", { replace: true });
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
};

export default Login;
