import { SupportedHTTPMethods } from '../enums/SupportedHTTPMethods';

export interface APIRequestParameters {
    method:
        | SupportedHTTPMethods.GET
        | SupportedHTTPMethods.POST
        | SupportedHTTPMethods.PUT;
    url: string;
    expectedStatusCode: number;
    payload?: object;
    queryParameters?: string;
    headers?: Record<string, string>;
}
