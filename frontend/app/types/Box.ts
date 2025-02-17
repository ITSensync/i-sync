import { Stuff } from "./Stuff"

export type Box = {
  id: string,
  name: string,
  number: number,
  color: string,
}

export type BoxDetail = {
  id: string,
  name: string,
  number: number,
  color: string,
  stuff: Stuff[],
}