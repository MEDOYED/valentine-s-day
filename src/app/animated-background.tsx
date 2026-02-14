// import s from "./animated-background.module.scss";
// import HeartValentineIcon from "./heart-valentines-icon";
// import ParachuteIcon from "./parachute-icon";

// const AnimatedBackground = () => {
//   return (
//     <div className={s.AnimatedBackground}>
//       <HeartValentineIcon />
//       <ParachuteIcon width={40} height={40} />
//       <HeartValentineIcon />
//       <ParachuteIcon width={40} height={40} />
//       <HeartValentineIcon />
//       <ParachuteIcon width={40} height={40} />
//       <HeartValentineIcon />
//       <ParachuteIcon width={40} height={40} />
//       <HeartValentineIcon />
//     </div>
//   );
// };

// export default AnimatedBackground;
import classNames from "classnames";
import { useEffect, useState } from "react";
import s from "./animated-background.module.scss";
import HeartValentineIcon from "./heart-valentines-icon";
import ParachuteIcon from "./parachute-icon";
interface FallingIcon {
  id: number;
  type: "heart" | "parachute";
  left: number;
  animationDuration: number;
  animationDelay: number;
}
const AnimatedBackground = () => {
  const [icons, setIcons] = useState<FallingIcon[]>([]);
  useEffect(() => {
    // Генеруємо масив іконок з рандомними параметрами
    const generatedIcons: FallingIcon[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? "heart" : "parachute",
      left: Math.random() * 100, // Рандомна позиція по горизонталі (0-100%)
      animationDuration: 10 + Math.random() * 5, // Тривалість анімації від 5 до 10 секунд
      animationDelay: Math.random() * 10, // Затримка старту від 0 до 5 секунд
    }));
    setIcons(generatedIcons);
  }, []);
  return (
    <div className={s.AnimatedBackground}>
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={classNames(
            s.fallingIcon,
            { [s.fallHeartIcon]: icon.type === "heart" },
            { [s.fallParachuteIcon]: icon.type === "parachute" }
          )}
          style={{
            left: `${icon.left}%`,
            animationDuration: `${icon.animationDuration}s`,
            animationDelay: `${icon.animationDelay}s`,
          }}>
          {icon.type === "heart" ? (
            <HeartValentineIcon />
          ) : (
            <ParachuteIcon width={40} height={40} />
          )}
        </div>
      ))}
    </div>
  );
};
export default AnimatedBackground;
