package com.example.webacesso.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class Usuario {
    @Id
    @Column(name = "us_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "us_name")
    private String nome;
    @Column(name = "us_login")
    private String login;
    @Column(name = "us_pass")
    private String senha;
    @Column(name = "us_level")
    private String nivel;
    //obrigatorio
    public Usuario() {
        this(0L,"","","","");
    }
    //opcional
    public Usuario(Long id, String nome, String login, String senha, String nivel) {
        this.id = id;
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.nivel = nivel;
    }
    //gets e sets são obrigatórios
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }
}
