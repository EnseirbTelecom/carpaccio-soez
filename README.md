# SOEZ

### Contributors
* Choveton-Caillat Julien (R2boot3r)
* Sergent Adrien (Railore)

## Getting Started
### Installation
npm install -g express
npm install -g nodemon
npm install 

npm start
#### Prerequisites

Node.js
https://nodejs.org/en/download/

### Usage
/id (requête GET) doit retourner l’id de votre API qui est le nom de votre dépôt GitHub sour la forme { "id" : "it340-foo" }
/bill (requête POST) doit permettre de calculer un prix en fonction d’un objet de paramètres envoyé à l’API en JSON dans le body de la requête. L’objet est de la forme { "prices" : [10, 20], "quantities" : [1, 2] }. L’API doit retourner le prix total sous la forme { "total" : 50 }
L'instalation de postman peut-être ptratique.