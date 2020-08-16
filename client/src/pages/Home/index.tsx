import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState, useCallback } from "react";
import Input from "../../components/Input";
import TaskItem, { Task } from "../../components/TaskItem";
import TaskManager from "../../contracts/TaskManager.json";
import * as S from "./styles";

const TaskCreatedEvent = ethers.utils.id("TaskCreated(string)");
const TaskCompletedEvent = ethers.utils.id("TaskCompleted(string)");

const Home: React.FC = () => {
  const { connector } = useWeb3React();

  const [tasks, setTasks] = useState<Task[] | undefined>();
  const [instance, setInstance] = useState<ethers.Contract | undefined>();

  const addTask = async (title: string) => instance?.createTask(title);
  const completeTask = async (index: number) => instance?.completeTask(index);
  const getTask = useCallback(
    async (index: number) => instance?.getTask(index),
    [instance]
  );
  const getTasksCount = useCallback(async () => instance?.getTasksCount(), [
    instance,
  ]);

  const updateTasks = useCallback(async () => {
    const count = await getTasksCount();
    if (!count) return;

    const tasks = await Promise.all(
      [...Array(count.toNumber()).keys()].map((i) => getTask(i))
    );
    const mappedTasks: Task[] = tasks.map((t, i) => ({
      title: t[0],
      completed: t[1],
      index: i,
    }));

    setTasks(mappedTasks);
  }, [getTask, getTasksCount]);

  // Update tasks on instance change.
  useEffect(() => {
    if (!instance) return;

    updateTasks();

    instance.on(TaskCompletedEvent, () => updateTasks());
    instance.on(TaskCreatedEvent, () => updateTasks());
  }, [instance, updateTasks]);

  // Setup contract instance
  useEffect(() => {
    (async () => {
      const provider = await connector?.getProvider();
      if (!provider) return;

      const signer = new ethers.providers.Web3Provider(provider).getSigner();
      const contract = new ethers.Contract(
        "0x19d156b4acf438cfe3f1ce1d1b1f079ff3ff7a5b",
        TaskManager.abi,
        signer
      );

      setInstance(contract);
    })();
  }, [connector]);

  const handleItemPress = async (index: number) => completeTask(index);

  return (
    <S.Home>
      <Input placeholder={"Enter your task here"} onSubmit={addTask} />
      <S.TaskWrapper>
        {!!tasks &&
          tasks.map((task, i) => (
            <TaskItem
              task={task}
              onPress={handleItemPress}
              key={`${i}-${task.title}`}
            />
          ))}
      </S.TaskWrapper>
    </S.Home>
  );
};

export default Home;
