'use strict'
const mocks = {};

let
	send,
	res = {};


describe('controller command', () => {
	beforeEach(() => {
		jest.mock('../../service/commandService', () => {
			return {
				getSupportedCommands: jest.fn(),
				createNewCommand: jest.fn()
			}
		});

		mocks.commandService = require('../../service/commandService');
		mocks.commandController = require('../../controller/commadController');

		send = jest.fn();
		res = { status: jest.fn().mockReturnValue({ send }) };
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getCommandNametoValuesMap', () => {
		it('it should call the correct methods to build a map of the commands available', async () => {
			//GIVEN
			let
				commandAvailable = [{
					dataValues: {
						Name: 'test-1',
						Movement_change: 0,
						Direction_change: 0
					}
				}],
				commandNameToValuesName = {
					'test-1': {
						movementModification: 0,
						directionModification: 0
					}
				}
			mocks.commandService.getSupportedCommands.mockResolvedValue(commandAvailable);
			//WHEN
			const returnedMap = await mocks.commandController.getCommandNametoValuesMap();
			//THEN
			expect(mocks.commandService.getSupportedCommands).toHaveBeenCalledTimes(1);
			expect(mocks.commandService.getSupportedCommands).toHaveBeenCalledWith();
			expect(returnedMap).toEqual(commandNameToValuesName);
		});
		it('it should reject an error', async () => {
			//GIVEN
			const error = new Error('test-error');
			mocks.commandService.getSupportedCommands.mockRejectedValue(error);
			//WHEN
			await expect(mocks.commandController.getCommandNametoValuesMap()).rejects.toThrowError(error);
			//THEN
			expect(mocks.commandService.getSupportedCommands).toHaveBeenCalledTimes(1);
			expect(mocks.commandService.getSupportedCommands).toHaveBeenCalledWith();
		});
	});
	describe('createNewCommand', () => {
		it('it should create a new command on the database when the body is valid', async () => {
			//GIVEN
			const
				req = {
					body: {
						name: 'T',
						movementChange: 0,
						directionChange: 180
					}
				},
				newCommandOnDatabase = {
					dataValues: {
						Name: 'T',
						Movement_change: 0,
						Direction_change: 180
					}
				};
			mocks.commandService.createNewCommand.mockResolvedValue(newCommandOnDatabase);
			//WHEN
			await mocks.commandController.createNewCommand(req, res);
			//THEN
			expect(mocks.commandService.createNewCommand).toHaveBeenCalledTimes(1);
			expect(mocks.commandService.createNewCommand).toHaveBeenCalledWith(req.body);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith('New command created: ' + newCommandOnDatabase.dataValues);
		});
		it('it should throw an error if the name in the body is not valid', async () => {
			//GIVEN
			const
				req = {
					body: {
						name: 'ERROR',
						movementChange: 1,
						directionChange: 90
					}
				}
			//WHEN
			await mocks.commandController.createNewCommand(req, res);
			//THEN
			expect(mocks.commandService.createNewCommand).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith("createNewCommand | Unexpected error: The name of the command must be a single character");
		});
		it('it should throw an error if the movementChange in the body is not valid', async () => {
			//GIVEN
			const
				req = {
					body: {
						name: 'T',
						movementChange: 'error',
						directionChange: 90
					}
				}
			//WHEN
			await mocks.commandController.createNewCommand(req, res);
			//THEN
			expect(mocks.commandService.createNewCommand).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith("createNewCommand | Unexpected error: The movement value around the axies must be an integer");
		});
		it('it should throw an error if the directionChange in the body is not valid', async () => {
			//GIVEN
			const
				req = {
					body: {
						name: 'T',
						movementChange: 0,
						directionChange: 250
					}
				}
			//WHEN
			await mocks.commandController.createNewCommand(req, res);
			//THEN
			expect(mocks.commandService.createNewCommand).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith("createNewCommand | Unexpected error: Direction angle change must be an integer multiple of 90");
		});
	});
})