'use strict'
const mocks = {};


describe('controller command', () => {
	beforeEach(() => {
		jest.mock('../../service/commandService', () => {
			return {
				getSupportedCommands: jest.fn()
			}
		});

		mocks.commandService = require('../../service/commandService');
		mocks.commandController = require('../../controller/commadController');
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
})