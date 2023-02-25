import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type AdRecordResults = [AdEntity[], FieldPacket[]]

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
        
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
    
    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0])
    }
}