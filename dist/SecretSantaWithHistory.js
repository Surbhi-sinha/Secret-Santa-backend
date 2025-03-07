"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretSantaWithHistory = void 0;
class SecretSantaWithHistory {
    // assignSecretChild(): any[] {
    //     console.log("secret child assigning logic with history");
    //     return [];
    // }
    shuffleArray(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    assignSecretChild(employees) {
        console.log("Secret child assigning logic with history");
        if (employees.length < 2) {
            throw new Error("At least two employees are required for Secret Santa.");
        }
        // Read previous assignments from employees (if available)
        const previousAssignments = new Map(employees
            .filter((emp) => emp.Secret_Child_Name) // Only consider those who had a Secret Child before
            .map((emp) => [emp.Employee_Name, emp.Secret_Child_Name]) // Store in a Map for quick lookup
        );
        let shuffledEmployees = this.shuffleArray(employees);
        // Ensure no one gets themselves AND the new Secret Child is different from the previous one
        let maxAttempts = 100; // Prevent infinite loop
        while (maxAttempts-- > 0) {
            let isValid = employees.every((emp, index) => {
                const newChild = shuffledEmployees[index];
                return (emp.Employee_Name !== newChild.Employee_Name && // No self-assignment
                    previousAssignments.get(emp.Employee_Name) !== newChild.Employee_Name // No repeat from last time
                );
            });
            if (isValid)
                break; // Stop if all assignments are valid
            shuffledEmployees = this.shuffleArray(employees); // Shuffle again if invalid
        }
        // Assign secret child
        return employees.map((employee, index) => (Object.assign(Object.assign({}, employee), { Secret_Child_Name: shuffledEmployees[index].Employee_Name, Secret_Child_EmailID: shuffledEmployees[index].Employee_EmailID })));
    }
}
exports.SecretSantaWithHistory = SecretSantaWithHistory;
