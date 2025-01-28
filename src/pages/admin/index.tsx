import { useState } from "react";
import Header from "../../components/header";
import Input from "../../components/input";
import { FiTrash } from "react-icons/fi";

const Admin = () => {
  const [linkInput, setLinkInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#121212");
  const [bgColorInput, setBgColorInput] = useState("#f1f1f1");
  return (
    <div className="flex flex-col items-center min-h-screen mt-7 px-2 ">
      <Header />
      <form className="w-full max-w-xl flex flex-col mt-8 mb-3">
        <label className="text-white mt-2 font-medium mb-2">Nome do link</label>
        <Input
          placeholder="Digite o nome do link..."
          type="text"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
        />
        <label className="text-white mt-2 font-medium mb-2">Url do link</label>
        <Input
          placeholder="Digite a url..."
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5 ">
          <div className="flex gap-2">
            <label className="text-white  font-medium ">Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium ">Cor do fundo</label>
            <input
              type="color"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>
        {linkInput !== "" && (
          <div className="flex justify-start items-center flex-col mb-7 p-2 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              <span>Veja como está ficando:</span>
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-2"
              style={{
                marginBottom: 0,
                marginTop: 0,
                backgroundColor: bgColorInput,
                color: textColorInput,
              }}
            >
              <p>{linkInput}</p>
            </article>
          </div>
        )}
        <button className="bg-blue-600 h-9 text-white font-medium rounded-md cursor-pointer mb-7">
          <span>Cadastrar</span>
        </button>
      </form>
      <h2 className="font-bold text-white text-2xl">Meus Links</h2>

      <article
        className="flex justify-between items-center w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: "#2563EB", color: "#fff" }}
      >
        <p>teste</p>
        <div>
          <button className="border border-dashed p-1 rounded">
            <FiTrash size={18} color="#fff" />
          </button>
        </div>
      </article>
    </div>
  );
};

export default Admin;
