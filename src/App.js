import React, { useRef, useEffect, useState } from 'react';
import GGEditor, { Flow, ContextMenu, Command } from 'gg-editor';

import { DutyGroup } from './components'

const findMaxString = (s) => {
  let max = ''

  for (let i = 0; i < s.length; ++i) {
    if (s[i].length > max.length) {
      max = s[i]
    }
  }

  return max
}

const generateTaskNode = (tasks, minLeft, rowHeight) => {
  const nodes = []
  tasks.forEach((task, i) => {
    let accWidth = minLeft + 20
    // node 节点是以节点中点计算坐标
    task.forEach((t, j) => {
      const width = t.name.length * 14 + 20
      accWidth += width / 2
      nodes.push({
        type: 'node',
        size: `${width}*40`, // '70*40',
        shape: 'flow-rect',
        color: '#FA8C16',
        label: t.name,
        x: accWidth + 20,
        y: rowHeight * i + 30,
        id: t.id.toString(),
        index: 2,
        parent: 'group2',
      })
      accWidth += width / 2 + 20
    })
  })
  return nodes
}

const testDuty = ['测试职责一', '测试职责二', '测试职责二, 测试职责二']
const tasks = [
  [{ id: 0, name: '任务一' }, { id: 1, name: '任务二任务二' }, { id: 3, name: '任务三' }],
  [{ id: 4, name: '任务一任务' }, { id: 5, name: '任务二' }, { id: 6, name: '任务三' }],
  [{ id: 7, name: '指责三的任务一' }, { id: 8, name: '任务二' }, { id: 9, name: '任务三' }]
]
function App() {
  const fontSize = 14
  const rowHeight = 280
  const margin = 20
  const maxFirstColumnWidth = findMaxString(testDuty).length * fontSize

  const [data, setData] = useState(() => {
    const nodes = generateTaskNode(tasks, maxFirstColumnWidth, rowHeight)
    const data = {
      nodes,
      groups: [
        {
          id: 'group2',
          shape: 'dutyGroup',
          label: '群组'
        }
      ],
    }
    return data
  })
  

  const editorRef = useRef()

  const [saveData, setSave] = useState()
  const save = () => {
    const graph = editorRef.current.graph
    const d = graph.save()
    graph.setFitView('autoZoom')
    console.log(graph)
    setData(d)
    setSave(JSON.stringify(d, true, 2))
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '1px solid black', display: 'inline-block' }}>
          <GGEditor>
            <Flow
              ref={editorRef}
              data={data}
              style={{ width: 1000, height: 800 }}
            />

            <DutyGroup
              fontSize={fontSize}
              duties={testDuty}
              rowHeight={rowHeight}
              margin={margin}
              maxFirstColumnWidth={maxFirstColumnWidth}
            />
              <ContextMenu className='contextMenu'>
                <Command name="undo">
                  <div className='item'>
                    撤销
                  </div>
                </Command>
                <Command name="redo">
                  <div className='item'>
                    重做
                  </div>
                </Command>
              </ContextMenu>
          </GGEditor>
        </div>
      </div>
      <p style={{ textAlign: 'center' }}>
        <button onClick={save}>保存</button>
      </p>
 
      <pre>
        {saveData}
      </pre>
    </>
  );
}

export default App;
