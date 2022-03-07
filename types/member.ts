import { Content } from "newt-client-js";
import { Position } from "./position";

export interface Member {
  fullName: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage: { src: string } | null;
  };
  profileImage: { src: string } | null;
  biography: string;
  position: (Content & Position) | null;
}
