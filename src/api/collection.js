import instance from '@/api/config'
import { getCollectionRecipes as getCollectionRecipesMock } from '@/mock/collection'

export const getCollectionRecipes = async (page) => {
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: 'success',
      data: getCollectionRecipesMock(page),
    }
  }
  const res = await instance.get('/collection', {
    params: {
      page
    }
  })
  return res
}
