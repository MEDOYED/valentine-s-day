import { useRef, useState } from "react";
import classNames from "classnames";

import s from "./first-screen.module.scss";
import LoveLetterIcon from "./love-letter-icon";

const FirstScreen = () => {
  const refFirstScreen = useRef<HTMLDivElement>(null);
  const [openStage, setOpenStage] = useState(0);

  const handleOpen = () => {
    setOpenStage(openStage + 1);
    console.log(openStage);
  };

  return (
    <div
      className={classNames(
        s.FirstScreen,
        { [s.halfOpen]: openStage === 1 },
        { [s.fullOpen]: openStage === 2 }
      )}
      onClick={handleOpen}
      ref={refFirstScreen}>
      <LoveLetterIcon size={30} />
      <h2 className={s.title}>Валентинка</h2>
      <h1 className={s.title}>для моєї коханої Катусі</h1>
      <LoveLetterIcon size={30} />
    </div>
  );
};

export default FirstScreen;
