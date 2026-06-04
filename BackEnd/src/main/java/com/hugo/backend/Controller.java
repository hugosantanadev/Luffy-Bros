package com.hugo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*") // Permite que o front-end (Vercel ou Local) acesse a API sem problemas de CORS
public class Controller {

    @Autowired
    private Repository Repository;

    // Salva uma nova pontuação (POST http://localhost:8080/api/scores)
    @PostMapping
    public ResponseEntity<Score> salvarRecorde(@RequestBody Score score) {
        Score novoRecorde = Repository.save(score);
        return ResponseEntity.ok(novoRecorde);
    }

    // Busca o Top 10 para o Ranking (GET http://localhost:8080/api/scores)
    @GetMapping
    public ResponseEntity<List<Score>> buscarTop10() {
        List<Score> dados = Repository.findTop10ByOrderByPointsDesc();
        return ResponseEntity.ok(dados);
    }
}