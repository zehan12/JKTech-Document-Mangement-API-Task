import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment variables.");
    }

    const hashPassword = await bcrypt.hash(adminPassword, 8);

    try {
        const admin = await prisma.users.upsert({
            where: { email: adminEmail },
            update: {},
            create: {
                email: adminEmail,
                password: hashPassword, 
                role: 'ADMIN',
            },
        });

        console.log(`Admin user created/updated: ${admin.email}`);
    } catch (error) {
        console.error("Failed to create/update admin user:", error);
        throw error;
    }
}

(async function generate() {
    try {
        console.log("Database seeding 🌱 running...");
        await createAdmin();
        console.log("Database seeding 🌱 completed successfully!");
    } catch (error) {
        console.error("Database seeding failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log("Database connection closed.");
    }
})();