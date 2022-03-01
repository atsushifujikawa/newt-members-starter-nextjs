import { Content } from "newt-client-js";
import { Position } from "./position";

export interface Member {
  fullName: string;
  slug: string;
  profileImage: { src: string } | null;
  profile: string;
  position: (Content & Position) | null;
}
