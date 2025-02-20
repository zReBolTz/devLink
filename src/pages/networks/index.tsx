import { FormEvent, useContext, useEffect, useState } from "react";
import Header from "../../components/header";
import Input from "../../components/input";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { UserContext } from "../../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Network = () => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  const { id } = useContext(UserContext);

  async function handleSaveSocials(e: FormEvent) {
    e.preventDefault();
    await setDoc(doc(db, "social", id), {
      userId: id,
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    });
    toast.success("Link salvo com sucesso!");
  }

  useEffect(() => {
    async function loadingLinks() {
      const docRef = doc(db, "social", id);
      await getDoc(docRef).then((snapshot) => {
        if (snapshot !== undefined) {
          setFacebook(snapshot.data()?.facebook || "");
          setInstagram(snapshot.data()?.instagram || "");
          setYoutube(snapshot.data()?.youtube || "");
        }
      });
    }
    loadingLinks();
  }, []);
  return (
    <div className="flex flex-col min-h-screen mwx-w-xl w-full items-center mt-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>
      <form
        className="flex flex-col max-w-xl w-full "
        onSubmit={handleSaveSocials}
      >
        <label className="font-medium text-white mt-2 mb-2">Facebook</label>
        <Input
          type="url"
          placeholder="https://www.facebook.com/BillGates/ "
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="font-medium text-white mt-2 mb-2">Instagram</label>
        <Input
          type="url"
          placeholder="https://www.instagram.com/stevejobsok/"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="font-medium text-white mt-2 mb-2">Youtube</label>
        <Input
          type="url"
          placeholder="https://www.youtube.com/@MrBeast"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button className="bg-blue-600 h-9 text-white font-medium rounded-md cursor-pointer ">
          Salvar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Network;
