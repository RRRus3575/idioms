import { useEffect, useState } from "react";
import style from "./IdiomsBlock.module.css"
import Idioma from "../Idioma/Idioma";
// import ContentLoader from "react-content-loader";

const IdiomsBlock = () => {

    const [activeTab, setActiveTab] = useState("popular");

    const idioms = [
        {
          title: "beauty is only skin deep",
          meaning: "a phrase used to emphasize that a person's character comes before their appearance.",
          analogs: [
            { lang: "ukr", text: "Не дивися на вроду, лише на природу" },
            { lang: "ukr", text: "Не все те золото — що блищить" },
            { lang: "germ", text: "Es ist nicht alles Gold was glänzt" }
          ]
        },
        {
          title: "a blessing in disguise",
          meaning: "something that seems bad at first but turns out to be good later.",
          analogs: [
            { lang: "ukr", text: "Немає лиха без добра" },
            { lang: "germ", text: "Glück im Unglück" }
          ]
        },
        {
          title: "bite the bullet",
          meaning: "to endure a painful experience that is unavoidable.",
          analogs: [
            { lang: "ukr", text: "Стиснути зуби" },
            { lang: "germ", text: "In den sauren Apfel beißen" }
          ]
        },
        {
          title: "hit the nail on the head",
          meaning: "to describe exactly what is causing a situation or problem.",
          analogs: [
            { lang: "ukr", text: "В яблучко" },
            { lang: "germ", text: "Den Nagel auf den Kopf treffen" }
          ]
        },
        {
          title: "let the cat out of the bag",
          meaning: "to accidentally reveal a secret.",
          analogs: [
            { lang: "ukr", text: "Видати таємницю" },
            { lang: "germ", text: "Die Katze aus dem Sack lassen" }
          ]
        },
        {
          title: "once in a blue moon",
          meaning: "something that happens very rarely.",
          analogs: [
            { lang: "ukr", text: "Раз на сто років" },
            { lang: "germ", text: "Alle Jubeljahre" }
          ]
        },
        {
          title: "the ball is in your court",
          meaning: "it is your responsibility to take the next step.",
          analogs: [
            { lang: "ukr", text: "Хід за тобою" },
            { lang: "germ", text: "Der Ball liegt bei dir" }
          ]
        },
        {
          title: "under the weather",
          meaning: "feeling ill or unwell.",
          analogs: [
            { lang: "ukr", text: "Погано себе почувати" },
            { lang: "germ", text: "Sich nicht wohl fühlen" }
          ]
        },
        {
          title: "cost an arm and a leg",
          meaning: "very expensive.",
          analogs: [
            { lang: "ukr", text: "Коштувати ціле багатство" },
            { lang: "germ", text: "Ein Vermögen kosten" }
          ]
        },
        {
          title: "when pigs fly",
          meaning: "something that will never happen.",
          analogs: [
            { lang: "ukr", text: "Коли рак на горі свисне" },
            { lang: "germ", text: "Wenn Schweine fliegen können" }
          ]
        }
      ];
      

    const idiomsToShow = activeTab === "popular" ? idioms : idioms;


    return(
        <section className={style.section}>
            <h2 className={style.title}>Idioms</h2>
            <div className={style.tabButtons}>
          <button
            className={`${style.tabButton} ${
              activeTab === "popular" ? style.active : ""
            }`}
            onClick={() => setActiveTab("popular")}
          >
            Most popular
          </button>
          <button
            className={`${style.tabButton} ${
              activeTab === "searched" ? style.active : ""
            }`}
            onClick={() => setActiveTab("searched")}
          >
            Recent search
          </button>
        </div>
            <div>
        <Idioma idioms={idiomsToShow} />
      </div>


        </section>
    )
}

export default IdiomsBlock;