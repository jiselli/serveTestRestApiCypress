import { createNewEmail, createNewName } from '../support/utils'

let newEmail, newNome, userId; 

describe('Cadastro simples de usuário', () => {
  it('Cadastra Usuário', () => {
    newEmail = createNewEmail();
    newNome = createNewName();

    cy.request({
      method: 'POST',
      url: '/usuarios', // baseUrl is prepend to URL
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        nome: newNome,
        email: newEmail,
        password: 'password123',
        administrador: 'true'
      },
    }).should((response) => {
      userId = response.body._id;
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
    })
  })

  it('Buscar usuário pelo ID', () => {
    cy.request({
      method: 'GET',
      url:`/usuarios/${userId}`,
      headers: {
        'Accept': 'application/json'
      }
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('nome', newNome);
      expect(response.body).to.have.property('email', newEmail);
      expect(response.body).to.have.property('administrador', 'true');
    })
  })

  it('Altera usuário', () => {
    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`, 
      form: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        nome: newNome,
        email: newEmail,
        password: 'password124',
        administrador: 'false'
      },
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Registro alterado com sucesso');
    })
  })

  it('Excluir usuário pelo ID', () => {
    cy.request({
      method: 'DELETE',
      url:`/usuarios/${userId}`,
      headers: {
        'Accept': 'application/json'
      }
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Registro excluído com sucesso');
    })
  })

  it('Busca usuário pelo ID para garantir que ele foi excluído', () => {
    cy.request({
      method: 'GET',
      url:`/usuarios/${userId}`,
      failOnStatusCode: false,
      headers: {
        'Accept': 'application/json'
      }
    }).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Usuário não encontrado');
    })
  })
})