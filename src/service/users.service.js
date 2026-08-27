import { readData } from "../repository/readData.js";
import { writeData } from "../repository/writeData.js"
export const getAllUsers = async () => {
  try {
    const data = await readData();
    return data.users;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const getUserById = async (userId) => {
  try {
    const data = await readData();

    const user = data.users.find(user => user.id === parseInt(userId));
    return user || null;
  }
  catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}

export const createUser = async (userData) => {
  try {
    const data = await readData();

    const newId = data.users.length > 0 ? Math.max(...data.users.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      age: Number(userData.age)
    }
    data.users.push(newUser);

    await writeData(data);

    return newUser;
  }
  catch (error) {
    console.error('Error while creating user:', error);
    throw error;
  }
}

export const deleteUser = async (userId) => {
  try {
    const data = await readData();
    const id = parseInt(userId);

    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const [deletedUser] = data.users.splice(userIndex, 1);
    await writeData(data);

    return deletedUser;
  }
  catch (error) {
    console.error(`Error while deleting user with ID ${userId}:`, error);
    throw error;
  }
}

export const updateUser = async (userId, updateData) => {
  try {
    const data = await readData();
    const id = parseInt(userId);

    const userIndex = data.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    const currentUser = data.users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...(updateData.name !== undefined && { name: updateData.name }),
      ...(updateData.email !== undefined && { email: updateData.email }),
      ...(updateData.age !== undefined && { age: Number(updateData.age) }),
      id: currentUser.id
    };

    data.users[userIndex] = updatedUser;
    await writeData(data);

    return updatedUser;
  }
  catch (error) {
    console.error(`Error while updating user with ID ${userId}:`, error);
    throw error;
  }
}