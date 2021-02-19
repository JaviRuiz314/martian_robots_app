'use strict'
const mocks = {};

let
	send,
	res = {};

describe('controller objectTracker', () => {
	beforeEach(() => {
		jest.mock('../../service/marsTerrainService', () => {
			return {
				retrieveSelectedGridOrLatest: jest.fn()
			}
		});
		jest.mock('../../service/robotService', () => {
			return {
				retrieveLatestRobotAvailable: jest.fn()
			}
		});
		jest.mock('../../service/objectTrackerService', () => {
			return {
				executeStringOfCommands: jest.fn()
			}
		});
		jest.mock('../../controller/commadController', () => {
			return {
				getCommandNametoValuesMap: jest.fn()
			}
		});

		mocks.marsTerrainService = require('../../service/marsTerrainService');
		mocks.robotService = require('../../service/robotService');
		mocks.objectTrackerService = require('../../service/objectTrackerService');
		mocks.commadController = require('../../controller/commadController');
		mocks.objectTrackerController = require('../../controller/objectTrackerController');

		send = jest.fn();
		res = { status: jest.fn().mockReturnValue({ send }) };
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('receiveInstructions', () => {
		it('it should call the correct methods to execute a string of command', async () => {
			//GIVEN
			const
				req = {
					query: {
						inPosition: '11E',
						commandString: 'RFRFRF',
					}
				},
				parsedInPosition = [1, 1, 'E'],
				availableCommadsMap = 'test',
				robot = { dataValues: { Id: 1} },
				marsTerrain = {  Id: 1 },
				destination = '11W';
			mocks.commadController.getCommandNametoValuesMap.mockResolvedValue(availableCommadsMap);
			mocks.marsTerrainService.retrieveSelectedGridOrLatest.mockResolvedValue(marsTerrain);
			mocks.robotService.retrieveLatestRobotAvailable.mockResolvedValue(robot);
			mocks.objectTrackerService.executeStringOfCommands.mockResolvedValue([destination, 'test']);
			//WHEN
			await mocks.objectTrackerController.receiveInstructions(req, res);
			//THEN
			expect(mocks.commadController.getCommandNametoValuesMap).toHaveBeenCalledTimes(1);
			expect(mocks.commadController.getCommandNametoValuesMap).toHaveBeenCalledWith();
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledWith();
			expect(mocks.robotService.retrieveLatestRobotAvailable).toHaveBeenCalledTimes(1);
			expect(mocks.robotService.retrieveLatestRobotAvailable).toHaveBeenCalledWith();
			expect(mocks.objectTrackerService.executeStringOfCommands).toHaveBeenCalledTimes(1);
			expect(mocks.objectTrackerService.executeStringOfCommands).toHaveBeenCalledWith(marsTerrain, robot.dataValues.Id, parsedInPosition, req.query.commandString, availableCommadsMap);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(destination);
		});
	});
})