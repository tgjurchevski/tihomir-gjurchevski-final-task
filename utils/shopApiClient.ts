import { APIRequestContext } from '@playwright/test';
import { ShopUser } from './generateUser';

export interface ApiProduct {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: {
        usertype: { usertype: string };
        category: string;
    };
}

export interface ProductsResponse {
    responseCode: number;
    products: ApiProduct[];
}

export interface MessageResponse {
    responseCode: number;
    message: string;
}

export class ShopApiClient {
    private readonly request: APIRequestContext;
    private readonly baseUrl = 'https://automationexercise.com/api';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getProducts(): Promise<ProductsResponse> {
        const response = await this.request.get(`${this.baseUrl}/productsList`);
        return JSON.parse(await response.text());
    }

    async searchProducts(keyword: string): Promise<ProductsResponse> {
        const response = await this.request.post(`${this.baseUrl}/searchProduct`, {
            form: { search_product: keyword },
        });
        return JSON.parse(await response.text());
    }

    async searchProductsWithoutParameter(): Promise<MessageResponse> {
        const response = await this.request.post(`${this.baseUrl}/searchProduct`);
        return JSON.parse(await response.text());
    }

    async createAccount(user: ShopUser): Promise<void> {
        await this.request.post(`${this.baseUrl}/createAccount`, {
            form: {
                name: user.name,
                email: user.email,
                password: user.password,
                title: user.title,
                birth_date: user.birthDay,
                birth_month: user.birthMonth,
                birth_year: user.birthYear,
                firstname: user.firstName,
                lastname: user.lastName,
                company: user.company,
                address1: user.address,
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobileNumber,
            },
        });
    }

    async deleteAccount(email: string, password: string): Promise<void> {
        await this.request.delete(`${this.baseUrl}/deleteAccount`, {
            form: { email, password },
        });
    }

    async verifyLogin(email: string, password: string): Promise<boolean> {
        const response = await this.request.post(`${this.baseUrl}/verifyLogin`, {
            form: { email, password },
        });
        const body = JSON.parse(await response.text());
        return body.responseCode === 200;
    }
}