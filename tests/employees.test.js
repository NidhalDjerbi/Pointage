// Load modules
const httpStatus = require('http-status');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Config tests
const {
  expect
} = chai;

chai.config.includeStack = true;
chai.use(chaiHttp);

// Load app
const app = require('../app');

// Create test data
const createEmployeeData = {
  name: 'TestName',
  firstName: 'TestFirstName',
  dateCreated: '2020-10-01T12:00:00.000Z',
  department: 'Informatique',
  active: true,
  salary: 3000,
}

const updateEmployeeData = {
  name: 'TestName_2',
  firstName: 'TestFirstName_2',
  dateCreated: '2020-10-01T12:00:00.000Z',
  department: 'Informatique',
  active: true,
  salary: 3000,
}

describe('Employees Tests', () => {
  describe('List Employees', () => {
    it('Should list the employees', (done) => {
      chai.request(app)
        .get('/api/employees')
        .then((res) => {
          expect(res).to.have.status(httpStatus.OK);

          const { body } = res;
          expect(body.success).to.eq(true);
          expect(body.data).to.be.an('array');

          done();
        })
        .catch(done);
    });
  });

  describe('Create Employee', () => {
    it('Should create an employee', (done) => {
      chai.request(app)
        .post('/api/employees')
        .send(createEmployeeData)
        .then((res) => {
          expect(res).to.have.status(httpStatus.OK);

          const { body } = res;
          expect(body.success).to.eq(true);
          expect(body.data).to.be.an('object');

          Object.keys(createEmployeeData).forEach(key => {
            expect(body.data[key]).to.eq(createEmployeeData[key]);
          });

          createEmployeeData._id = body.data._id;

          done();
        })
        .catch(done);
    });
  });

  describe('Get Employee', () => {
    it('Should get an employee', (done) => {
      chai.request(app)
        .get(`/api/employees/${createEmployeeData._id}`)
        .then((res) => {
          expect(res).to.have.status(httpStatus.OK);

          const { body } = res;
          expect(body.success).to.eq(true);
          expect(body.data).to.be.an('object');

          Object.keys(createEmployeeData).forEach(key => {
            expect(body.data[key]).to.eq(createEmployeeData[key]);
          });

          done();
        })
        .catch(done);
    });
  });

  describe('Update Employee', () => {
    it('Should update an employee', (done) => {
      chai.request(app)
        .put(`/api/employees/${createEmployeeData._id}`)
        .send(updateEmployeeData)
        .then((res) => {
          expect(res).to.have.status(httpStatus.OK);

          const { body } = res;
          expect(body.success).to.eq(true);
          expect(body.data).to.be.an('object');

          Object.keys(updateEmployeeData).forEach(key => {
            expect(body.data[key]).to.eq(updateEmployeeData[key]);
          });

          done();
        })
        .catch(done);
    });
  });

  describe('Delete Employee', () => {
    it('Should delete an employee', (done) => {
      chai.request(app)
        .delete(`/api/employees/${createEmployeeData._id}`)
        .then((res) => {
          expect(res).to.have.status(httpStatus.OK);

          const { body } = res;
          expect(body.success).to.eq(true);
          expect(body.data).to.be.an('object');

          done();
        })
        .catch(done);
    });
  });
})
