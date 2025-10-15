package com.example.webacesso.restcontrollers;

import com.example.webacesso.entities.Login;
import com.example.webacesso.security.JWTTokenProvider;
import jakarta.persistence.PostLoad;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("apis/acesso")
public class AcessoRestController{
    @PostMapping("/logar")
    public ResponseEntity<Object> login(@RequestBody Login login){
        //verificar se o login e senha é de um usuario cadastrado
        //caso afirmativo
        String token =  JWTTokenProvider.getToken(login.getLogin(),"1");
        return ResponseEntity.ok(token);
    }

}
