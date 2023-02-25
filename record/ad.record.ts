import { AdEntity } from "../types";
import { ValidationError } from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string
}

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;
    
    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia musi być od 1 do 100 znaków')
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków')
        }

        if(obj.price < 0 || obj.price) {
            throw new ValidationError('Cena musi być w przedziałe 1-999999');
        }

        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia musi być od 1 do 100 znaków')
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number' ) {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

}