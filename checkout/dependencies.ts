import { CheckoutController } from "./checkoutController";
import { LocalRespo } from "../Products/localRepo";

const localRepo = new LocalRespo()
export const checkoutController = new CheckoutController(localRepo)