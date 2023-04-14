import { AnimationObject } from "lottie-react-native";

export type Slide = {
  key: number;
  text: string;
  image: AnimationObject | string;
  loop?: boolean;
};
export const slides: Slide[] = [
  {
    key: 1,
    text: "Read {books} \nevery day",
    image: require("../../assets/lottie/goals.json"),
    loop: false,
  },
  {
    key: 2,
    text: "Collect your {Books} \nin a simple way",
    image: require("../../assets/lottie/bookshelf.json"),
    loop: false,
  },
  {
    key: 3,
    text: "Create {goals} \nand achieve them",
    image: require("../../assets/lottie/welcome.json"),
    loop: true,
  },
];
