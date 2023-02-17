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
  it('creates clothes item', async () => {
    let response = await request.post('/clothes').query({
      name: 'Tester',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Tester');
    expect(response.body.id).toBeTruthy();
  });

  it('gets clothes', async () => {
    let response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Tester');
    expect(response.body[0].id).toBeTruthy();
  });

  it('updates clothes item', async () => {
    let response = await request.put('/clothes/1').query({
      name: 'teaser',
    });
    let testName = await request.get('/clothes/1');
    expect(response.status).toEqual(200);
    expect(testName.body.name).toEqual('teaser');
  });

  it('destroys a clothes item', async () => {
    let response = await request.delete('/clothes/1');
    expect(response.status).toEqual(202);
  });
});
