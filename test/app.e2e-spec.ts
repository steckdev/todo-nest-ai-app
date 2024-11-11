import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todo/generate (POST) and /todo (GET)', async () => {
    const prompt =
      'Prepare for the meeting, call John, buy groceries, and set up a dentist appointment.';

    // Generate TODOs from prompt
    await request(app.getHttpServer())
      .post('/todo/generate')
      .query({ prompt })
      //output the results
      .expect((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual([
          {
            id: '1',
            title: expect.stringContaining(': Prepare for the meeting'),
            description: '',
            progress: 0,
          },
          {
            id: '2',
            title: expect.stringContaining(': Call John'),
            description: '',
            progress: 0,
          },
          {
            id: '3',
            title: expect.stringContaining(': Buy groceries'),
            description: '',
            progress: 0,
          },
          {
            id: '4',
            title: expect.stringContaining(': Set up a dentist appointment'),
            description: '',
            progress: 0,
          },
        ]);
      });
  });
});
