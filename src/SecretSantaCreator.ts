import { ISecretSanta } from "./ISecretSanta";
import { SecretSantaWithHistory } from "./SecretSantaWithHistory";
import { SecretSantaWithoutHistory } from "./SecretSantaWithoutHistory"; 

export class SecretSantaCreator{
    createSecretSanta(useHistory : boolean) : ISecretSanta{
        if(useHistory) {
            return new SecretSantaWithHistory()
        }else{
            return new SecretSantaWithoutHistory()
        }
    }
}