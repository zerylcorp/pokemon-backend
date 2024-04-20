# pokemon-backend
SETUP dan RUN APP
1. npm install
2. Buatlah database di lokal komputer dengan nama `pokemon_develop`
3. Selanjutnya untuk membuat tabel pada database jalankan perintah `npx sequelize-cli db:migrate`
4. Jalankan app.js dengan perintah `npx nodemon app.js`

SETUP ENV
```
PORT=8080
POKEMON_URL=https://pokeapi.co/api/v2
JWT_SECRET_KEY=rahasiaIlahi
```

TESTING BY POSTMAN
1. import file `Pokemon.postman_collection` sebagai collection Postman di lokal anda

Terima Kasih Atas Waktunya.