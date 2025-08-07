import { home } from "./home";
import { account } from "./account";
import { collection } from "./collection";
import { product } from "./product";
import { recipeDetail } from "./recipeDetail";
import { search } from "./search";
import { loginPage } from "./login";

export default [
    ...home,
    ...account,
    ...collection,
    ...product,
    ...recipeDetail,
    ...search,
    ...loginPage
]