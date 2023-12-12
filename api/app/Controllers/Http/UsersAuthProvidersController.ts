import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UsersAuthProvider from "../../Models/UsersAuthProvider";

export default class UsersAuthProvidersController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).stateless().redirect();
  }

  public async callback({ ally, params, auth }: HttpContextContract) {
    const statelessConnection = await ally.use(params.provider).stateless();
    const socialUser = JSON.parse(
      JSON.stringify(await statelessConnection.user())
    );

    try {
      console.log("Provider:", params.provider);
      console.log("Provider_id:", socialUser.id);

      const user = await UsersAuthProvider.query()
        .where("provider_id", socialUser.id)
        .where("provider", params.provider)
        .firstOrFail();

      await auth.use("api").login(user);
      // const token = await auth.use("api").generate(user);

      return { user };
    } catch (e) {
      console.log(e);
    }
  }
}
