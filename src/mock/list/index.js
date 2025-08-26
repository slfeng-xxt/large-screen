export default [
  {
    url: '/mock/api/getBatteryServer',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'records|16': [
          {
            name: '@integer(20, 41)号舱',
            addr: '油41-@integer(1, 100)',
            power: '@integer(100, 200)',
            soc: '@integer(5, 60)',
          },
        ],
      }
    },
  },
  {
    url: '/mock/api/getBatteryCharge',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'records|16': [
          {
            name: '@integer(20, 41)号舱',
            addr: '油41-@integer(1, 100)',
            power: '@integer(100, 200)',
            time: '@integer(5, 60)',
          },
        ],
      }
    },
  },
  {
    url: '/mock/api/getBatteryWait',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'records|16': [
          {
            name: '@integer(20, 41)号舱',
            status: '@pick(["运输中", "钻具充电站1号",])',
            soc: '@integer(90, 100)',
          },
        ],
      }
    },
  },
  {
    url: '/mock/api/getChargingStatus',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'records|15': [
          {
            name: '钻具充电站1@integer(1, 20)',
            // 'mode|+1': ['光伏', '市电', '并行'],
            mode: '@pick(["光伏", "市电", "并行"])',
            power: '@integer(1000, 2000) kWh',
            num: '@integer(0, 8)/8',
          },
        ],
      }
    },
  },
  {
    url: '/mock/api/getEnergyCost',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '成功',
        'records|10': [
          {
            name: '油41-@integer(1, 100)号',
            energy: '@integer(500, 2000) kWh',
            cost: '@integer(1000, 5000) 元',
          },
        ],
      }
    },
  },
]
