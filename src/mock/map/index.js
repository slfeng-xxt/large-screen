export default [
  {
    url: '/mock/api/getList', // 示例
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'data|10': [
          {
            id: '@id',
            name: '@name',
            age: '@integer(18, 60)',
            email: '@email',
            date: '@date("yyyy-MM-dd")',
          },
        ],
      }
    },
  },
]
