'use strict'
const
	util = require('../../shared/util'),
	mocks = {},
	availableCommadsMap = {
		'F': {
			movementModification: 1,
			directionModification: 0
		},
		'R': {
			movementModification: 0,
			directionModification: -90
		},
		'L': {
			movementModification: 0,
			directionModification: 90
		}
	};

describe('service objectTracker', () => {
	beforeEach(() => {
		jest.mock('../../service/robotService', () => {
			return {
				updateLostRobotStatus: jest.fn(),
				findLostRobotsScent: jest.fn()
			}
		});
		jest.mock('../../service/movementService', () => {
			return {
				changueDirection: jest.fn(),
				calculateNewCoordinates: jest.fn()
			}
		});

		mocks.robotService = require('../../service/robotService');
		mocks.movementService = require('../../service/movementService');
		mocks.objectTrackerService = require('../../service/objectTrackerService');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('executeStringOfCommands', () => {
		it('it should call the correct methods to execute a string of commands', async () => {
			//GIVEN
			const
				perimeter = {
					Dimension_X: 5,
					Dimension_Y: 10
				},
				robotId = 1,
				inPosition = [1, 1, 'E'],
				position = [1, 1, 'E'],
				commandString = 'FR';
			mocks.movementService.calculateNewCoordinates.mockReturnValueOnce([1, 2]);
			mocks.movementService.changueDirection.mockReturnValueOnce('S');
			//WHEN
			const [finalPosition, finalStatus] = await mocks.objectTrackerService.executeStringOfCommands(perimeter, robotId, position, commandString, availableCommadsMap);
			//THEN
			expect(mocks.movementService.calculateNewCoordinates).toHaveBeenCalledTimes(1);
			expect(mocks.movementService.calculateNewCoordinates).toHaveBeenCalledWith(inPosition[0], inPosition[1], inPosition[2], availableCommadsMap['F'].movementModification);
			expect(mocks.movementService.changueDirection).toHaveBeenCalledTimes(1);
			expect(mocks.movementService.changueDirection).toHaveBeenCalledWith(inPosition[2], availableCommadsMap['R'].directionModification);
			expect(finalPosition).toEqual([1, 2, 'S']);
			expect(finalStatus).toEqual(undefined);
		});
/*		it('it should call the correct methods when a robot its lost', async () => {
			//GIVEN
			const
				perimeter = {
					Dimension_X: 2,
					Dimension_Y: 1
				},
				robotId = 1,
				inPosition = [1, 1, 'E'],
				position = [3, 1, 'E'],
				commandString = 'FF';
			mocks.movementService.calculateNewCoordinates
				.mockResolvedValueOnce([2, 1])
				.mockResolvedValueOnce([3, 1])
			mocks.robotService.findLostRobotsScent.mockResolvedValue([]);
			//WHEN
			const response = await mocks.objectTrackerService.executeStringOfCommands(perimeter, robotId, position, commandString, availableCommadsMap);
			//THEN
			expect(mocks.movementService.calculateNewCoordinates).toHaveBeenCalledTimes(2);
			expect(mocks.movementService.calculateNewCoordinates).toHaveBeenCalledWith( 3, 1, 'E', availableCommadsMap['F'].movementModification);
			//expect(mocks.movementService.calculateNewCoordinates).toHaveBeenNthCalledWith(1, position[0], position[1], position[2], availableCommadsMap['F'].movementModification);
			expect(mocks.robotService.findLostRobotsScent).toHaveBeenCalledTimes(1);
			expect(mocks.robotService.findLostRobotsScent).toHaveBeenCalledWith([2, 1, 'E'], 'F');
			expect(mocks.robotService.updateLostRobotStatus).toHaveBeenCalledTimes(1);
			expect(mocks.robotService.updateLostRobotStatus).toHaveBeenCalledWith(robotService, [2, 1, 'E'], 'F');
			expect(response).toEqual([1, 2, 'E']);
			expect(response).toEqual(util.LOST_ROBOT_STATUS);
		});*/
	});
});