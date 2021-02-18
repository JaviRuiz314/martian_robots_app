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
		describe('retrieveLatestMarsTerrain', () => {
			it('it should retrieve the latests grid', async () => {
				//GIVEN
				const marsTerrain = {
					dataValues: {
						Id: 1,
						Id: 1,
						Dimension_X: 3,
						Dimension_Y: 3
					}
				};
				mocks.models.MarsTerrain.findOne.mockResolvedValue(marsTerrain);
				//WHEN
				const latestMarsTerrain = await mocks.marsTerrainService.retrieveLatestMarsTerrain();
				//THEN
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledTimes(1);
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledWith({
					order: [['Id', 'DESC']],
				});
				expect(latestMarsTerrain).toEqual(marsTerrain);
			});
			it('it shoud reject an error', async () => {
				//GIVEN
				const error = new Error('error');
				mocks.models.MarsTerrain.findOne.mockRejectedValue(error);
				//WHEN
				await expect(mocks.marsTerrainService.retrieveLatestMarsTerrain()).rejects.toThrowError(error);
				//THEN
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledTimes(1);
				expect(mocks.models.MarsTerrain.findOne).toHaveBeenCalledWith({
					order: [['Id', 'DESC']],
				});
			})
		});
	});
});
