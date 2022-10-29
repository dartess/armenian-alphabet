import type { PageValue } from "@/types/model";
import { Alphabet } from "@/pages/alphabet/Alphabet/Alphabet";
import { Practice } from "@/pages/practice/Practice";
import { exhaustiveCheck } from "@/utils/exhaustiveCheck";

type Props = {
  page: PageValue;
}

export const Router = ({ page }: Props) => {
  switch (page) {
    case "alphabet":
      return <Alphabet/>
    case "practice":
      return <Practice/>
    default:
      return exhaustiveCheck(page);
  }
}
