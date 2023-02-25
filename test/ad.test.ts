import { AdRecord } from "../record/ad.record"

test('AdRecord returns data from database from one entry',async () => {
    const ad = await AdRecord.getOne('899572e7-b50c-11ed-ae22-f894c2e5c649');
 
    expect(ad).toBeDefined();
    expect(ad.id).toBe('899572e7-b50c-11ed-ae22-f894c2e5c649');
});

test('AdRecord returns null from DB for unexisting entry.',async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeNull();    
});