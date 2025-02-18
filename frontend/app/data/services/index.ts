import { BoxService } from "./BoxService";
import { StuffService } from "./StuffService";

export const boxService = new BoxService(`${process.env.API_URL}/boxes`);
export const stuffService = new StuffService(`${process.env.API_URL}/stuff`)