import { getCommonSelectList } from '@/service/common'
import localCache from '@/utils/cache'
const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`
export const colorList = () => {
  const res = []
  for (let i = 0; i < 101; i++) {
    res.push(randomHex())
  }
  return ['#fff', ...res]
}

export const tColor = [
  '#000000',
  '#ffffff',
  '#eeece1',
  '#1e497b',
  '#4e81bb',
  '#e2534d',
  '#9aba60',
  '#8165a0',
  '#47acc5',
  '#f9974c'
]
const colorConfig = [
  ['#7f7f7f', '#f2f2f2'],
  ['#0d0d0d', '#808080'],
  ['#1c1a10', '#ddd8c3'],
  ['#0e243d', '#c6d9f0'],
  ['#233f5e', '#dae5f0'],
  ['#632623', '#f2dbdb'],
  ['#4d602c', '#eaf1de'],
  ['#3f3150', '#e6e0ec'],
  ['#1e5867', '#d9eef3'],
  ['#99490f', '#fee9da']
]

// 格式化 hex 颜色值
function parseColor(hexStr: any) {
  if (hexStr.length === 4) {
    hexStr =
      '#' +
      hexStr[1] +
      hexStr[1] +
      hexStr[2] +
      hexStr[2] +
      hexStr[3] +
      hexStr[3]
  } else {
    return hexStr
  }
}

// RGB 颜色 转 HEX 颜色
function rgbToHex(r: any, g: any, b: any) {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}
// HEX 转 RGB 颜色
function hexToRgb(hex: any) {
  hex = parseColor(hex)
  const rgb = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return rgb
}

function gradient(startColor: any, endColor: any, step: any) {
  // hex 转换为 rgb
  const sColor = hexToRgb(startColor)
  const eColor = hexToRgb(endColor)
  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step
  const gStep = (eColor[1] - sColor[1]) / step
  const bStep = (eColor[2] - sColor[2]) / step
  const gradientColorArr = []
  // 计算每一步的hex值
  for (let i = 0; i < step; i++) {
    gradientColorArr.push(
      rgbToHex(
        parseInt((rStep * i + sColor[0]) as any),
        parseInt((gStep * i + sColor[1]) as any),
        parseInt((bStep * i + sColor[2]) as any)
      )
    )
  }
  return gradientColorArr
}

// 颜色面板
export function colorPanel() {
  const colorArr = []
  for (const color of colorConfig) {
    colorArr.push(gradient(color[1], color[0], 7))
  }
  return colorArr
}

console.log(colorPanel())

// export const colorListData: any[] = []
// getCommonSelectList('editorColorList').then((res) => {
//   if (!res.result) {
//     localCache.setCache('defaultColor', res.data.rows)
//   }
// })
