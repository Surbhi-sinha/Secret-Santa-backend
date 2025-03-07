"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSantaWithoutHistory = void 0;
class SecretSantaWithoutHistory {
    // Function to shuffle an array (Fisher-Yates Algorithm)
    shuffleArray(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    assignSecretChild(employees) {
        console.log("secret child assigning logic without history");
        if (employees.length < 2) {
            throw new Error("At least two employees are required for Secret Santa.");
        }
        // Shuffle the employees array
        let shuffledEmployees = this.shuffleArray(employees);
        // Ensure no one gets themselves as their secret child
        while (employees.some((emp, index) => emp.Employee_Name === shuffledEmployees[index].Employee_Name)) {
            shuffledEmployees = this.shuffleArray(employees);
        }
        // Assign secret child
        return employees.map((employee, index) => (Object.assign(Object.assign({}, employee), { Secret_Child_Name: shuffledEmployees[index].Employee_Name, Secret_Child_EmailID: shuffledEmployees[index].Employee_EmailID })));
    }
}
exports.SecretSantaWithoutHistory = SecretSantaWithoutHistory;
