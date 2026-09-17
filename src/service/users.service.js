import * as userRepository from "../repository/user.repository.js";

export const getAllUsers = async () => {
  return await userRepository.findAll();
};

export const getUserById = async (userId) => {
  return await userRepository.findById(userId);
};

export const createUser = async (userData) => {
  return await userRepository.create(userData);
};

export const deleteUser = async (userId) => {
  return await userRepository.deleteById(userId);
};

export const updateUser = async (userId, updateData) => {
  return await userRepository.update(userId, updateData);
};