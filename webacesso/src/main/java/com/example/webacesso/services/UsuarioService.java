package com.example.webacesso.services;

import com.example.webacesso.entities.Usuario;
import com.example.webacesso.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAll(String keyword){
        List<Usuario> usuarioList=new ArrayList<>();
        if(keyword.isEmpty())
            usuarioList = usuarioRepository.findAll();
        else
            usuarioList=usuarioRepository.findAllByKeyword(keyword);
        return usuarioList;
    }
    public List<Usuario> getByLevel(String level){
        List <Usuario> usuarioList;
        usuarioList=usuarioRepository.findAllByNivel(level);
        return usuarioList;
    }
    public Usuario getById(Long id) {
        Usuario usuario;
        usuario=usuarioRepository.findById(id).orElse(null);
        return usuario;
    }
    public Usuario saveUser(Usuario usuario){
        Usuario usu = usuarioRepository.save(usuario);
        return usu;
    }
    public boolean deleteUser(Long id){
        Usuario usuario;
        usuario=usuarioRepository.findById(id).orElse(null);
        if(usuario!=null){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Usuario getByLogin(String login) {
        Usuario usuario;
        usuario=usuarioRepository.findByLogin(login).orElse(null);
        return usuario;
    }
}
