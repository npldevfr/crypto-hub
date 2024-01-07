# crypto-hub

<a name="readme-top"></a>

A complete web platform about crypto-currencies!

<br />


<!-- ABOUT THE PROJECT -->

## About The Project

For this Epitech project in the MSc cursus we hadded to design and create a entire website which will serve to monitor different crypto currencies.

### Features
#### User Management
We have on our website three levels of access with specific privileges:
- the anonymous access who can access to some crypto currencies courses and their evolution but also articles in the press.
- the user access, the registred user can authenticate via two different methods : email/password and Oauth2. With this account he can create his own "favorites" list, keywords and he can change the preferences in his profile page.
- the administrator access, he can do all what the user does, but he can also manage global application preferences, he can list all the cryptocurrencies that can be consulted he can list the sources, in our case its RSS feed, to constitute the press review.

#### Crypto-currencies
You can find most of the knowd crypto currencies in this website via RSS feeds.


#### Press review
Our platform is able to provide the freshest news on crypto-currencies, and we ever have the freshest information with the background running service that will consume RSS feeds and offer a fine and up-todate press review.

---

### This project was build with :

![Postgres](https://img.shields.io/badge/postgres-%23000000.svg?style=for-the-badge&logo=postgres&logoColor=white)

![Adminer](https://img.shields.io/badge/adminer-%23000000.svg?style=for-the-badge&logo=adminer&logoColor=white)

![Adonisjs](https://img.shields.io/badge/adonisjs-%2300f.svg?style=for-the-badge&logo=adonisjs&logoColor=p)

![Nuxt3](https://img.shields.io/badge/nuxt3-%231A1918.svg?style=for-the-badge&logo=nuxt3&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%4300f.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>

---

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Docker


### Installation 1/3

```
git clone https://github.com/EpitechMscProPromo2025/T-WEB-700-NAN_3
```

### Docker 2/3

```
docker-compose up -d
```

### Installation 3/3

```
cd ./api && cp .env.example .env && cd ..

// in the root folder
pnpm install

cd api
node ace migration:fresh --seed
node ace rss:feed
```

### Run

```
// in the root folder
pnpm start:all

or

// API
cd ./api && node ace serve --watch

// Nuxt
cd ./front && pnpm dev
```

### DOCUMENTATION

- [SWAGGER](http://localhost:3333/docs/index.html)


<p align="right">(<a href="#readme-top">Back to the top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Some useful links we used during the project and would like to give credit to.

- [Adminer](https://www.adminer.org/)
- [Adonis](https://docs.adonisjs.com/guides/)
- [Nuxt3](https://nuxt.com/)

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>


