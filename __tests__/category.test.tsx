import { useGetCategories } from '@/services/category/category.service'
import { ICategory } from '@/shared/types'

jest.mock('@/services/category/category.service', () => ({
  useGetCategories: jest.fn()
}))

const mockedUseGetCategories = jest.mocked(useGetCategories)

describe('Category Service', () => {
  beforeEach(async () => {
    jest.clearAllMocks() // bu sayede her testten önce mock fonksiyonlar sıfırlanır, yani her test birbirinden bağımsız çalışır
  })

  const mockCategoryData = {
    subCategories: [],
    parentCategoryId: undefined
  }

  it('should return categories', async () => {
    mockedUseGetCategories.mockReturnValueOnce({
      data: [mockCategoryData]
    } as unknown as any)

    const { data } = mockedUseGetCategories()

    expect(data).toEqual([mockCategoryData])
  })
})
