import { AdRecord } from "../record/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megaKurs',
    price: 0,
    lat: 9,
    lon: 9,
};

test('Can built AdReord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');
});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena musi być w przedziałe 1-999999')
});