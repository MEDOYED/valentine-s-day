import { useState } from "react";

import cn from "classnames";

import LoveLetterIcon from "./love-letter-icon";
import catLoveSticker from "./cat-love-sticker.gif";

import s from "./app.module.scss";
import HeartValentineIcon from "./heart-valentines-icon";
import AnimatedBackground from "./animated-background";

function App() {
  const [yesCount, setYesCount] = useState(1);
  const [noCount, setNoCount] = useState(1);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const handleNoClick = () => {
    setYesCount(yesCount + 1);
  };

  const handleYesClick = () => {
    setYesCount(0);
    setNoCount(0);
  };

  return (
    <div className={s.background}>
      <AnimatedBackground />
      <div className={s.card}>
        <ul className={s.iconsList}>
          <li>
            <HeartValentineIcon width={40} height={40} />
          </li>
          <li>
            <LoveLetterIcon size={40} />
          </li>
          <li>
            <HeartValentineIcon width={40} height={40} />
          </li>
        </ul>

        <h1 className={s.title}>
          {noCount === 0 ? "Урраа!!! Люблю тебе!" : "Приймаєш мою валентинку?"}
        </h1>

        <div className={s.buttonsContainer}>
          {[...Array(yesCount)].map((_, index) => (
            <button
              className={cn(s.button)}
              onClick={handleYesClick}
              key={index}
              style={
                index === 0
                  ? {
                      position: "absolute",
                      top: `0%`,
                      left: `60%`,
                    }
                  : {
                      position: "absolute",
                      top: `${getRandomInt(85)}%`,
                      left: `${getRandomInt(85)}%`,
                      zIndex: 110,
                    }
              }>
              Так
            </button>
          ))}

          {[...Array(noCount)].map((_, index) => (
            <button className={cn(s.button, s.buttonNo)} key={index} onClick={handleNoClick}>
              Ні
            </button>
          ))}
        </div>

        {yesCount === 0 && noCount === 0 && (
          <img className={s.video} src={catLoveSticker} alt="Cat love sticker" />
        )}
      </div>
    </div>
  );
}

export default App;
