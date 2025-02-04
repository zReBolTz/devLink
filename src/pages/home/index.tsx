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
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";

const home = () => {
  interface linkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
  }

  interface socialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
  }
  const [links, setLinks] = useState<linkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<socialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const collectionRef = collection(db, "links");
      const queryRef = query(collectionRef, orderBy("created", "asc"));
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
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            youtube: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            facebook: snapshot.data()?.facebook,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);
  return (
    <div className="flex flex-col w-full justify-center items-center py-4">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Willian Ferreira
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
    </div>
  );
};

export default home;
