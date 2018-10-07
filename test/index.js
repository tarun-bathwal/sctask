let chai = require('chai');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;
let request = require('supertest');

const userCredentials = {
	username:'',
	password:''    
};

const fakeuser = {
	username:'tarun'
};

let authenticatedUser = request.agent(server);
let token;

describe('POST /login logging in with username and password',()=>{
	before((done)=>{
		authenticatedUser
			.post('/login')
			.send(userCredentials)
			.end((err, res)=>{
				expect(res.statusCode).to.equal(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('successfully logged in');
				res.body.should.have.property('success').eql(true);
				res.body.should.have.property('token');
				token=res.body.token;
				done();
			});
	});

	it('should not login a user if username or password is undefined',(done)=>{
		request(server)
			.post('/login')
			.send(fakeuser)
			.end((err,res)=>{
				expect(res.statusCode).to.equal(400);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('send username and password');
				res.body.should.have.property('success').eql(false);
				done();
			});
	});
	
	describe('POST /apply_patch',()=>{
		it('should not post to apply_patch without logging in',(done)=>{
			let postbody={
				'doc' : {'baz':'notboo'},
				'patch' : [{
					'op': 'replace', 'path': '/baz', 'value': 'boo' 
				}]
			};
			request(server)
				.post('/apply_patch')
				.send(postbody)
				.end((err,res)=>{
					expect(res.statusCode).to.equal(401);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('unauthourized user');
					res.body.should.have.property('success').eql(false);
					done();
				});
		});
		it('should post to apply_patch with logged in user',(done)=>{
			let postbody={
				'doc' : {'baz':'notboo'},
				'patch' : [{
					'op': 'replace', 'path': '/baz', 'value': 'boo' 
				}]
			};
		
			authenticatedUser				
				.post('/apply_patch')
				.set('Authorization',`Bearer ${token}`)
				.send(postbody)
				.end((err,res)=>{
					expect(res.statusCode).to.equal(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('successfully patched the json object');
					res.body.should.have.property('success').eql(true);
					done();
				});
		});
	});
	
	describe('POST /thumbnail',()=>{
		it('should not post to /thumbnail without logging in',(done)=>{
			let postbody={
				url : 'https://images.mapsofindia.com/my-india/2013/11/sachin.jpg'
			};
			request(server)
				.post('/apply_patch')
				.send(postbody)
				.end((err,res)=>{
					expect(res.statusCode).to.equal(401);
					done();
				});
		});
		it('should post to apply_patch with logged in user',(done)=>{
			let postbody={
				url : 'https://images.mapsofindia.com/my-india/2013/11/sachin.jpg'
			};
			authenticatedUser				
				.post('/thumbnail')
				.set('Authorization',`Bearer ${token}`)
				.send(postbody)
				.end((err,res)=>{
					expect(res.statusCode).to.equal(200);
					done();
				});
		}).timeout(8000);
	});

});

