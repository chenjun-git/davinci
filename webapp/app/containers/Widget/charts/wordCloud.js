/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

/*
 * WordCloud chart options generator
 */

import defaultEchartsTheme from '../../../assets/json/echartsThemes/default.project.json'
const colors = defaultEchartsTheme.theme.color

export default function (dataSource, flatInfo, chartParams) {
  const {
    title,
    gridSize,
    sizeRangeX,
    sizeRangeY

  } = chartParams

  let metricOptions,
    gridSizeOption,
    sizeRangeOption,
    gridOptions

  // series 数据项
  let metricArr = []

  gridSizeOption = gridSize && {
    gridSize: gridSize
  }

  sizeRangeOption = (sizeRangeX || sizeRangeY) && {
    sizeRange: [sizeRangeX || 0, sizeRangeY || 0]
  }

  const grouped = dataSource.reduce((acc, val) => {
    let objName = val[title]
    if (acc[objName]) {
      acc[objName].value += 1
    } else {
      acc[objName] = {
        name: objName,
        value: 1
      }
    }
    return acc
  }, {})

  let serieObj = Object.assign({}, {
    type: 'wordCloud',
    textStyle: {
      normal: {
        color: function () {
          return colors[Math.floor(Math.random() * colors.length)]
        }
      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,.15)'
      }
    },
    data: Object.keys(grouped).map(k => grouped[k]),
    rotationStep: 45,
    rotationRange: [-90, 90]
  },
    gridSizeOption,
    sizeRangeOption
  )
  metricArr.push(serieObj)
  metricOptions = {
    series: metricArr
  }

  // grid
  gridOptions = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }

  return Object.assign({},
    metricOptions,
    gridOptions
  )
}
