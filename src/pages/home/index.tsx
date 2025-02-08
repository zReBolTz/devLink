import { useEffect, useState } from "react";
import Social from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { Link, Navigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";

const home = () => {
  interface linkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
  }
  const { id } = useParams();

  interface socialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
  }
  const [links, setLinks] = useState<linkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<socialLinksProps>();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function loadLinks() {
      const collectionRef = collection(db, "links");
      const queryRef = query(
        collectionRef,
        where("userId", "==", `${id}`),
        orderBy("created", "asc")
      );

      getDocs(queryRef).then((snapshot) => {
        let list = [] as linkProps[];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            bg: doc.data().bgColor,
            color: doc.data().color,
            url: doc.data().url,
          });
        });
        setLinks(list);
        setIsLoading(false);
      });
    }

    loadLinks();
  }, [id]);

  useEffect(() => {
    async function loadingUserInfo() {
      const docRef = doc(db, "usersInfo", id || "EtT8gKPRTcbNQCW6IbaYpW3tIEr1");
      await getDoc(docRef).then((snapshot) => {
        setName(snapshot.data()?.name);
      });
    }

    loadingUserInfo();
  }, [id]);

  useEffect(() => {
    async function loadingSocialLinks() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "social", id || "EtT8gKPRTcbNQCW6IbaYpW3tIEr1");
      const snapshot = await getDoc(docRef);

      if (
        snapshot.data()?.youtube ||
        snapshot.data()?.instagram ||
        snapshot.data()?.facebook
      ) {
        const data = snapshot.data();
        setSocialLinks({
          youtube: data?.youtube || "",
          instagram: data?.instagram || "",
          facebook: data?.facebook || "",
        });
      }
    }
    loadingSocialLinks();
  }, [id]);

  if (id === null || id === undefined) {
    return <Navigate to={"/EtT8gKPRTcbNQCW6IbaYpW3tIEr1"} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col w-full justify-center items-center py-4">
      {isLoading}
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        {name}
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇🏻</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((item) => (
          <section
            className="bg-white mb-4 w-full py-2 rounded-lg cursor-pointer select-none transition-transform hover:scale-105"
            style={{ backgroundColor: item.bg }}
            key={item.id}
          >
            <a href={item.url} target="_blank">
              <p
                className="text-base md: text-lg"
                style={{ color: item.color }}
              >
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.youtube}>
              <FaYoutube size={35} color="#fff" />
            </Social>
          </div>
        )}
      </main>
      <h1 className="text-white mt-2">
        Ainda não tem conta?{" "}
        <Link to="/register" className="font-medium text-blue-600">
          Cadastre-se
        </Link>{" "}
      </h1>
    </div>
  );
};

export default home;
