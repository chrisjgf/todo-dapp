// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract TaskManager {
    struct Task {
        string title;
        bool completed;
    }

    mapping(address => Task[]) public tasks;

    event TaskCreated(string title);
    event TaskCompleted(string title);

    function createTask(string memory _title) public {
        Task[] storage storedTasks = tasks[msg.sender];
        Task memory task = Task(_title, false);
        storedTasks.push(task);
        emit TaskCreated(task.title);
    }

    function completeTask(uint256 _index) public {
        Task[] storage storedTasks = tasks[msg.sender];
        require(storedTasks.length > _index, "Index out of bounds");
        storedTasks[_index].completed = true;
        emit TaskCompleted(storedTasks[_index].title);
    }

    function getTasksCount() public view returns (uint256) {
        return tasks[msg.sender].length;
    }

    function getTask(uint256 _index) public view returns (string memory, bool) {
        Task[] storage storedTasks = tasks[msg.sender];
        require(storedTasks.length > _index, "Index out of bounds");
        Task storage task = storedTasks[_index];
        return (task.title, task.completed);
    }
}
