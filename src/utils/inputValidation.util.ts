import { CreateUserAccount } from "../controllers/requestModels/CreateUserAccount";
import { UpdateUserAccount } from "../controllers/requestModels/UpdateUserAccount";
import { BadInputError } from "../errorHandling/Errors";

/**
 * This function checks if all the keys of a given input object are valid
 * Either a key has to have data or not be sent, it shouldn't be an empty string 
 * @param input CreateUserAccount | UpdateUserAccount
 */
export const checkForEmptyString = (input : CreateUserAccount | UpdateUserAccount) => {

    Object.keys(input).forEach((key:string) => {
        if(input[key as keyof (CreateUserAccount | UpdateUserAccount)] == ""){
            throw new BadInputError(`Empty string provided for key ${key}`);
        }
    })
    
}
