import { BoxService } from "./BoxService";

export const boxService = new BoxService(`${process.env.API_URL}/boxes/`);