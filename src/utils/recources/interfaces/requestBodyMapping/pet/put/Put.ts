import {Category} from "./Category";
import {Tag} from "./Tag";

export interface Put {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: 'available' | 'pending' | 'sold';
}