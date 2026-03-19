const dns = require("dns/promises");

// Forzar servidores DNS: Google y Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const mongoose = requiere('mongoose');

mongoose.connect("mongodb+srv://grupo-14:grupo-14@cluster0.blryo.mongodb.net/NodeMod3Cohorte5")
.then( () => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar MongoDB:', error));

const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: "Grupo-14" },
);
const SuperHero = mongoose.model("SuperHero", superheroSchema);

async function insertarSuperHero()
{
    const hero = SuperHero(
    {
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigo: ['Duende Verde'],
        creador: 'Maciel'    
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

insertarSuperHero();

async function updateSuperHero(nombreSuperHeroe) {
const result = await SuperHero.updateOne(
     { nombreSuperHeroe: nombreSuperHeroe },
     { $set: { edad: 26 } },
   );
   console.log("Resultado de la actualización:", result);
 }
 updateSuperHero("Spiderman");
 async function deleteSuperHero(nombreSuperHeroe) {
   const result = await SuperHero.deleteOne({
     nombreSuperHeroe: nombreSuperHeroe,
   });
   console.log("Superhéroe eliminado:", result);
 }
 deleteSuperHero("Spiderman");
async function findSuperHeroes() {
  const heroes = await SuperHero.find({ planetaOrigen: "Tierra" });
  console.log("Superhéroes encontrados:", heroes);
}
findSuperHeroes();