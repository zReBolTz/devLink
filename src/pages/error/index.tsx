import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen text-white">
      <h1 className="font-bold text-8xl">404</h1>
      <span className="text-3xl">Página não encontrada</span>
      <Link to="/" className="mt-5 bg-blue-600 text-white px-5 py-1 rounded-md">
        Voltar
      </Link>
    </div>
  );
};

export default ErrorPage;
