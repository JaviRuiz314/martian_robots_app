'use strict'
const
	util = require('../../shared/util'),
	mocks = {};

describe('service movement', () => {
	beforeEach(() => {
		mocks.movementService = require('../../service/movementService');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('changueDirection', () => {
		it('it should call the correct methods to modify the direction', () => {
			//GIVEN
			const
				direction = 'N',
				directionModification = 90;
			//WHEN
			const newDirection = mocks.movementService.changueDirection(direction, directionModification);
			//THEN
			expect(newDirection).toEqual('W');
		});
	});
	describe('calculateNewCoordinates', () => {
		it('it should call the correct methods to modify the coordinates of the y axys', () => {
			//GIVEN
			const
				xCoordinate = 1,
				yCoordinate = 0,
				direction = 'N',
				movementModification = 1;
			//WHEN
			const newCoordinates = mocks.movementService.calculateNewCoordinates(xCoordinate, yCoordinate, direction, movementModification);
			//THEN
			expect(newCoordinates).toEqual([1, 1]);
		});
		it('it should call the correct methods to modify the coordinates of the x axys', () => {
			//GIVEN
			const
				xCoordinate = 1,
				yCoordinate = 0,
				direction = 'E',
				movementModification = 1;
			//WHEN
			const newCoordinates = mocks.movementService.calculateNewCoordinates(xCoordinate, yCoordinate, direction, movementModification);
			//THEN
			expect(newCoordinates).toEqual([2, 0]);
		});
	});

})