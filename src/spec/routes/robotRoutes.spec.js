const
	supertest = require('supertest'),
	server = require('../../server'),
	utilRoutes = require('./utilRoutes'),
	mocks = {};

describe('routes robot', () => {
	beforeEach(() => {
		jest.mock('../../controller', () => {
			return {
				Robot: {
					createNewRobot: (req, res) => {
						res.send('createNewRobot Ok');
					}
				}
			}
		});

		mocks.routes = utilRoutes.routes;
		mocks.routes.Robot = require('../../routes/robotRoutes');
		jest.mock('../../routes', () => mocks.routes);
		mocks.app = supertest(server);
	});

	/*describe('check routes', () => {
		it('it should call createNewRobot', async () => {
			let res = await mocks.app.post('/getnewrobot');

			expect(res.error).toEqual(false);
			expect(res.status).toEqual(200);
			expect(res.text).toEqual('createNewRobot Ok');
		});
	}); */ //TO DO .- test routes using supertest
});