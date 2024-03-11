import request from 'supertest';
import app from '../../testServer';


describe('This should test the user module', () => {
  describe('POST /register', () => {
    //Will fail if the user is already available in the Database
    it('should register a new user', async () => {
      const userData = {
        userName: 'testUser',
        email: 'test@example.com',
        password: 'PPPassword@123',
      };

      const response = await request(app)
        .post('/api/user/register')
        .send(userData)
        .expect(200);
      expect(response.body.user).toHaveProperty('userName');
    });
  });
})
describe('POST /login', () => {
  it('should login a user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'PPPassword@123',
    };

    const response = await request(app)
      .post('/api/user/login')
      .send(userData)
      .expect(200);
    expect(response.body).toHaveProperty('status', 'success');
  });
})
describe('POST /logout', () => {
  it('should log out a logged-in user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'PPPassword@123',
    };

    const loginResponse = await request(app)
      .post('/api/user/login')
      .send(loginData)
      .expect(200);
    const authToken = loginResponse.body.tokens[0].token;
    const logoutResponse = await request(app)
      .post('/api/user/logout')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(logoutResponse.body).toHaveProperty('status', 'success');
  });

});

describe('POST /createMovie', () => {
  it('should create a new movie', async () => {
    const mockMovieData = {
      title: 'Test Movie',
      genre: 'Action',
      rating: 8,
      streamLink: 'https://example.com/movie/stream'
    };
    const loginData = {
      email: 'test@example.com',
      password: 'PPPassword@123',
    };
    const loginResponse = await request(app)
      .post('/api/user/login')
      .send(loginData)
      .expect(200);
    const authToken = loginResponse.body.tokens[0].token;
    console.log(authToken);

    const response = await request(app)
      .post('/api/movie/createMovie')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockMovieData)
      .expect(200);
    console.log(response.body);
    expect(response.body).toHaveProperty('message', 'success');
  });
})

describe('PUT /updateMovie/:movieId', () => {
  it('should update an existing movie', async () => {
    const mockMovieId = '65ee72d4c469b0c2598a8f78'; 
    const updatedMovieData = {
      title: 'Updated Movie Title',
      genre: 'Updated Genre',
      rating: 9,
      streamLink: 'https://example.com/movie/updated-stream'
    };
    const loginData = {
      email: 'test@example.com',
      password: 'PPPassword@123',
    };
    const loginResponse = await request(app)
      .post('/api/user/login')
      .send(loginData)
      .expect(200);
    const authToken = loginResponse.body.tokens[0].token;
    console.log(authToken)
    const response = await request(app)
      .put(`/api/movie/updateMovie/${mockMovieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedMovieData)
      .expect(200);
    expect(response.body.message).toEqual('success');
  });

})


