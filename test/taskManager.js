const TaskManager = artifacts.require("./TaskManager.sol");

const getTask = async (instance, index, account) => {
  return instance.getTask(index, { from: account });
};

const tasks = ["task-0", "task-1", "task-2"];

contract("TaskManager", (accounts) => {
  it("creates tasks and returns the correct data length", async () => {
    const instance = await TaskManager.deployed();

    // Create 3 tasks from account 0.
    await instance.createTask(tasks[0], { from: accounts[0] });
    await instance.createTask(tasks[1], { from: accounts[0] });
    await instance.createTask(tasks[2], { from: accounts[0] });

    // Create 1 task from account 1;
    await instance.createTask("Alert", { from: accounts[1] });

    // Get no. of tasks for account 0.
    const tasksLengthA = (
      await instance.getTasksCount({ from: accounts[0] })
    ).toNumber();

    // Get no. of tasks for account 1.
    const tasksLengthB = (
      await instance.getTasksCount({ from: accounts[1] })
    ).toNumber();

    assert.equal(tasksLengthA, 3, "Length of account 0 tasks not equal to 3");
    assert.equal(tasksLengthB, 1, "Length of account 1 tasks not equal to 1");
  });

  it("creates tasks and returns the correct data", async () => {
    const instance = await TaskManager.deployed();

    // Create 3 tasks from account 0.
    await instance.createTask(tasks[0], { from: accounts[0] });
    await instance.createTask(tasks[1], { from: accounts[0] });
    await instance.createTask(tasks[2], { from: accounts[0] });

    // Get no. of tasks for account 0.
    const count = (
      await instance.getTasksCount({ from: accounts[0] })
    ).toNumber();

    const tasksList = await Promise.all(
      [...Array(count).keys()].map((i) => getTask(instance, i, accounts[0]))
    );

    assert.equal(tasksList[0][0], tasks[0], `Task title not ${tasks[0]}`);
    assert.equal(tasksList[1][0], tasks[1], `Task title not ${tasks[1]}`);
    assert.equal(tasksList[2][0], tasks[2], `Task title not ${tasks[2]}`);

    const tasksNotComplete = tasksList.filter((arr) => arr[1]).length === 0;
    assert.equal(tasksNotComplete, true, `1 or more tasks are complete`);
  });

  it("creates a task and marks as complete", async () => {
    const instance = await TaskManager.deployed();

    // Create task
    await instance.createTask(tasks[0], { from: accounts[0] });

    // Get task
    const task = await getTask(instance, 0, accounts[0]);

    assert.equal(task[0], tasks[0], `Task title not ${tasks[0]}`);
    assert.equal(task[1], false, `Task is completed`);

    // Complete task
    await instance.completeTask(0, { from: accounts[0] });

    // Get task
    const taskRefetch = await getTask(instance, 0, accounts[0]);

    assert.equal(taskRefetch[0], tasks[0], `Task title not ${tasks[0]}`);
    assert.equal(taskRefetch[1], true, `Task is not complete`);
  });
});
