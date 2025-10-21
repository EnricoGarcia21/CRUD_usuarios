package com.example.webacesso.restcontrollers;

import com.example.webacesso.entities.Login;
import com.example.webacesso.entities.Usuario;
import com.example.webacesso.repositories.UsuarioRepository;
import com.example.webacesso.security.JWTTokenProvider;
import com.example.webacesso.services.UsuarioService;
import jakarta.persistence.PostLoad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("acesso")
public class AcessoRestController{
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/logar")
    public ResponseEntity<Object> login(@RequestBody Login login){
        //verificar se o login e senha é de um usuario cadastrado
        Usuario usuario = usuarioService.getByLogin(login.getLogin());
        if(usuario.getSenha().equals(login.getSenha())){
            //caso afirmativo
            String token =  JWTTokenProvider.getToken(login.getLogin(),"1");
            return ResponseEntity.ok(token);
        }
        else
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
    }

}
//FILTER serve como barrereira e monitora os acessos pelas rotas