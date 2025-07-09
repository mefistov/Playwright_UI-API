// Imports
import * as dotenv from 'dotenv';
import { TestLogger } from './TestLogger';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiRequestData } from './recources/ApiRequestData';
import { expect, test } from '@playwright/test';
import { APIRequestParameters } from './recources/interfaces/APIRequestParameters';

dotenv.config();

export class ApiClient {
    public async executeRequest<TResponse>({
                                               method,
                                               url,
                                               expectedStatusCode,
                                               payload,
                                               queryParameters,
                                               headers,
                                           }: APIRequestParameters): Promise<TResponse> {
        let actualResponse: AxiosResponse<TResponse> | undefined;

        const requestHeaders = {
            ...ApiRequestData.headers,
            ...headers,
        };

        await test.step(`${method} request to ${url}`, async () => {
            try {
                switch (method) {
                    case 'GET':
                        actualResponse = await this.get(
                            url,
                            queryParameters ?? '',
                            requestHeaders,
                        );
                        break;
                    case 'POST':
                        actualResponse = await this.post(url, payload, requestHeaders);
                        break;
                    case 'PUT':
                        actualResponse = await this.put(url, payload, requestHeaders);
                        break;
                }
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    console.error(
                        `❗ API Error for ${method} ${url}: Status ${error.response.status}`,
                        error.response.data,
                    );
                    actualResponse = error.response as AxiosResponse<TResponse>;
                } else if (error instanceof AxiosError && error.request) {
                    const message = `Network Error: ${method} ${url} - No response. ${error.message}`;
                    throw new Error(message);
                } else {
                    const message = `Unexpected failure during ${method} ${url}: ${error instanceof Error ? error.message : String(error)}`;
                    throw new Error(message);
                }
            }

            if (!actualResponse) {
                const criticalErrorMsg = `Critical internal error: actualResponse is undefined after ${method} ${url}`;
                throw new Error(criticalErrorMsg);
            }
        });

        expect.soft(actualResponse!.status).toBe(expectedStatusCode);
        TestLogger.assert(
            `Expected status ${expectedStatusCode}, received ${actualResponse!.status}`,
        );

        return actualResponse!.data;
    }

    private async post(
        url: string,
        data: object | undefined,
        headers: object,
    ): Promise<AxiosResponse> {
        return axios.post(url, data, { headers });
    }

    private async get(
        url: string,
        queryParameters: string,
        headers: object,
    ): Promise<AxiosResponse> {
        return axios.get(url + queryParameters, { headers });
    }

    private async put(
        url: string,
        data: object | undefined,
        headers: object,
    ): Promise<AxiosResponse> {
        return axios.put(url, data, { headers });
    }
}
