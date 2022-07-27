import { createServer, Model } from "miragejs";
import { faker } from "@faker-js/faker/locale/en_US";
export const LIST = [];
Array.from({ length: 100}).forEach(() => {
  LIST.push(createRandomData());
});
export function createRandomData() {
  return {
    id: faker.datatype.uuid(),
    city: faker.address.cityName(),
    state: faker.address.state(),
    type: faker.helpers.arrayElement([
      "Apartment",
      "Single-family",
      "Townhomes",
      "Condo",
    ]),
    price: faker.commerce.price(100, 5000, 0),
  };
}
createServer({
  routes() {
    this.get("/api/properties", () => ({
      data: LIST,
    }));
  },
});
