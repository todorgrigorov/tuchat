import Faculty from "../models/Faculty";
import Specialty from "../models/Specialty";

const seedFaculties = async () => {
    if (await Faculty.count() === 0) {
        await Faculty.create({
            name: 'Computer Science'
        });
    }
};

const seedSpecialties = async () => {
    if (await Specialty.count() === 0) {
        await Specialty.create({
            name: 'Software & Internet Technologies'
        });
    }
};

export default {
    async seed() {
        await seedFaculties();
        await seedSpecialties();
    },
}