Databasen er implementeret i MongoDB Atlas som kører online. 
Derfor skal der ikke ændres i connection-string som forbinder API'et til databasen i db.js


Her følger en guide til at køre programmet på Windows og Mac

For at køre systemet skal følgende programmer være installeret:
- Node.js, for at kunne køre JavaScript
- Git, for at kunne køre .sh filer

Desuden skal connection string ændres til en mongodb-forbindelse under database > db.js

På Windows:

1. indtast: "npm install" i terminalen (hvis node modules ikke er slettet, slet da først denne mappe og kør npm install efter)
2. Åbn en terminal i projektets øverste mappe (src) og skriv "run.sh" og tryk enter, dette starter alle services
4. Åbn ny terminal og indtast "npm test" eller "node test" for at køre testen 

På MAC:

1. indtast: "npm install" i terminalen (hvis node modules ikke er slettet, slet da først denne mappe og kør npm install efter)
2. Når modulerne er installeret indtast "sudo chmod 777 run.sh" i terminalen. Hvis den spørger efter password, skriv da password til din mac-computer
3. Åbn en terminal i projektets øverste mappe (src) og skriv "./run.sh" og tryk enter, dette starter alle services
4. Åbn ny terminal og indtast "npm test" eller "node test" for at køre testen

