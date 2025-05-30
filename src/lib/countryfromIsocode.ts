
import { Country } from 'country-state-city';
export function getCountryNameByCode(isoCode: string): string {
    const country = Country.getCountryByCode(isoCode);
    return country?.name ?? isoCode;
}
