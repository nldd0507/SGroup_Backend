import * as usersService from '../service/users.service.js';
import catchAsync from '../utils/catchAsync.js';
import { sendSuccess } from '../utils/responseHelper.js';
import {BadRequestError, NotFoundError} from '../core/error.response.js';

export const getAllUsers = catchAsync(async(req, res) => {
    const users = await usersService.getAllUsers();
    return sendSuccess(res, 200, 'Users retrieved successfully', users);
})


export const getUserById = catchAsync(async (req, res) => {
    const userId = Number(req.params.id);
    const user = await usersService.getUserById(userId);
    if (!user) throw new NotFoundError('User not found');
    return sendSuccess(res,200, 'User retrieved successfully', user)
});

export const createUser =catchAsync( async (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email) throw new BadRequestError('Name and email are required');
    const newUser = await usersService.createUser({ name, email, age });
    
    return sendSuccess(res, 201, 'User created successfully', newUser);
})

export const deleteUser = catchAsync( async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await usersService.deleteUser(userId);

    if (!deletedUser) throw new NotFoundError('User not found');
    return sendSuccess(res, 200, 'Deleted user successfully', deletedUser);

})

export const updateUser = catchAsync(async (req, res) => {

    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await usersService.updateUser(userId, updateData);

    if (!updatedUser) throw new NotFoundError('User not found');

    return sendSuccess(res, 200,'Update user successfully', updatedUser);
})