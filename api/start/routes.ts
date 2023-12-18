/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group((): void => {
  // Authenticated routes (require a valid token)
  Route.group((): void => {
    Route.get("/profile", "UsersController.profile");
    Route.put("/profile", "UsersController.update");
    Route.post("/logout", "UsersController.logout");
  }).middleware("auth:api");

  Route.post("/login", "UsersController.login");
  Route.post("/register", "UsersController.register");
}).prefix("/api/users");

Route.get("/", async () => {
  return { hi: "coucou from API !" };
});

Route.get("/api/header-data", "HeadersController.index");
Route.get("/cryptocurrency-data", "CryptocurrencyDataController.index");

Route.get("oauth/:provider/redirect", "UsersAuthProvidersController.redirect");

Route.get("oauth/:provider/callback", "UsersAuthProvidersController.callback");
