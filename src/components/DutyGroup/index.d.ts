import React, { FC } from 'react'

export interface ITask {
  taskId: number
  taskName: string
}

export interface IDuty {
  name: string
  task: ITask[]
}

export interface IDuties {
  duties: IDuty[]
}

const DutyGroup: FC<IDuties> = () => React.ReactNode

export default DutyGroup
