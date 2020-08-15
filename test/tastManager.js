const TaskManager = artifacts.require("./TaskManager.sol");

const getTask = async (instance, index, account) => {
  return instance.getTask(index, { from: account })
}

// TODO - break into smaller tests 

contract("TaskManager", accounts => {
  it("deploys correctly and handles task creation correctly", async () => {
    // Deploy contract
    const instance = await TaskManager.deployed();

    const tasks = ["Test", "ABC", "alert"];

    // Create 3 tasks from account 0.
    await instance.createTask(tasks[0], { from: accounts[0] });
    await instance.createTask(tasks[1], { from: accounts[0] });
    await instance.createTask(tasks[2], { from: accounts[0] });

    // Create 1 task from account 1;
    await instance.createTask("Alert", { from: accounts[1] });

    // Get no. of tasks for account 0.
    const tasksLengthA = (await instance.getTasksCount({ from: accounts[0] })).toNumber();
    const tasksLengthB = (await instance.getTasksCount({ from: accounts[1] })).toNumber();

    // Iterate + return tasks for account 0.
    const emptyTasksList = [...Array(tasksLengthA).keys()];
    const tasksList = await Promise.all(emptyTasksList.map(i => getTask(instance, i, accounts[0])));

    assert.equal(tasksLengthA, 3, "Length of account 0 tasks not equal to 3");
    assert.equal(tasksLengthB, 1, "Length of account 1 tasks not equal to 1");

    assert.equal(tasksList[0][0], tasks[0], `Task title not ${tasks[0]}`);
    assert.equal(tasksList[1][0], tasks[1], `Task title not ${tasks[1]}`);
    assert.equal(tasksList[2][0], tasks[2], `Task title not ${tasks[2]}`);

    const tasksNotComplete = tasksList.filter((arr) => arr[1]).length === 0;
    assert.equal(tasksNotComplete, true, `1 or more tasks are complete`);

    // Complete task
    await instance.completeTask(0, { from: accounts[0] })

    // Get task list
    const tasksListRefetch = await Promise.all(emptyTasksList.map(i => getTask(instance, i, accounts[0])));

    console.warn(tasksListRefetch)
    console.warn("Address", instance)
  });
});
