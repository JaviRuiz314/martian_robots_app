'use strict'
const
	util = require('../../shared/util'),
	mocks = {};

describe('service robot', () => {
	beforeEach(() => {
		jest.mock('../../service/marsTerrainService', () => {
			return {
				retrieveSelectedGridOrLatest: jest.fn()
			}
		});
		jest.mock('sequelize', () => {
			return {
				Op: {
					not: jest.fn(),
					and: jest.fn()
				}
			}
		})
		jest.mock('../../models', () => {
			return {
				Robot: {
					findOne: jest.fn(),
					findAll: jest.fn(),
					create: jest.fn(),
					update: jest.fn(),
					findAndCountAll: jest.fn()
				},
				MarsTerrain2Robot: {
					create: jest.fn()
				}
			}
		});

		mocks.marsTerrainService = require('../../service/marsTerrainService');
		mocks.robotService = require('../../service/robotService');
		mocks.sequelize = require('sequelize');
		mocks.models = require('../../models');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('createRobot', () => {
		it('it should call the correct methods to create a new robot', async () => {
			//GIVEN
			const
				name = 'test-robot',
				latestMarsTerrain = { Id: 1 },
				robot = {
					dataValues: {
						Id: 2,
						Name: name
					}
				};
			mocks.marsTerrainService.retrieveSelectedGridOrLatest.mockResolvedValue(latestMarsTerrain);
			mocks.models.Robot.create.mockResolvedValue(robot);
			//WHEN
			const newRobot = await mocks.robotService.createRobot(name);
			//THEN
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledWith();
			expect(mocks.models.Robot.create).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.create).toHaveBeenCalledWith({
				Name: name,
				Status: util.CREATED_ROBOT_STATUS
			});
			expect(mocks.models.MarsTerrain2Robot.create).toHaveBeenCalledTimes(1);
			expect(mocks.models.MarsTerrain2Robot.create).toHaveBeenCalledWith({
				MarsTerrainId: latestMarsTerrain.Id,
				RobotId: newRobot.dataValues.Id
			});
			expect(newRobot).toEqual(robot);
		});
		it('it should reject an error', async () => {
			//GIVEN
			const
				name = 'test-robot',
				latestMarsTerrain ={ Id: 1  },
				error = new Error('test-error');
			mocks.marsTerrainService.retrieveSelectedGridOrLatest.mockResolvedValue(latestMarsTerrain);
			mocks.models.Robot.create.mockRejectedValue(error);
			//WHEN
			await expect(mocks.robotService.createRobot(name)).rejects.toThrowError(error);
			//THEN
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest).toHaveBeenCalledWith();
			expect(mocks.models.Robot.create).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.create).toHaveBeenCalledWith({
				Name: name,
				Status: util.CREATED_ROBOT_STATUS
			});
		});
	});
	describe('updateLostRobotStatus', () => {
		it('it should update a robot to lost status', async () => {
			//GIVEN
			const
				robotBeforeUpdate = {
					Id: 1
				},
				position = [3, 3, 'E'],
				command = 'N',
				robotUpdated = {
					dataValues: {
						Id: 1,
						Status: util.LOST_ROBOT_STATUS,
						LostGridPosition: [3, 3],
						LostGridOrientation: 'E',
						LastKnownCommand: 'N'
					}
				};
			mocks.models.Robot.update.mockResolvedValue(robotUpdated);
			//WHEN
			await mocks.robotService.updateLostRobotStatus(robotBeforeUpdate.Id, position, command);
			//THEN
			expect(mocks.models.Robot.update).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.update).toHaveBeenCalledWith({
				Status: util.LOST_ROBOT_STATUS,
				LostGridPosition: [position[0], position[1]],
				LostGridOrientation: position[2],
				LastKnownCommand: command
			},
				{
					where: {
						Id: robotBeforeUpdate.Id
					}
				});
		});
		it('it should reject an error', async () => {
			const
				error = new Error('test-error'),
				robotBeforeUpdate = {
					Id: 1
				},
				position = [3, 3, 'E'],
				command = 'N';
			mocks.models.Robot.update.mockRejectedValue(error);
			//WHEN
			await expect(mocks.robotService.updateLostRobotStatus(robotBeforeUpdate.Id, position, command)).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.Robot.update).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.update).toHaveBeenCalledWith({
				Status: util.LOST_ROBOT_STATUS,
				LostGridPosition: [position[0], position[1]],
				LostGridOrientation: position[2],
				LastKnownCommand: command
			},
				{
					where: {
						Id: robotBeforeUpdate.Id
					}
				});
		});
	});
	describe('retrieveLatestRobotAvailable', () => {
		it('it should retrieve the latests non-lost robot', async () => {
			//GIVEN
			const robot = {
				dataValues: {
					Id: 1,
					Status: util.ACTIVE_ROBOT_STATUS,
					Name: 'name'
				}
			};
			mocks.models.Robot.findOne.mockResolvedValue(robot);
			//WHEN
			const foundRobot = await mocks.robotService.retrieveLatestRobotAvailable();
			//THEN
			expect(mocks.models.Robot.findOne).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findOne).toHaveBeenCalledWith({
				where: {
					Status: { [mocks.sequelize.Op.not]: util.LOST_ROBOT_STATUS }
				},
				order: [['Id', 'DESC']],
			});
			expect(foundRobot).toEqual(robot);
		});
		it('it shoud reject an error', async () => {
			//GIVEN
			const error = new Error('error');
			mocks.models.Robot.findOne.mockRejectedValue(error);
			//WHEN
			await expect(mocks.robotService.retrieveLatestRobotAvailable()).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.Robot.findOne).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findOne).toHaveBeenCalledWith({
				where: {
					Status: { [mocks.sequelize.Op.not]: util.LOST_ROBOT_STATUS }
				},
				order: [['Id', 'DESC']],
			});
		})
	});
	describe('findLostRobotsScent', () => {
		it('it should retrieve the latests non-lost robot', async () => {
			//GIVEN
			const
				lastRobotPosition = [3, 3, 'E'],
				lastKnownCommand = 'F',
				gridId = 1,
				lostRobotList = [{
					dataValues: {
						Id: 1,
						Status: util.LOST_ROBOT_STATUS,
						Name: 'name',
						LastKnownCommand: 'F',
						LostGridOrientation: 'E',
						LostGridPosition: [3, 3]
					}
				}];
			mocks.models.Robot.findAll.mockResolvedValue(lostRobotList);
			//WHEN
			const lostRobots = await mocks.robotService.findLostRobotsScent(lastRobotPosition, lastKnownCommand, gridId);
			//THEN
			expect(mocks.models.Robot.findAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findAll).toHaveBeenCalledWith({
				where: {
					[mocks.sequelize.Op.and]: [
						{ Status: util.LOST_ROBOT_STATUS },
						{ LastKnownCommand: lastKnownCommand },
						{ LostGridOrientation: lastRobotPosition[2] },
						{ LostGridPosition: [lastRobotPosition[0], lastRobotPosition[1]] }
					]
				},
				include: {
					model: mocks.models.MarsTerrain2Robot,
					where: { MarsTerrainId: gridId },
					required: true
				}
			});
			expect(lostRobots).toEqual(lostRobotList);
		});
		it('it shoud reject an error', async () => {
			//GIVEN
			const
				lastRobotPosition = [3, 3, 'E'],
				lastKnownCommand = 'F',
				gridId = 1,
				error = new Error('test-error');
			mocks.models.Robot.findAll.mockRejectedValue(error);
			//WHEN
			await expect(mocks.robotService.findLostRobotsScent(lastRobotPosition, lastKnownCommand, gridId)).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.Robot.findAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findAll).toHaveBeenCalledWith({
				where: {
					[mocks.sequelize.Op.and]: [
						{ Status: util.LOST_ROBOT_STATUS },
						{ LastKnownCommand: lastKnownCommand },
						{ LostGridOrientation: lastRobotPosition[2] },
						{ LostGridPosition: [lastRobotPosition[0], lastRobotPosition[1]] }
					]
				},
				include: {
					model: mocks.models.MarsTerrain2Robot,
					where: { MarsTerrainId: gridId },
					required: true
				}
			});
		})
	});
	describe('retrieveLostRobotsInformationOnGrid', () => {
		it('it should retrieve the robots information with the given parameters', async () => {
			//GIVEN
			const
				gridId = 1,
				robotInfo = {
					count: 1,
					rows: ['test']
				};
			mocks.models.Robot.findAndCountAll.mockResolvedValue(robotInfo);
			//WHEN
			const lostRobots = await mocks.robotService.retrieveLostRobotsInformationOnGrid(gridId);
			//THEN
			expect(mocks.models.Robot.findAndCountAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findAndCountAll).toHaveBeenCalledWith({
				attributes: ['Id', 'Name', 'LostGridPosition', 'LostGridOrientation', 'LastKnownCommand'],
				include: {
					model: mocks.models.MarsTerrain2Robot,
					where: { MarsTerrainId: gridId },
					required: true
				},
				where: { Status: util.LOST_ROBOT_STATUS }
			});
			expect(lostRobots).toEqual(robotInfo);
		});
		it('it should return an error', async () => {
			//GIVEN
			const
				gridId = 1,
				error = new Error('test-error');
			mocks.models.Robot.findAndCountAll.mockRejectedValue(error);
			//WHEN
			await expect(mocks.robotService.retrieveLostRobotsInformationOnGrid(gridId)).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.Robot.findAndCountAll).toHaveBeenCalledTimes(1);
			expect(mocks.models.Robot.findAndCountAll).toHaveBeenCalledWith({
				attributes: ['Id', 'Name', 'LostGridPosition', 'LostGridOrientation', 'LastKnownCommand'],
				include: {
					model: mocks.models.MarsTerrain2Robot,
					where: { MarsTerrainId: gridId },
					required: true
				},
				where: { Status: util.LOST_ROBOT_STATUS }
			});
		})
	})
})