import { AdRecord } from "../record/ad.record";
import { AdEntity } from "../types";
import { pool } from "../utils/db";

afterAll(async () => {
    await pool.end();
});

test('AdRecord returns data from database from one entry',async () => {
    const ad = await AdRecord.getOne('899572e7-b50c-11ed-ae22-f894c2e5c649');
 
    expect(ad).toBeDefined();
    expect(ad.id).toBe('899572e7-b50c-11ed-ae22-f894c2e5c649');
});

test('AdRecord returns null from DB for unexisting entry.',async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeNull();    
});

test('AdRecord.findAll returns array of found entries',async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "a"',async () => {
    const ads = await AdRecord.findAll('we');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for smth that does not exist',async () => {
    const ads = await AdRecord.findAll('------------------');

    expect(ads).toEqual([]);
});

test('AdRecord.findAll returns smaller amount of data',async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
});

test('AdRecord.insert inserts returns new UUID',async () => {
    const ad = new AdRecord({
        name: 'Test Name',
        description: 'blah',
        url: 'https://megaKurs',
        price: 0,
        lat: 9,
        lon: 9,
    });

    await ad.insert();

    expect(ad.id).toBeDefined();
});