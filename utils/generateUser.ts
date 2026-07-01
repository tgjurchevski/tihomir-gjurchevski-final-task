function randomFrom<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUser() {
    const timestamp = Date.now();

    return {
        // radio & dropdown fields — random among options the site actually offers
        title: randomFrom(['Mr', 'Mrs'] as const),
        country: randomFrom(['United States', 'Canada', 'Australia', 'India', 'Israel', 'New Zealand', 'Singapore']),
        birthDay: String(randomNumber(1, 28)),
        birthMonth: String(randomNumber(1, 12)),
        birthYear: String(randomNumber(1970, 2005)),

        // free-text fields — timestamp makes every run unique
        name: `tester${timestamp}`,
        email: `tester${timestamp}@example.com`,
        password: `password${timestamp}`,
        firstName: `firstname${timestamp}`,
        lastName: `lastname${timestamp}`,
        company: `company${timestamp}`,
        address: `address${timestamp}`,
        state: `state${timestamp}`,
        city: `city${timestamp}`,
        zipcode: String(randomNumber(10000, 99999)),
        mobileNumber: String(randomNumber(1000000000, 9999999999))
    };
}

export type ShopUser = ReturnType<typeof generateUser>;