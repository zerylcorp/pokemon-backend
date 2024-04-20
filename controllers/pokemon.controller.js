const { My_pokemon } = require("../models");
const PokemonRepository = require("../repository/pokemon");

class Controller {
  static async getAll(req, res, next) {
    try {
      const pokemons = await PokemonRepository.getAllPoke(req?.query);
      const { data } = pokemons;
      const { count, next, previous } = data;
      const allData = [];
      for (let i = 0; i < data.results.length; i++) {
        const poke = data.results[i];

        const pokemonByUrl = await PokemonRepository.getPokeByURL(poke.url);
        // console.log(pokemonByUrl.data);
        const details = pokemonByUrl.data;
        const payload = {
          id: details.id,
          ...poke,
          imageUrl: details.sprites.front_default ? details.sprites.front_default : details.sprites.front_shiny,
          weight: details.weight,
          height: details.height,
        };
        allData.push(payload);
      }
      console.log(allData);
      return res.status(200).json({
        status: "Success",
        count,
        next,
        previous,
        data: allData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllMyPokemon(req, res, next) {
    try {
      const myPokemon = await PokemonRepository.getMyPokemonAll();
      const myList = [];
      for (let i = 0; i < myPokemon.length; i++) {
        const poke = myPokemon[i].dataValues;
        // console.log(poke);
        const pokemon = await PokemonRepository.getPoke({ pokemonId: poke.id });
        const details = pokemon.data;
        console.log(details.name);

        const payload = {
          ...poke,
          imageUrl: details.sprites.front_default ? details.sprites.front_default : details.sprites.front_shiny,
        };
        myList.push(payload);
      }
      return res.status(200).json({
        status: "Success",
        data: myList,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPokemonDetail(req, res, next) {
    const { pokemonId } = req.params;
    try {
      const myPokemon = await PokemonRepository.getPoke({ pokemonId });
      const details = myPokemon.data;
      const payload = {
        id: details.id,
        name: details.name,
        imageUrl: details.sprites.front_default ? details.sprites.front_default : details.sprites.front_shiny,
        weight: details.weight,
        species: details.species,
        height: details.height,
      };

      return res.status(200).json({
        status: "Success",
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  }
  // catch api
  static async catch(req, res, next) {
    const { id } = req.user;
    const { pokemonId } = req.query;

    try {
      const isPokemon = await PokemonRepository.getPoke({ pokemonId });

      if (isPokemon && !isPokemon.data) {
        next({ name: "not-found", message: "Tidak ditemukan...!" });
      }

      const isExist = await PokemonRepository.findPokemon({ userId: id, pokemonId });
      if (isExist) {
        return res.status(200).json({
          status: "Done",
          message: `Pokemon dengan ID ${pokemonId} sudah pernah ditangkap...!`,
        });
      }
      const randomNumber = Math.random() * 100;
      const isSuccess = Math.round(randomNumber * 100) / 100;
      if (isSuccess < 50) {
        return res.status(200).json({
          status: "Fail",
          message: "Gagal menangkap pokemon, coba lagi...!",
        });
      }
      const payload = {
        userId: id,
        pokemonId,
        pokemonName: isPokemon.data.name,
        changeOfName: "0",
      };
      const isMyPokemon = await My_pokemon.create(payload);
      if (isMyPokemon) {
        return res.status(200).json({
          status: "Success",
          message: `Yeyy... Anda berhasil menangkap pokemon dengan ID ${pokemonId}`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  // release api
  static async release(req, res, next) {
    const min = 0;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    function isPrime(number) {
      if (number < 2) return false;
      for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
      }
      return true;
    }
    try {
      const { id } = req.user;
      const { pokemonId } = req.params;
      const isPrimeNumber = isPrime(randomNumber);
      if (!isPrimeNumber) {
        return res.status(200).json({
          status: "Fail",
          message: "Gagal release pokemon, coba lagi...!",
        });
      }

      await PokemonRepository.updatePokemon({ deletedAt: true }, { userId: id, pokemonId });
      return res.status(200).json({
        status: "Success",
        message: "Berhasil release pokemon.",
      });
    } catch (error) {
      next(error);
    }
  }
  // rename api
  static async rename(req, res, next) {
    try {
      const { id } = req.user;
      const { pokemonId } = req.params;
      const isPokemon = await PokemonRepository.getPoke({ pokemonId });
      if (isPokemon && !isPokemon.data) {
        next({ name: "not-found", message: "Tidak ditemukan...!" });
      }
      const myPokemon = await PokemonRepository.findPokemon({ userId: id, pokemonId });

      function generatePokeName(n) {
        if (n <= 0) return [0];
        let fibonacciSequence = [0, 1];

        for (let i = 2; i <= n; i++) {
          const nextFibonacci = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
          fibonacciSequence.push(nextFibonacci);
        }

        return fibonacciSequence;
      }
      const times = Number(myPokemon.changeOfName);
      const deretFibonacci = generatePokeName(times === 0 ? times : times + 1);

      const payload = {
        changeOfName: Number(myPokemon.changeOfName) + 1,
      };
      if (deretFibonacci.length > 0) {
        payload.pokemonName = `${isPokemon.data.name}-${deretFibonacci[times]}`;
      }

      console.log(deretFibonacci);
      console.log(payload);

      await PokemonRepository.updatePokemon(payload, { userId: id, pokemonId });
      return res.status(200).json({
        status: "Success",
        message: "Berhasil rename pokemon.",
        rename: payload.pokemonName,
        times,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
