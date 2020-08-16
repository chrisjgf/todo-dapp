import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import TaskItem, { Task } from "../../components/TaskItem";
import { ModalType, useModalContext } from "../../context/ModalContext";
import TaskManager from "../../contracts/TaskManager.json";
import { shortenAddress } from "../../utils";
import * as S from "./styles";

const { ConnectWallet } = ModalType;

const Main: React.FC = () => {
  const [_, setModalVisibility] = useModalContext();
  const { account, connector } = useWeb3React();

  const [tasks, setTasks] = useState<Task[] | undefined>();
  const [instance, setInstance] = useState<ethers.Contract | undefined>();

  const addTask = async (title: string) => {
    const tx = await instance?.createTask(title);
    console.warn(tx);
  };

  const getTask = async (index: number, instance: ethers.Contract) => {
    return instance?.getTask(index);
  };

  const completeTask = async (index: number) => {
    const tx = await instance?.completeTask(index);
    console.warn("MARKED", tx);
  };

  useEffect(() => {
    (async () => {
      const provider = await connector?.getProvider();
      if (!provider) return;
      const signer = new ethers.providers.Web3Provider(provider).getSigner();
      const instance = new ethers.Contract(
        "0x19d156b4acf438cfe3f1ce1d1b1f079ff3ff7a5b",
        TaskManager.abi,
        signer
      );

      const count = (await instance?.getTasksCount()).toNumber();
      const tasks = await Promise.all(
        [...Array(count).keys()].map((i) => getTask(i, instance))
      );
      const mappedTasks: Task[] = tasks.map((t, i) => ({
        title: t[0],
        completed: t[1],
        index: i,
      }));

      setTasks(mappedTasks);
      setInstance(instance);
    })();
  }, [connector]);

  const handleItemPress = async (index: number) => completeTask(index);

  return (
    <S.Home>
      <Input placeholder={"Enter your task here"} onSubmit={addTask} />
      <S.TaskWrapper style={{ width: "50%" }}>
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

export default Main;
