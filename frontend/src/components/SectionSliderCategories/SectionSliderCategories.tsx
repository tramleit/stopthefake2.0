import Glide from "@glidejs/glide";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import Heading from "components/Heading/Heading";
import { FC, useEffect, useId, useRef } from "react";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const montions = [
  {
    name: "ALEX-Yeder",
    desc: "Don't Get Duped. LEGIT APP Offers Repid Sneaker Authentication.",
    img: "/montion/alex-yeder.png",
    youtube_link: "https://www.youtube.com/watch?v=dIQlTzw75zg&t=225s",
  },
  {
    name: "Swavekiqs",
    desc: "I RECIEVED 10 PAIRS OF SNEAKERS. (Including a fake?!)",
    img: "/montion/swave.png",
    youtube_link: "https://www.youtube.com/watch?v=0ZUJmjqEH6A&t=393s",
  },
  {
    name: "SunLight",
    desc: "GUESS IF THESE SNEAKERS ARE FAKE❌OR REAL✅! (micro sidewalk châtelet)",
    img: "/montion/micro-tro.png",
    youtube_link: "https://www.youtube.com/watch?v=qI1uuKSm-jU&t=63s",
  },
  {
    name: "JuanMasFit",
    desc: "I BUY JORDAN 1 BARATAS en Vinted 😱⛔️",
    img: "/montion/jun.png",
    youtube_link: "https://www.youtube.com/watch?v=KFwWMTtKze8",
  },
  {
    name: "Monsieur-Franck",
    desc: "UNBOXING A COUNTERFEIT PACKAGE! Watch out for item fake!!⛔️",
    img: "/montion/monsieur-franck.png",
    youtube_link: "https://www.youtube.com/watch?v=BkOhd6fKsmk&t=17s",
  },
  {
    name: "Sneaker-Family",
    desc: "COMPRO ZAPATILLAS Y ROPA EN WALLAPOP STOPTHEFAKE LEGIT-CHECK",
    img: "/montion/family.png",
    youtube_link: "https://www.youtube.com/watch?v=-CcdNApdLeA&t=423s",
  },
  {
    name: "SneakersSeb",
    desc: "I RECEIVE A COUNTERFEIT 😫 (stop the fake) - SNEAKERSEB",
    img: "/montion/seb.png",
    youtube_link: "https://www.youtube.com/watch?v=q6fn-Qr5CgA",
  },
  {
    name: "CORSKICKZ",
    desc: "HOW TO AVOID YOU FROM BEING SCAMMED BUYING CLOTHES ON THE INTERNET",
    img: "/montion/CORSKICKZ.png",
    youtube_link: process.env.PUBLIC_URL,
  },
  {
    name: "Swavekiqs",
    desc: "I RECEIVED 17 PAIRS OF SNEAKERS (I teach you how to authenticate them)!",
    img: "/montion/swavekiqs1.png",
    youtube_link: "https://www.youtube.com/watch?v=_b0mk4jZslY&t=152s",
  },
  {
    name: "Pasichniy",
    desc: "STOPTHEFAKE legitcheck no and worst travis sneakers with Nike",
    img: "/montion/russe.png",
    youtube_link: process.env.PUBLIC_URL,
  },
  {
    name: "Grezka",
    desc: "I HAVE THE MOST BEAUTIFULL JORDAN 1 MID COP ON VINTED !! (Review, and on-feet)",
    img: "/montion/greska.png",
    youtube_link: process.env.PUBLIC_URL,
  },
  {
    name: "Alex-Yedder",
    desc: "Palm Angles KENZO YEEZY tout est FAKE - feat Stop The FAKE",
    img: "/montion/ye.png",
    youtube_link: process.env.PUBLIC_URL,
  },
  {
    name: "NMKICKS",
    desc: "Come CAPIRE se le vostre SCARPE sono FALSE | LEGIT CHECK A 1€",
    img: "/montion/nmkicks.png",
    youtube_link: "https://www.youtube.com/watch?v=a5QOskCqvNs&t=400s",
  },
  {
    name: "Snkrs FloFLo",
    desc: "I RECEIVE A COUNTERFEIT PACKAGE! (STOP THE FAKE)",
    img: "/montion/flo.png",
    youtube_link: "https://www.youtube.com/watch?v=l9y29KZsT54&t=8s",
  },
  {
    name: "swavekiqs",
    desc: "REAL VS FAKE: HOW TO AUTHENTICATE A YEEZY 350 V2?!",
    img: "/montion/swav2.png",
    youtube_link: "https://www.youtube.com/watch?v=49dGePNZKPk&t=2s",
  },
  {
    name: "DayBeforeTheHype",
    desc: "How to avoid being ripped off buying on Vinted! The Veille du Battage Mediatique",
    img: "/montion/video2.png",
    youtube_link: "https://www.youtube.com/watch?v=XHNCuZhtqhk",
  },
  {
    name: "EVA swt",
    desc: "6 TIPS TO RECOGNIZE A PAIR OF FAKE SNEAKERS?!",
    img: "/montion/eva.png",
    youtube_link: "https://www.youtube.com/watch?v=BIlWKsBZSeo",
  },
  {
    name: "Francesco Pedullà",
    desc: "BUY THE JORDAN 1 TRAVIS SCOTT X FRAGMENT AT 700 € ?! 😱",
    img: "/montion/it.png",
    youtube_link: "https://www.youtube.com/watch?v=PtXzKP0Zzro",
  },
  {
    name: "Laeceb",
    desc: "Mes derniers achats",
    img: "/montion/fr.png",
    youtube_link: "https://www.youtube.com/watch?app=desktop&v=ZconBpuI5Dw",
  },
  {
    name: "Sneaker Family",
    desc: "COLECCIÓN de ZAPATILLAS *2022*",
    img: "/montion/sneak-fam.png",
    youtube_link: "https://www.youtube.com/watch?app=desktop&v=8fgEgTdZ0og",
  },
  {
    name: "SwaveKiqs",
    desc: "ALL MY SNEAKERS 2022 : Mes 15 Paires de Sneakers",
    img: "/montion/swave3.png",
    youtube_link: "https://www.youtube.com/watch?app=desktop&v=sqcqNfovkTw",
  },
  {
    name: "monkeykikz",
    desc: "COMMENT LEGIT CHECK SES PAIRS !?",
    img: "/montion/money.png",
    youtube_link: "https://www.youtube.com/watch?v=o_FR44IrEIc&t=1s",
  },
  {
    name: "NMKICKS",
    desc: "La SNEAKER più DESIDERATA",
    img: "/montion/23.png",
    youtube_link: "https://www.youtube.com/watch?v=ZTY_HT7ns5k",
  },
  {
    name: "J_Kinder",
    desc: "CÓMO COMPRAR y VENDER SNEAKERS de forma SEGURA",
    img: "/montion/J_Kinder.png",
    youtube_link: "https://www.youtube.com/watch?v=ZLVEJ30fN4U",
  },
  {
    name: "Francesco Pedullà",
    desc: "HO COPPATO SUPREME X BURBERRY A MILANO💰*senza ticket*",
    img: "/montion/franch.png",
    youtube_link: "https://www.youtube.com/watch?v=MupQ3_qAk8U",
  },
  {
    name: "Copers",
    desc: "8 Conseils pour ne pas se faire arnaquer sur vinted 🔑 ( achat sneakers, stop the fake )",
    img: "/montion/cop1.png",
    youtube_link: "https://www.youtube.com/watch?v=K6isnTfeWlQ",
  },
  {
    name: "Monkey Kikz",
    desc: "J'ACHÈTE UNE PAIRE DE PATTA ET DE SLIDE EN MAIN PROPRE",
    img: "/montion/money1.png",
    youtube_link: "https://www.youtube.com/watch?app=desktop&v=4JFGQCfq5t0",
  },
  {
    name: "SwaveKiqs",
    desc: "J'AI ACHETÉ 22 PAIRES DE SNEAKERS (Je me suis fait arnaquer ??)",
    img: "/montion/swave6.png",
    youtube_link: "https://www.youtube.com/watch?app=desktop&v=_dKXhhuer6Q",
  },
];

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  heading = "@MONTION STOPTHEFAKE.FR",
  subHeading = "Thanks to all supporters. Let's work together to fix the replica problem for the community.",
  className = "",
  itemClassName = "",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {montions.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardCategory5
                  name={item.name}
                  youtube_link={item.youtube_link}
                  index={index}
                  desc={item.desc}
                  featuredImage={item.img}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCategories;
