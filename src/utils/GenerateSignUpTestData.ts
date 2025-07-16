export class GenerateSignUpTestData {
     public readonly email: string;
     public readonly title: 'Mr' | 'Mrs';
     public readonly password: string;
     public readonly dateOfBirth: { day: number; month: string; year: number };
     public readonly newsletter: boolean;
     public readonly specialOffers: boolean;
     public readonly firstName: string;
     public readonly lastName: string;
     public readonly company: string;
     public readonly address1: string;
     public readonly address2: string;
     public readonly country: string;
    public readonly state: string;
    public readonly city: string;
    public readonly zipcode: string;
    public readonly mobileNumber: string;

    constructor() {
         this.firstName = GenerateSignUpTestData.getRandomElement(['John', 'Jane', 'Peter', 'Mary', 'David', 'Susan']);
         this.lastName = GenerateSignUpTestData.getRandomElement(['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller']);

         this.email = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@testgmail.com`;
         this.company = `${this.lastName} & Co.`;
         this.title = GenerateSignUpTestData.getRandomElement(['Mr', 'Mrs']);
         this.password = GenerateSignUpTestData.getRandomString(12);
         this.dateOfBirth = {
             day: GenerateSignUpTestData.getRandomNumber(1, 28),
             month: GenerateSignUpTestData.getRandomElement(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
             year: GenerateSignUpTestData.getRandomNumber(1900, 2025)};
         this.newsletter = Math.random() > 0.5;
         this.specialOffers = Math.random() > 0.5;
         this.address1 = `${GenerateSignUpTestData.getRandomNumber(100, 999)} Main St`;
         this.address2 = `Apt ${GenerateSignUpTestData.getRandomNumber(1, 100)}`;
         this.country = GenerateSignUpTestData.getRandomElement(['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']);
         this.state = GenerateSignUpTestData.getRandomElement(['California', 'New York', 'Texas', 'Florida', 'Illinois']);
         this.city = GenerateSignUpTestData.getRandomElement(['Los Angeles', 'New York City', 'Houston', 'Miami', 'Chicago']);
         this.zipcode = String(GenerateSignUpTestData.getRandomNumber(10000, 99999));
         this.mobileNumber = String(GenerateSignUpTestData.getRandomNumber(1000000000, 9999999999));
    }

     private static getRandomElement<T>(array: T[]): T {
         const index = Math.floor(Math.random() * array.length);
         return array[index];
         }

     private static getRandomNumber(min: number, max: number): number {
         return Math.floor(Math.random() * (max - min + 1)) + min;
         }

     private static getRandomString(length: number): string {
         const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
         let result = '';
         for (let i = 0; i < length; i++) {
             result += chars.charAt(Math.floor(Math.random() * chars.length));
             }
         return result;
         }
}