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
        const text = await this.postFormWithRetry(`${this.baseUrl}/searchProduct`, { search_product: keyword });
        return this.parseJson<ProductsResponse>(text);
    }

    async searchProductsWithoutParameter(): Promise<MessageResponse> {
        const text = await this.postFormWithRetry(`${this.baseUrl}/searchProduct`);
        return this.parseJson<MessageResponse>(text);
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
    private async parseJson<T>(text: string): Promise<T> {
        try {
            return JSON.parse(text) as T;
        } catch {
            throw new Error(`API returned non-JSON response: ${text.slice(0, 200)}`);
        }
    }

    private async postFormWithRetry(url: string, form?: Record<string, string>, attempts = 3): Promise<string> {
        let lastText = '';
        for (let i = 0; i < attempts; i++) {
            const response = await this.request.post(url, form ? { form } : {});
            lastText = await response.text();
            if (!lastText.trimStart().startsWith('<')) {
                return lastText; // looks like JSON, good
            }
            // HTML (throttled/blocked) — brief backoff, then retry
            await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        }
        return lastText;
    }
}