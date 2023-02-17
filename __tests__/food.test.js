'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API', () => {
  it('creates food item', async () => {
    let response = await request.post('/food').query({
      name: 'Tester',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Tester');
    expect(response.body.id).toBeTruthy();
  });

  it('gets food', async () => {
    let response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Tester');
    expect(response.body[0].id).toBeTruthy();
  });

  it('updates food item', async () => {
    let response = await request.put('/food/1').query({
      name: 'teaser',
    });
    let testName = await request.get('/food/1');
    expect(response.status).toEqual(200);
    expect(testName.body.name).toEqual('teaser');
  });

  it('destroys a food item', async () => {
    let response = await request.delete('/food/1');
    expect(response.status).toEqual(202);
  });
});
