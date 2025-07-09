// Imports
import * as dotenv from 'dotenv';

import { UrlBuilderModel } from './recources/interfaces/UrlBuilderModel';

dotenv.config();

export class URLBulder implements UrlBuilderModel {
    private urlPrototype = process.env.BASE_URL ?? '';
    template: string;

    constructor(params?: Partial<UrlBuilderModel>) {
        this.template = params?.template ?? 'full';
    }

    public buildUrl(): string {
        return this.urlPrototype
            .replace('template', encodeURIComponent(this.template))
    }
}
