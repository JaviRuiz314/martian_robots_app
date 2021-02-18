'use strict'
const mocks = {};

let
	send,
	res = {};

describe('controller marsTerrain', () => {
	beforeEach(() => {
		jest.mock('../../service/marsTerrainService', () => {
			return {
				createMarsTerrain: jest.fn()
			}
		});

		mocks.marsTerrainService = require('../../service/marsTerrainService');
		mocks.marsTerrainController = require('../../controller/marsTerrainController');

		send = jest.fn();
		res = { status: jest.fn().mockReturnValue({ send }) };
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('createMarsTerrain', () => {
		it('it should call the correct methods to create a new grid', async () => {
			//GIVEN
			const
				req = {
					body: {
						dimensionX: 5,
						dimensionY: 3,
					}
				},
				marsTerrain = { dataValues: { Id: 1 } };
			mocks.marsTerrainService.createMarsTerrain.mockResolvedValue(marsTerrain);
			//WHEN
			await mocks.marsTerrainController.createMarsTerrain(req, res);
			//THEN
			expect(mocks.marsTerrainService.createMarsTerrain).toHaveBeenCalledTimes(1);
			expect(mocks.marsTerrainService.createMarsTerrain).toHaveBeenCalledWith(req.body.dimensionX, req.body.dimensionY);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith('Mars terrain created with id: ' + marsTerrain.dataValues.Id);
		});
		it('it should reject an error when there is no dimensions on body', async () => {
			//GIVEN
			const
				req = {
					body: {
						dimensionY: 3,
					}
				},
				error = "Unexpected server error: Grid coordinates X and Y must exist on the body of the request";

			//WHEN
			await await mocks.marsTerrainController.createMarsTerrain(req, res);;
			//THEN
			expect(mocks.marsTerrainService.createMarsTerrain).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(error);
		});
		it('it should reject an error when the coordinates exceed the value 50', async () => {
			//GIVEN
			const
				req = {
					body: {
						dimensionX: 53,
						dimensionY: 3,
					}
				},
				error = "Unexpected server error: Grid coordinates must not exceed 50";

			//WHEN
			await await mocks.marsTerrainController.createMarsTerrain(req, res);;
			//THEN
			expect(mocks.marsTerrainService.createMarsTerrain).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(error);
		});
		it('it should reject an error when the coordinates are negative', async () => {
			//GIVEN
			const
				req = {
					body: {
						dimensionX: 4,
						dimensionY: -3,
					}
				},
				error = "Unexpected server error: Grid coordinates must exist and be a positive integer";

			//WHEN
			await await mocks.marsTerrainController.createMarsTerrain(req, res);;
			//THEN
			expect(mocks.marsTerrainService.createMarsTerrain).toHaveBeenCalledTimes(0);
			expect(res.status).toHaveBeenCalledTimes(1);
			expect(res.status).toHaveBeenCalledWith(500);
			expect(send).toHaveBeenCalledTimes(1);
			expect(send).toHaveBeenCalledWith(error);
		});
	});
})