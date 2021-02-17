'use strict'
const mocks = {};

let
	send,
	res = {};

describe('controller robot', () => {
	beforeEach(() => {
		jest.mock('../../service/robotService', () => {
			return {
				createRobot: jest.fn()
			}
		});

		mocks.robotService = require('../../service/robotService');
		mocks.robotController = require('../../controller/robotController');

		send = jest.fn();
		res = { status: jest.fn().mockReturnValue({ send }) };
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('createNewRobot', () => {
		it('it should call the correct methods to create a new robot', async () => {
			//GIVEN
			const
				req = { body: { name: 'test-robot' } },
				robot = { dataValues: { Name: 'test-robot' } };
			mocks.robotService.createRobot.mockResolvedValue(robot);
			//WHEN
			await mocks.robotController.createNewRobot(req, res);
			//THEN
			expect(mocks.robotService.createRobot).toHaveBeenCalledTimes(1);
			expect(mocks.robotService.createRobot).toHaveBeenCalledWith(req.body.name);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith('New robot created succesfully with name: ' + robot.dataValues.Name);
		});
		it('it should reject an error when there is no name', async () => {
			//GIVEN
			const
				req = { body: { name: null } },
				error = "Unexpected server error: The request must include the robot name in the body";

			//WHEN
			await expect(mocks.robotController.createNewRobot(req, res));
			//THEN
			expect(mocks.robotService.createRobot).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(error);
		});
	});
})