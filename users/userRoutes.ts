import { Router} from 'express';

import { signUpController } from './signup/dependencies';
import { signInController } from './signIn/dependencies';
import { validateInputs } from './middleware/validateInputs/dependencies';
import { verifyTokenController } from './authorization/dependecies';


export const usersRouter = Router();

usersRouter.post("/sign-in", validateInputs.validateSignIn.bind(validateInputs), signInController.signInUser.bind(signInController));
usersRouter.post("/sign-up",validateInputs.validateSignUp.bind(validateInputs),signUpController.signUpUser.bind(signUpController));
usersRouter.get("/verify-token", verifyTokenController.verify.bind(verifyTokenController))