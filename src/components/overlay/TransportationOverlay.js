import { h } from 'vue'
import { STATUS_ENUM } from '@/utils/enum'

// 状态样式配置
const statusStyles = {
  [STATUS_ENUM.normal]: {
    background: 'linear-gradient(270deg, rgba(8, 70, 65, 0.35) 0%, #1D736C 100%)',
    textColor: '#00FF90',
  },
  [STATUS_ENUM.warning]: {
    background: 'linear-gradient(270deg, rgba(85, 60, 15, 0.35) 0%, #73551D 100%)',
    textColor: '#FF9D00',
  },
  [STATUS_ENUM.error]: {
    background: 'linear-gradient(270deg, rgba(70, 8, 8, 0.35) 0%, #731D1D 100%)',
    textColor: '#FF0000',
  },
}

// 创建刻度线
const createTick = ({
  tickTop = '-24px',
  tickLineHeight = '26px',
  hasText = true,
  tickColor,
  tickNodeText,
}) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        left: `${tickNodeText}%`,
        top: tickTop,
        width: '28px',
        height: '50px',
        zIndex: '2',
      },
    },
    [
      // 刻度文本
      hasText &&
        h(
          'div',
          {
            style: {
              height: '20px',
              color: tickColor,
              fontFamily: '"Alibaba PuHuiTi 2.0"',
              fontSize: '14px',
              fontWeight: '400',
            },
          },
          `${tickNodeText}%`,
        ),
      // 刻度线
      h('div', {
        style: {
          width: '2px',
          height: tickLineHeight,
          backgroundColor: tickColor,
        },
      }),
    ].filter(Boolean),
  )
}

export default {
  name: 'TransportationOverlay',
  props: {
    title: { type: String, required: true },
    status: { type: Number, default: STATUS_ENUM.normal },
    availableTime: { type: Number, required: true },
    progressSOC: { type: Number, default: 15 },
    expectedArriveTime: { type: Number, default: 0 },
    zIndex: { type: Number, default: 1 },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          style: {
            zIndex: props.zIndex,
            width: '332px',
            height: '157px',
            padding: '16px',
            borderRadius: '12px',
            border: '0.1px solid #FFF',
            background: statusStyles[props.status]?.background,
            backdropFilter: 'blur(7.5px)',
          },
        },
        [
          // Header
          h(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            },
            [
              // 标题
              h(
                'div',
                {
                  style: {
                    color: '#fff',
                    fontFamily: '"Alibaba PuHuiTi 2.0"',
                    fontSize: '18px',
                    fontWeight: '1000',
                    letterSpacing: '3.6px',
                  },
                },
                props.title,
              ),
              // 电池剩余可用时间
              h(
                'div',
                {
                  style: {
                    color: '#fff',
                    fontFamily: '"Alibaba PuHuiTi 2.0"',
                    fontSize: '14px',
                    fontWeight: '400',
                    letterSpacing: '2.8px',
                  },
                },
                [
                  '电池剩余可用时间:',
                  h(
                    'span',
                    {
                      style: {
                        color: '#FF9D00',
                      },
                    },
                    `${props.availableTime}分钟`,
                  ),
                ],
              ),
            ],
          ),

          // SOC进度条
          h(
            'div',
            {
              style: {
                position: 'relative',
                width: '300px',
                height: '26px',
                marginTop: '31px',
                backgroundColor: 'rgba(128, 128, 128, 0.20)',
                borderRadius: '9999px',
              },
            },
            [
              // 当前进度
              h('div', {
                style: {
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  width: '28%',
                  height: '26px',
                  backgroundColor: '#FF9D00',
                  borderRadius: '9999px',
                  zIndex: '1',
                },
              }),
              // 10% 刻度
              createTick({
                tickColor: '#FF0000',
                tickNodeText: '10',
              }),
              // 30% 刻度
              createTick({
                tickColor: '#FF8000',
                tickNodeText: '30',
              }),
              // 预计到达刻度
              createTick({
                tickTop: '0',
                tickLineHeight: '42px',
                hasText: false,
                tickColor: '#80FF00',
                tickNodeText: props.progressSOC,
              }),
              // 进度条百分比文字
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    right: '12px',
                    top: '3px',
                    color: '#FFF',
                    fontFamily: '"Alibaba PuHuiTi 2.0"',
                    fontSize: '14px',
                    fontWeight: '400',
                    zIndex: '2',
                  },
                },
                [
                  '剩余soc：',
                  h(
                    'span',
                    {
                      style: {
                        color: '#FF9D00',
                      },
                    },
                    `${props.progressSOC}%`,
                  ),
                ],
              ),
            ],
          ),

          // Footer
          h(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '19px',
              },
            },
            [
              // 左侧
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                  },
                },
                [
                  // 图标
                  h('img', {
                    style: {
                      width: '20px',
                      height: '14px',
                    },
                    src: '/src/assets/images/overlay/task-car-icon.png',
                  }),
                  // 文本
                  h(
                    'div',
                    {
                      style: {
                        paddingLeft: '8px',
                        color: '#fff',
                        fontFamily: '"Alibaba PuHuiTi 2.0"',
                        fontSize: '14px',
                        fontWeight: '400',
                        letterSpacing: '2.8px',
                      },
                    },
                    [
                      '后续车辆预计到达时间：',
                      h(
                        'span',
                        {
                          style: {
                            color: '#00FF90',
                          },
                        },
                        `${props.expectedArriveTime}分钟`,
                      ),
                    ],
                  ),
                ],
              ),
              // 右侧箭头
              h('img', {
                style: {
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                },
                src: '/src/assets/images/overlay/right-arrow-icon.png',
                onClick: () => {
                  console.log('右箭头被点击了')
                },
              }),
            ],
          ),
        ],
      )
  },
}
