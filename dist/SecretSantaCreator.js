"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSantaCreator = void 0;
const SecretSantaWithHistory_1 = require("./SecretSantaWithHistory");
const SecretSantaWithoutHistory_1 = require("./SecretSantaWithoutHistory");
class SecretSantaCreator {
    createSecretSanta(useHistory) {
        if (useHistory) {
            return new SecretSantaWithHistory_1.SecretSantaWithHistory();
        }
        else {
            return new SecretSantaWithoutHistory_1.SecretSantaWithoutHistory();
        }
    }
}
exports.SecretSantaCreator = SecretSantaCreator;
