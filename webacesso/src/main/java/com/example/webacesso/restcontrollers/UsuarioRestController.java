package com.example.webacesso.restcontrollers;

import com.example.webacesso.entities.Erro;
import com.example.webacesso.entities.Usuario;
import com.example.webacesso.repositories.UsuarioRepository;
import com.example.webacesso.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(value = "apis/user")
public class UsuarioRestController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping(value = "get-all")
    ResponseEntity<Object> getAll(){
        List<Usuario> usuarioList;
        usuarioList=usuarioService.getAll("");
        return ResponseEntity.ok(usuarioList);
    }

    @GetMapping(value="get-by-keyword/{keyword}")
    ResponseEntity<Object> getByKeyword(@PathVariable String keyword){
        List <Usuario> usuarioList;
        usuarioList=usuarioService.getAll(keyword);
        //usuario=usuarioRepository.findById(id).get();
        return ResponseEntity.ok(usuarioList);
    }

    @GetMapping(value="get-by-level/{level}")
    ResponseEntity<Object> getByLevel(@PathVariable String level){
        return ResponseEntity.ok(usuarioService.getByLevel(level));
    }

    @GetMapping(value="get-by-id/{id}")
    ResponseEntity<Object> getById(@PathVariable Long id){
        Usuario usuario=usuarioService.getById(id);
        //usuario=usuarioRepository.findById(id).get();
        if(usuario==null)
            return ResponseEntity.badRequest().body(new Erro("Usuario não encontrado",""));
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    ResponseEntity<Object> addUser(@RequestBody Usuario usuario){
        if(usuario!=null){
            try {
                Usuario novo = usuarioService.saveUser(usuario);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao inserir novo usuario",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao inserir novo usuario","usuario inconsistente"));
    }

    @PutMapping
    ResponseEntity<Object> updateUser(@RequestBody Usuario usuario){
        if(usuario!=null && usuario.getId()!=0){
            try {
                Usuario novo = usuarioService.saveUser(usuario);
                return ResponseEntity.ok(novo);
            }
            catch (Exception e){
                return ResponseEntity.badRequest().body(new Erro("Erro ao alterar usuario",e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new Erro("Erro ao alterar usuario","usuario inconsistente"));
    }

    @DeleteMapping(value="/{id}")
    ResponseEntity<Object> deleteUser(@PathVariable Long id)
    {
        if(usuarioService.deleteUser(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.badRequest().body(new Erro("Usuario não existe",""));
    }

}
