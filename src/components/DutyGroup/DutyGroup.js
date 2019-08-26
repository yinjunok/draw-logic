import React from 'react'
import { RegisterGroup } from 'gg-editor'

/*
  算法
  一: 自己算位置
  1. 总宽度 = 第一列宽度 + 第二列宽度
  2. 第一列宽度 = 最长职责名列宽度
  3. 第二列宽度 = 最长任务列

  二: 浏览器自己算
  根据数据生成 table, 插入浏览器. 然后计算各列的宽度
*/

const DutyGroup = ({
  duties,
  margin,
  fontSize,
  rowHeight,
  maxFirstColumnWidth,
}) => {
  maxFirstColumnWidth += margin
  const dutyGroupConfig = {
    draw(item) {
      const group = item.getGraphicGroup();
      const childrenBox = item.getChildrenBBox();

      duties.forEach((ele, i) => {
        // 添加职责
        group.addShape('text', {
          attrs: {
            x: (maxFirstColumnWidth - ele.length * fontSize) / 2,
            y: (rowHeight * i) + ((rowHeight + fontSize) / 2),
            text: ele,
            fill: 'black',
            fontSize,
          }
        });
        if ((i !== 0) || (i !== duties.length - 1)) {
          group.addShape('line', {
            attrs: {
              x1: 0,
              y1: rowHeight * i,
              x2: childrenBox.maxX + margin,
              y2: rowHeight * i,
              stroke: 'black'
            }
          })
        }
      });

      group.addShape('line', {
        attrs: {
          x1: maxFirstColumnWidth,
          y1: 0,
          x2: maxFirstColumnWidth,
          y2: rowHeight * duties.length,
          stroke: 'black'
        }
      })
      // console.log(childrenBox)
      return group.addShape('rect', {
        attrs: {
          ...childrenBox,
          x: 0,
          y: 0,
          width: childrenBox.maxX + margin,
          height: rowHeight * duties.length,
          stroke: 'black'
        }
      });
    }
  }

  return <RegisterGroup name='dutyGroup' config={dutyGroupConfig} />
}

export default DutyGroup
