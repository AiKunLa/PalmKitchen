import instance from '@/api/config'

export const getCollectionRecipes = async (page) => {
  const res = await instance.get('/collection', {
    params: {
      page
    }
  })
  return res
}
