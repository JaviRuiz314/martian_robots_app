'use strict'

const
	mocks = {};

describe('service command', () => {
	beforeEach(() => {
		jest.mock('../../models', () => {
			return {
				Command: {
					findAll: jest.fn(),
					create: jest.fn()
				}
			}
		});

		mocks.commandService = require('../../service/commandService');
		mocks.models = require('../../models');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getSupportedCommands', () => {
		it('it should call the correct methods to get the commands store in database ', async () => {
			//GIVEN
			const
				commandsInDatabase = [
					{
						dataValues: {
							Name: 'F',
							Movement_change: 1,
							Direction_change: 0
						}
					},
					{
						dataValues: {
							Name: 'R',
							Movement_change: 0,
							Direction_change: 90
						}
					},
					{
						dataValues: {
							Name: 'L',
							Movement_change: 0,
							Direction_change: -90
						}
					}];
			mocks.models.Command.findAll.mockResolvedValue(commandsInDatabase);
			//WHEN
			const commandList = await mocks.commandService.getSupportedCommands();
			//THEN
			expect(mocks.models.Command.findAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Command.findAll).toHaveBeenCalledWith();
			expect(commandList).toEqual(commandsInDatabase);
		});
		it('it should reject an error', async () => {
			//GIVEN
			const error = new Error('error');
			mocks.models.Command.findAll.mockRejectedValue(error);
			//WHEN
			await expect(mocks.commandService.getSupportedCommands).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.Command.findAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Command.findAll).toHaveBeenCalledWith();
		});
		describe('createNewCommand', () => {
			it('it should create a new command record in the database', async () => {
				//GIVEN
				const
					commandData = {
						name: 'T',
						movementChange: 0,
						directionChange: 180
					},
					newCommandOnDatabase = {
						dataValues: {
							Name: 'T',
							Movement_change: 0,
							Direction_change: 180
						}
					}
				mocks.models.Command.create.mockResolvedValue(newCommandOnDatabase);
				//WHEN
				const newCommand = await mocks.commandService.createNewCommand(commandData);
				//THEN
				expect(mocks.models.Command.create).toHaveBeenCalledTimes(1);
				expect(mocks.models.Command.create).toHaveBeenCalledWith({
					Name: commandData.name,
					Movement_changue: commandData.movementChange,
					Direction_change: commandData.directionChange
				});
				expect(newCommand).toEqual(newCommandOnDatabase);
			});
			it('it shoud reject an error', async () => {
				//GIVEN
				const
					error = new Error('error'),
					commandData = {
						name: 'T',
						movementChange: 0,
						directionChange: 180
					};
				mocks.models.Command.create.mockRejectedValue(error);
				//WHEN
				await expect(mocks.commandService.createNewCommand(commandData)).rejects.toThrowError(error);
				//THEN
				expect(mocks.models.Command.create).toHaveBeenCalledTimes(1);
				expect(mocks.models.Command.create).toHaveBeenCalledWith({
					Name: commandData.name,
					Movement_changue: commandData.movementChange,
					Direction_change: commandData.directionChange
				});
			})
		});
	});
});
