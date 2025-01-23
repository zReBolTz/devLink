import Social from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const home = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center py-4">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Willian Ferreira
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇🏻</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg cursor-pointer select-none transition-transform hover:scale-105">
          <p className="text-base md: text-lg">Canal do Youtube</p>
        </section>
        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://www.youtube.com/@thezreboltz5974">
            <FaFacebook size={35} color="white" />
          </Social>
          <Social url="https://www.youtube.com/@thezreboltz5974">
            <FaYoutube size={35} color="white" />
          </Social>
          <Social url="https://www.youtube.com/@thezreboltz5974">
            <FaInstagram size={35} color="white" />
          </Social>
        </footer>
      </main>
    </div>
  );
};

export default home;
