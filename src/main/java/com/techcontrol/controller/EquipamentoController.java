package com.techcontrol.controller;
import com.techcontrol.model.Equipamento;
import com.techcontrol.repository.EquipamentoRepository;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@RestController @RequestMapping("/api/equipamentos")
public class EquipamentoController {
 private final EquipamentoRepository repo;
 public EquipamentoController(EquipamentoRepository repo){this.repo=repo;}
 @GetMapping public List<Equipamento> listar(){return repo.findAll();}
 @GetMapping("/{id}") public Equipamento buscar(@PathVariable Long id){return obter(id);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Equipamento criar(@Valid @RequestBody Equipamento e){e.setId(null);if(repo.existsByPatrimonio(e.getPatrimonio()))throw new ResponseStatusException(HttpStatus.CONFLICT,"Patrimônio já cadastrado");return repo.save(e);}
 @PutMapping("/{id}") public Equipamento atualizar(@PathVariable Long id,@Valid @RequestBody Equipamento e){obter(id);if(repo.existsByPatrimonioAndIdNot(e.getPatrimonio(),id))throw new ResponseStatusException(HttpStatus.CONFLICT,"Patrimônio já cadastrado");e.setId(id);return repo.save(e);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id){repo.delete(obter(id));}
 private Equipamento obter(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Equipamento não encontrado"));}
}
