'use strict'

'use strict'
const
	util = require('../../shared/util'),
	mocks = {};

describe('service robot', () => {
	beforeEach(() => {
		jest.mock('../../models', () => {
			return {
				MarsTerrain: {
					findOne: jest.fn(),
					create: jest.fn()
				}
			}
		});

		mocks.marsTerrainService = require('../../service/marsTerrainService');
		mocks.models = require('../../models');
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('createMarsTerrain', () => {
		it('it should call the correct methods to create a new grid', async () => {
			//GIVEN
			const
				dimensionX = 3,
				dimensionY = 3,
				newMarsTerrain = {
					dataValues: {
						Id: 1,
						Dimension_X: 3,
						Dimension_Y: 3
					}
				};
			mocks.models.MarsTerrain.create.mockResolvedValue(newMarsTerrain);
			//WHEN
			const createMarsTerrain = await mocks.marsTerrainService.createMarsTerrain(dimensionX, dimensionY);
			//THEN
			expect(mocks.models.MarsTerrain.create).toHaveBeenCalledTimes(1);
			expect(mocks.models.MarsTerrain.create).toHaveBeenCalledWith({
				Dimension_X: dimensionX,
				Dimension_Y: dimensionY
			});
			expect(createMarsTerrain).toEqual(newMarsTerrain);
		});
		it('it should reject an error', async () => {
			//GIVEN
			const
				dimensionX = 3,
				dimensionY = 3,
				error = new Error('error');
			mocks.models.MarsTerrain.create.mockRejectedValue(error);
			//WHEN
			await expect(mocks.marsTerrainService.createMarsTerrain(dimensionX, dimensionY)).rejects.toThrowError(error);
			//THEN
			expect(mocks.models.MarsTerrain.create).toHaveBeenCalledTimes(1);
			expect(mocks.models.MarsTerrain.create).toHaveBeenCalledWith({
				Dimension_X: dimensionX,
				Dimension_Y: dimensionY
			});
		});
		describe('retrieveSelectedGridOrLatest', () => {
			it('it should retrieve the grid with the correct Id', async () => {
				//GIVEN
				const
					gridInfo = { gridId: '1' },
					resultGrid = { dataValues: 'test grid' };
				mocks.models.MarsTerrain.findOne.mockResolvedValue(resultGrid);
				//WHEN
				const response = await mocks.marsTerrainService.retrieveSelectedGridOrLatest(gridInfo);
				//THEN
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledTimes(1);
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledWith({
					where: { Id: parseInt(gridInfo.gridId) },
					order: [['Id', 'DESC']],
				});
				expect(response).toEqual(resultGrid.dataValues);
			});
			it('it should retrieve the latest grid when no Id is given', async () => {
				//GIVEN
				const
					gridId = undefined,
					resultGrid = { dataValues: 'test grid' };
				mocks.models.MarsTerrain.findOne.mockResolvedValue(resultGrid);
				//WHEN
				const response = await mocks.marsTerrainService.retrieveSelectedGridOrLatest(gridId);
				//THEN
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledTimes(1);
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledWith({
					where: '',
					order: [['Id', 'DESC']],
				});
				expect(response).toEqual(resultGrid.dataValues);
			});
			it('it should reject an error', async () => {
				//GIVEN
				const
					gridId = undefined,
					error = new Error('test-error');
				mocks.models.MarsTerrain.findOne.mockRejectedValue(error);
				//WHEN
				await expect(mocks.marsTerrainService.retrieveSelectedGridOrLatest(gridId)).rejects.toThrowError(error);
				//THEN
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledTimes(1);
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledWith({
					where: '',
					order: [['Id', 'DESC']],
				});
			});
		});
	});
});
