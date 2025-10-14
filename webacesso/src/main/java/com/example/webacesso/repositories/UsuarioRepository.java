package com.example.webacesso.repositories;

import com.example.webacesso.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    List<Usuario> findAllByNivel(String nivel);

    @Query(value="SELECT * FROM users WHERE us_name LIKE %:keyword%",nativeQuery=true)
    List<Usuario> findAllByKeyword(String keyword);

}
