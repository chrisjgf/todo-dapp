import React from "react";
import * as S from "./styles";

export interface Task {
  title: string;
  completed: boolean;
  index: number;
}

export interface Props {
  task: Task;
  onPress: (index: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onPress }: Props) => {
  const { title, completed, index } = task;

  const handlePress = (index: number) => onPress(index);

  return (
    <S.TaskItem
      completed={completed}
      onClick={() => !completed && handlePress(index)}
    >
      <p>{title}</p>
    </S.TaskItem>
  );
};

export default TaskItem;
