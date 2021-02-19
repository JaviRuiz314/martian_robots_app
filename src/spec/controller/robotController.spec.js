'use strict'
const mocks = {};

let
	send,
	res = {};

describe('controller robot', () => {
	beforeEach(() => {
		jest.mock('../../service/robotService', () => {
			return {
				createRobot: jest.fn(),
				retrieveLostRobotsInformationOnGrid: jest.fn()
			}
		});
		jest.mock('../../service/marsTerrainService', () => {
			return {
				retrieveSelectedGridOrLatest: jest.fn()
			}
		});

		mocks.marsTerrainService = require('../../service/marsTerrainService');
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
				error = "createNewRobot | Unexpected server error: The request must include the robot name in the body";

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
	describe('retrieveLostRobotsInformationOnGrid', () => {
		it('it should retrieve the information of lost robots inside a given grid', async () => {
			//GIVEN
			const
				req = { query: { gridId: 1 } },
				gridToSearch = { Id: 1 },
				robotInformation = {
					count: 1,
					rows: ['test']
				};
			mocks.marsTerrainService.retrieveSelectedGridOrLatest.mockResolvedValue(gridToSearch);
			mocks.robotService.retrieveLostRobotsInformationOnGrid.mockResolvedValue(robotInformation);
			//WHEN
			await mocks.robotController.retrieveLostRobotsInformationOnGrid(req, res);

			//THEN
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledWith(req.query);
			expect(mocks.robotService.retrieveLostRobotsInformationOnGrid).toHaveBeenCalledTimes(1);
			expect(mocks.robotService.retrieveLostRobotsInformationOnGrid).toHaveBeenCalledWith(gridToSearch.Id);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(`The number of lost robots is ${robotInformation.count} and the information of those robots is: ${JSON.stringify(robotInformation.rows)}`);
		});
		it('it shoudl reject an error', async () => {
			//GIVEN
			const
				req = { query: { gridId: 1 } },
				error = new Error('error-test');
			mocks.marsTerrainService.retrieveSelectedGridOrLatest.mockRejectedValue(error);
			//WHEN
			await mocks.robotController.retrieveLostRobotsInformationOnGrid(req, res);
			//THEN
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledWith(req.query);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith('retrieveNumberOfLostRobotsOnGrid| Unexpected server error: Error: error-test');
		});
	});
})